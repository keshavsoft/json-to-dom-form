import { Form } from "../src/v4/index.js";

if (!window.ks) window.ks = {};
if (!window.ks["json-to-dom"]) {
  window.ks["json-to-dom"] = {
    buildSpecElement(specInput) {
      const node = specInput && typeof specInput === "object" && "inSpec" in specInput ? specInput.inSpec : specInput;
      if (!node) return null;

      const toArray = value => Array.isArray(value) ? value : [value].filter(Boolean);
      const build = input => {
        if (!input) return null;
        if (input instanceof Node) return input;
        if (Array.isArray(input)) return input.map(build).flat().filter(Boolean);
        if (typeof input !== "object") return null;

        const tagName = input.tagName || "div";
        const element = document.createElement(tagName);

        if (input.attributes) {
          Object.entries(input.attributes).forEach(([key, value]) => {
            if (key === "class") element.className = value;
            else element.setAttribute(key, value);
          });
        }

        if (input.classList) {
          const classes = Array.isArray(input.classList) ? input.classList : String(input.classList).split(" ");
          classes.filter(Boolean).forEach(cls => element.classList.add(cls));
        }

        if (input.properties) Object.assign(element, input.properties);
        if (input.textContent) element.textContent = input.textContent;

        if (input.events) {
          Object.entries(input.events).forEach(([eventName, handler]) => {
            if (typeof handler === "function") element.addEventListener(eventName, handler);
          });
        }

        toArray(input.children).forEach(child => {
          const builtChild = build(child);
          if (builtChild) {
            if (Array.isArray(builtChild)) builtChild.forEach(chunk => element.appendChild(chunk));
            else element.appendChild(builtChild);
          }
        });

        return element;
      };

      return build(node);
    }
  };
}

const examples = {
  basic: {
    title: "Basic form",
    description: "A straightforward data-entry layout using a few key fields.",
    data: {
      stockItemName: "ROPE",
      batchName: "Tuf-Rs.170",
      amount: "420.00",
      voucherNo: "V-2048"
    },
    columns: [
      { key: "stockItemName", label: "Stock item", type: "string" },
      { key: "batchName", label: "Batch", type: "string" },
      { key: "amount", label: "Amount", type: "number" },
      { key: "voucherNo", label: "Voucher no", type: "string" }
    ],
    config: {
      body: {
        columns: ["stockItemName", "batchName", "amount", "voucherNo"]
      }
    },
    theme: "default"
  },
  search: {
    title: "Search-style form",
    description: "Compact metadata-driven search fields made for lookup screens.",
    data: {
      allinventoryentries_stockitemname: "ROPE",
      allinventoryentries_batchallocations_batchname: "Tuf-Rs.170",
      allinventoryentries_batchallocations_amount: "420.00"
    },
    columns: [
      { key: "allinventoryentries_stockitemname", label: "Stock item", type: "string" },
      { key: "allinventoryentries_batchallocations_batchname", label: "Batch name", type: "string" },
      { key: "allinventoryentries_batchallocations_amount", label: "Amount", type: "number" }
    ],
    config: {
      body: {
        columns: [
          "allinventoryentries_stockitemname",
          "allinventoryentries_batchallocations_batchname",
          "allinventoryentries_batchallocations_amount"
        ]
      }
    },
    theme: "light"
  },
  compact: {
    title: "Compact form",
    description: "A denser layout for small form panels or quick-edit screens.",
    data: {
      itemCode: "A-118",
      itemName: "ROPE",
      quantity: "1.62",
      unitPrice: "259.26"
    },
    columns: [
      { key: "itemCode", label: "Item code", type: "string" },
      { key: "itemName", label: "Item name", type: "string" },
      { key: "quantity", label: "Qty", type: "string" },
      { key: "unitPrice", label: "Unit price", type: "number" }
    ],
    config: {
      body: {
        columns: ["itemCode", "itemName", "quantity", "unitPrice"]
      }
    },
    theme: "dark"
  }
};

const exampleButtons = document.querySelectorAll(".example-tab");
const output = document.getElementById("example-output");
const jsonOutput = document.getElementById("example-json");
const summary = document.getElementById("example-summary");

const renderExample = async (name) => {
  const example = examples[name];
  if (!example) return;

  const form = new Form({
    data: example.data,
    columns: example.columns,
    config: example.config,
    targetContainerId: "example-output",
    theme: example.theme
  });

  exampleButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.example === name);
  });

  summary.innerHTML = `
    <h3>${example.title}</h3>
    <p>${example.description}</p>
  `;

  output.innerHTML = "";
  jsonOutput.textContent = "Loading...";

  try {
    await form.render();
    const currentData = form.getData();
    jsonOutput.textContent = JSON.stringify(currentData, null, 2);
  } catch (error) {
    jsonOutput.textContent = `Render error: ${error.message}`;
  }
};

exampleButtons.forEach(button => {
  button.addEventListener("click", () => renderExample(button.dataset.example));
});

renderExample("basic");
