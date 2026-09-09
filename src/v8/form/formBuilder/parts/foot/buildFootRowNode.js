import { buildFootButtonNode } from "./buildFootButtonNode.js";
import { mergeClassNames } from "./mergeClassNames.js";

const buildFootRowNode = ({ inRowConfig = {}, inFootPlan = {} } = {}) => {
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
