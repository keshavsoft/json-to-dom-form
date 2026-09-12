import { compile } from "https://keshavsoft.github.io/json-to-spec/dist/v1/min.js";
import { buildSpecElement } from "https://keshavsoft.github.io/json-to-dom/dist/v16/min.js";

/**
 * Form - Lightweight Declarative Form Engine using json-to-spec and json-to-dom via CDN.
 * Adheres strictly to the in/local parameter naming convention.
 */
class Form {
    constructor({
        inStructure = {},
        inColumns = [],
        inConfig = {},
        inData = {},
        inTargetContainerId = ""
    } = {}) {
        const localStructure = inStructure;
        const localColumns = inColumns;
        const localConfig = inConfig;
        const localData = inData;
        const localTargetContainerId = inTargetContainerId;

        this.structure = localStructure;
        this.columns = localColumns;
        this.config = localConfig;
        this.data = localData;
        this.targetContainerId = localTargetContainerId;

        this.spec = null;
        this.formElement = null;
        this.domContainer = null;
    }

    _preparePayload({ inColumns, inConfig, inData } = {}) {
        const localColumns = inColumns || this.columns;
        const localConfig = inConfig || this.config;
        const localData = inData || this.data;

        // Filter active columns if specified in config.body.columns
        const allowedKeys = localConfig?.body?.columns;
        let activeColumns = Array.isArray(localColumns) ? localColumns : [];
        if (Array.isArray(allowedKeys) && allowedKeys.length > 0) {
            activeColumns = activeColumns.filter(col => allowedKeys.includes(col.key || col.field));
        }

        // Normalize columns so tokens ${label}, ${title}, ${key}, ${field} all resolve
        const normalizedColumns = activeColumns.map(col => {
            const key = col.key || col.field || col.name;
            const label = col.label || col.title || key;
            const type = col.type === "string" ? "text" : (col.type || "text");
            const val = (localData && localData[key] !== undefined) ? localData[key] : (col.value ?? "");
            return {
                ...col,
                key,
                field: key,
                name: key,
                label,
                title: label,
                type,
                value: val,
                placeholder: col.placeholder || `Enter ${label}...`,
                isVisible: col.isVisible !== false
            };
        });

        // Resolve buttons for footer
        const buttons = localConfig?.foot?.buttons || [
            {
                id: "btn-reset",
                name: "reset",
                label: "Reset",
                type: "button",
                class: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            },
            {
                id: "btn-save",
                name: "save",
                label: "Save",
                type: "submit",
                class: "px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }
        ];

        return {
            head: {
                title: localConfig?.head?.title || "Form",
                subtitle: localConfig?.head?.subtitle || ""
            },
            columns: normalizedColumns,
            buttons,
            values: { ...localData },
            ...localData
        };
    }

    buildSpec({ inStructure, inColumns, inConfig, inData } = {}) {
        const localStructure = inStructure || this.structure;
        const localColumns = inColumns || this.columns;
        const localConfig = inConfig || this.config;
        const localData = inData || this.data;

        const payload = this._preparePayload({
            inColumns: localColumns,
            inConfig: localConfig,
            inData: localData
        });

        // Pure JSON Compilation via json-to-spec CDN
        const compiledSpec = compile({
            inStructure: localStructure,
            inData: payload
        });

        this.spec = compiledSpec;
        return compiledSpec;
    }

    render({ inContainerId, inContainer, inStructure, inData } = {}) {
        const localContainerId = inContainerId || this.targetContainerId;
        const localContainer = inContainer;
        const localStructure = inStructure || this.structure;
        const localData = inData || this.data;

        const spec = this.buildSpec({
            inStructure: localStructure,
            inData: localData
        });

        // Live DOM Compilation via json-to-dom CDN
        const domResult = buildSpecElement({ inSpec: spec });
        const domNode = Array.isArray(domResult) ? domResult[0] : domResult;
        this.formElement = domNode;

        // Resolve mounting container
        let mountTarget = null;
        if (localContainer instanceof HTMLElement) {
            mountTarget = localContainer;
        } else if (localContainerId) {
            mountTarget = document.getElementById(localContainerId);
        }

        if (mountTarget) {
            mountTarget.innerHTML = "";
            mountTarget.appendChild(domNode);
            this.domContainer = mountTarget;
        }

        // Prevent browser form postback on submit
        const formNode = domNode.tagName === "FORM"
            ? domNode
            : domNode.querySelector("form");
        if (formNode) {
            formNode.addEventListener("submit", (e) => {
                e.preventDefault();
            });
        }

        // Apply pre-existing data values to inputs if not stamped in attributes
        if (localData && typeof localData === "object") {
            this.setData({ inData: localData });
        }

        return {
            spec,
            element: domNode
        };
    }

    getData() {
        if (!this.formElement) return { ...this.data };

        const formNode = this.formElement.tagName === "FORM"
            ? this.formElement
            : this.formElement.querySelector("form");

        const result = {};
        if (!formNode) return result;

        const inputs = formNode.querySelectorAll("input, select, textarea");
        inputs.forEach(input => {
            const name = input.name || input.id;
            if (!name) return;

            if (input.type === "checkbox") {
                result[name] = input.checked;
            } else if (input.type === "number") {
                result[name] = input.value === "" ? null : Number(input.value);
            } else {
                result[name] = input.value;
            }
        });

        this.data = { ...this.data, ...result };
        return result;
    }

    setData({ inData = {} } = {}) {
        const localData = inData;
        if (!localData || typeof localData !== "object") return;

        this.data = { ...this.data, ...localData };

        if (!this.formElement) return;

        const formNode = this.formElement.tagName === "FORM"
            ? this.formElement
            : this.formElement.querySelector("form");

        if (!formNode) return;

        Object.entries(localData).forEach(([key, val]) => {
            const input = formNode.querySelector(`[name="${key}"], #${key}`);
            if (input) {
                if (input.type === "checkbox") {
                    input.checked = Boolean(val);
                } else {
                    input.value = val !== undefined && val !== null ? String(val) : "";
                }
            }
        });
    }

    reset() {
        if (!this.formElement) return;

        const formNode = this.formElement.tagName === "FORM"
            ? this.formElement
            : this.formElement.querySelector("form");

        if (formNode) {
            formNode.reset();
        }
    }
}

export { Form };
export default Form;
