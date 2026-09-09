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

const exampleDefinitions = {
  stacked: {
    title: "Stacked layout",
    data: {
      itemName: "ROPE",
      batchName: "Tuf-Rs.170",
      amount: "420.00"
    },
    columns: [
      { key: "itemName", label: "Item name", type: "string", id: "itemName" },
      { key: "batchName", label: "Batch name", type: "string", id: "batchName" },
      { key: "amount", label: "Amount", type: "number", id: "amount" }
    ],
    config: {
      body: { columns: ["itemName", "batchName", "amount"] }
    },
    theme: "default"
  },
  horizontal: {
    title: "Horizontal layout",
    data: {
      stockItem: "ROPE",
      voucherNo: "V-2048",
      unitPrice: "259.26"
    },
    columns: [
      { key: "stockItem", label: "Stock item", type: "string", id: "stockItem" },
      { key: "voucherNo", label: "Voucher no", type: "string", id: "voucherNo" },
      { key: "unitPrice", label: "Unit price", type: "number", id: "unitPrice" }
    ],
    config: {
      layout: "horizontal",
      body: { columns: ["stockItem", "voucherNo", "unitPrice"] }
    },
    theme: "light"
  },
  inline: {
    title: "Inline actions",
    data: {
      searchText: "ROPE",
      dateFrom: "2026-09-01",
      dateTo: "2026-09-30"
    },
    columns: [
      { key: "searchText", label: "Search", type: "string", searchButton: true },
      { key: "dateFrom", label: "From", type: "string" },
      { key: "dateTo", label: "To", type: "string" }
    ],
    config: {
      layout: "inline",
      body: { columns: ["searchText", "dateFrom", "dateTo"] }
    },
    theme: "default"
  },
  grid: {
    title: "Grid / card layout",
    data: {
      firstName: "Keshav",
      lastName: "Soft",
      company: "KeshavSoft",
      email: "hello@keshavsoft.com"
    },
    columns: [
      { key: "firstName", label: "First name", type: "string" },
      { key: "lastName", label: "Last name", type: "string" },
      { key: "company", label: "Company", type: "string" },
      { key: "email", label: "Email", type: "string" }
    ],
    config: {
      layout: "grid-2col",
      body: { columns: ["firstName", "lastName", "company", "email"] }
    },
    theme: "dark"
  },
  sections: {
    title: "Sectioned panel",
    data: {
      itemCode: "A-118",
      itemName: "ROPE",
      buyerName: "PRAKASH",
      branch: "Main Branch",
      notes: "Urgent dispatch"
    },
    columns: [
      { key: "itemCode", label: "Item code", type: "string" },
      { key: "itemName", label: "Item name", type: "string" },
      { key: "buyerName", label: "Buyer", type: "string" },
      { key: "branch", label: "Branch", type: "string" },
      { key: "notes", label: "Notes", type: "string" }
    ],
    config: {
      layout: "grid-2col",
      sectionsRowClass: "row g-4",
      sections: [
        { title: "Product details", class: "col-md-6", columns: ["itemCode", "itemName"] },
        { title: "Account details", class: "col-md-6", columns: ["buyerName", "branch"] },
        { title: "Notes", class: "col-12", columns: ["notes"] }
      ],
      body: { columns: ["itemCode", "itemName", "buyerName", "branch", "notes"] }
    },
    theme: "default"
  }
};

const renderExample = async ({ targetId, definition }) => {
  const form = new Form({
    data: definition.data,
    columns: definition.columns,
    config: definition.config,
    targetContainerId: targetId,
    theme: definition.theme
  });

  await form.render();
  return form;
};

window.jsonToDomExamples = {
  exampleDefinitions,
  renderExample
};

export { exampleDefinitions, renderExample };
