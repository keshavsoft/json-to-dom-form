import { compile } from "../../../../node_modules/json-to-spec/index.js";
import { buildSpecElement } from "../../../../node_modules/@keshavsoft/json-to-dom/index.js";

import structureJson from './structure.json' with {type: 'json'};

const createMethods = ({ inForm } = {}) => {
    const localForm = inForm;

    const localRender = ({ inContainerId, inContainer, targetContainerId } = {}) => {
        try {

            const VARIANT = "stacked"; // "stacked" | "inline" | "list";
            const structure = structureJson[VARIANT];
            let dataAsJson = {};

            const activeColumns = localForm.store.library.activeColumns
            dataAsJson.fields = activeColumns;

            const specAsJsonToDom = compile(structure, dataAsJson);
            console.log("-----------localForm ------------: ", dataAsJson.fields);

            const fromRenderer = buildSpecElement({ spec: specAsJsonToDom, targetHtmlId: "table-container" });

            return fromRenderer;

        } catch (error) {
            console.log("error : ", error);
        };
    };

    return {
        render: localRender
    };
};

export { createMethods };
