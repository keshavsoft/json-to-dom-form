import { buildFootButtonNode } from "./buildFootButtonNode.js";
import { mergeClassNames } from "./mergeClassNames.js";

const buildFootRowNode = ({ inRowConfig = {}, inFootPlan = {} } = {}) => {
    if (!("buttons" in inRowConfig)) {
        console.error("[json-to-dom-form:buildFootRowNode] inRowConfig must contain 'buttons' key");
        return null;
    };

    if (!Array.isArray(inRowConfig.buttons)) {
        console.error("[json-to-dom-form:buildFootRowNode] inRowConfig.buttons must be an array");
        return null;
    };

    if (inRowConfig.buttons.length === 0) {
        console.error("[json-to-dom-form:buildFootRowNode] inRowConfig.buttons must not be empty");
        return null;
    };

    const rowClass = mergeClassNames(inFootPlan.rowClass, inRowConfig.class);

    return {
        tagName: "div",
        attributes: rowClass ? { class: rowClass } : {},
        children: inRowConfig.buttons.map(inButtonConfig => buildFootButtonNode({
            inButtonConfig,
            inFootPlan
        }))
    };
};

export { buildFootRowNode };
export default buildFootRowNode;
