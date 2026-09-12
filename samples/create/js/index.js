import { compile } from "https://keshavsoft.github.io/json-to-spec/dist/v1/min.js";
import { buildSpecElement } from "https://keshavsoft.github.io/json-to-dom/dist/v16/min.js";

const startFunc = async () => {
    try {
        console.log("[create] Fetching JSONs...");
        const [structure, columns, config, data] = await Promise.all([
            fetch("./structure.json").then(r => r.json()),
            fetch("./columns.json").then(r => r.json()),
            fetch("./form/config.json").then(r => r.json()),
            fetch("./data.json").then(r => r.json())
        ]);

        const payload = {
            head: config.head,
            columns,
            buttons: config.foot.buttons,
            ...data,
            values: data
        };

        // 1. Compile blueprint + data payload directly via json-to-spec
        const spec = compile({ inStructure: structure, inData: payload });

        // 2. Render compiled spec directly into browser DOM via json-to-dom
        const domResult = buildSpecElement({ inSpec: spec });
        const domNode = Array.isArray(domResult) ? domResult[0] : domResult;

        // 3. Mount to container
        const container = document.getElementById("form-container");
        if (container) {
            container.innerHTML = "";
            container.appendChild(domNode);
        }

        // 4. Form submit handler (prevent postback)
        const formElement = document.getElementById("entry-form");
        if (formElement) {
            formElement.addEventListener("submit", (e) => {
                e.preventDefault();
                const formData = new FormData(formElement);
                console.log("[create] Form Data Submitted:", Object.fromEntries(formData.entries()));
            });
        }

        console.log("[create] Direct render complete via json-to-spec + json-to-dom:", spec);
    } catch (err) {
        console.error("[create Error]:", err);
    }
};

startFunc();
