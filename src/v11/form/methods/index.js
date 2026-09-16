import { compile } from "../../../../node_modules/json-to-spec/index.js";
import { buildSpecElement } from "../../../../node_modules/@keshavsoft/json-to-dom/index.js";

import { buildSpec } from "./buildSpec.js";
import { renderStructure } from "./renderStructure.js";
import { render } from "./render.js";

import structureJson from './structure.json' with {type: 'json'};
import dataJson from './data.json' with {type: 'json'};

const methods = {
    buildSpec,
    renderStructure,
    render
};

const createMethods = ({ inForm } = {}) => {
    const localForm = inForm;

    const localBuildSpec = () => {
        return buildSpec({ inForm: localForm });
    };

    const localRenderStructure = ({ inContainerId, inContainer, targetContainerId } = {}) => {
        const result = renderStructure({
            inForm: localForm,
            inContainerId,
            inContainer,
            targetContainerId
        });
        if (result?.element) {
            localForm.formElement = result.element;
            localForm.controlsTree = result.treeWithIds;
        }
        return result;
    };

    const localRender = async ({ inContainerId, inContainer, targetContainerId } = {}) => {

        const VARIANT = "stacked"; // "stacked" | "inline" | "list";
        const structure = structureJson[VARIANT];
        let dataAsJson = {};

        const activeColumns = localForm.store.library.activeColumns
        dataAsJson.fields = activeColumns;

        const specAsJsonToDom = compile(structure, dataAsJson);
        console.log("-----------localForm ------------: ", specAsJsonToDom, localForm, activeColumns);

        buildSpecElement({ spec: specAsJsonToDom, targetHtmlId: "table-container" });

        // const result = await render({
        //     inForm: localForm,
        //     inContainerId,
        //     inContainer,
        //     targetContainerId
        // });

        // if (result?.element) {
        //     localForm.formElement = result.element;
        //     localForm.controlsTree = result.treeWithIds;
        // };

        // return result;
    };

    return {
        buildSpec: localBuildSpec,
        renderStructure: localRenderStructure,
        render: localRender
    };
};

export { methods, createMethods, buildSpec, renderStructure, render };
export default methods;
