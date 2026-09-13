// import { compile } from "./jsonToSpec.js";
import { buildSpecElement } from "https://keshavsoft.github.io/json-to-dom/dist/v17/min.js";
import { compile } from "https://keshavsoft.github.io/json-to-spec/dist/v2/min.js";
/**
 * Safely registers json-to-dom-form public API onto window.ks / globalThis.ks
 */
const registerGlobal = ({ inApi } = {}) => {
    const localApi = inApi;
    if (typeof globalThis === "undefined" || !localApi) return;
    globalThis.ks ??= {};
    globalThis.ks["json-to-dom-form"] = localApi;
};

const buildForm = ({ inStructure, inPayload } = {}) => {
    const localStructure = inStructure;
    const localPayload = inPayload;
    const spec = compile(localStructure, localPayload);
    const domResult = buildSpecElement({ inSpec: spec });
    return Array.isArray(domResult) ? domResult[0] : domResult;
};

const getData = () => {
    const formElement = document.getElementById("entry-form");
    return formElement ? Object.fromEntries(new FormData(formElement).entries()) : {};
};

// Initial registration on window.ks like json-to-dom
registerGlobal({
    inApi: {
        version: "1.2.1",
        buildForm,
        getData,
        render: () => startFunc()
    }
});

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

        // 1. Compile blueprint + data payload directly via json-to-spec v2 (clean 2-argument API)
        const spec = compile(structure, payload);

        // 2. Render compiled spec directly into browser DOM via json-to-dom
        const domResult = buildSpecElement({ inSpec: spec });
        const domNode = Array.isArray(domResult) ? domResult[0] : domResult;

        // 3. Mount to container
        const container = document.getElementById("form-container");
        if (container) {
            container.innerHTML = "";
            container.appendChild(domNode);
        };

        addListeners();

        // // 4. Form submit handler (prevent postback)
        // const formElement = document.getElementById("entry-form");
        // if (formElement) {
        //     formElement.addEventListener("submit", (e) => {
        //         e.preventDefault();
        //         const formData = new FormData(formElement);
        //         console.log("[create] Form Data Submitted:", Object.fromEntries(formData.entries()));
        //     });
        // };

        // // Expose live rendered artifacts on window.ks["json-to-dom-form"]
        // if (globalThis.ks?.["json-to-dom-form"]) {
        //     globalThis.ks["json-to-dom-form"].spec = spec;
        //     globalThis.ks["json-to-dom-form"].domNode = domNode;
        //     globalThis.ks["json-to-dom-form"].structure = structure;
        //     globalThis.ks["json-to-dom-form"].payload = payload;
        // };

        console.log("[create] Direct render complete via json-to-spec + json-to-dom:", spec);
    } catch (err) {
        console.error("[create Error]:", err);
    }
};

const addListeners = () => {
    const button = document.getElementById("btn-save");

    button.addEventListener("click", (event) => {
        const localCurrentTarget = event.currentTarget;
        console.log("Button clicked : ", event.output);
    });
};

startFunc();

