import { buildInputNode } from "./buildInputNode.js";
import { buildSearchButtonNode } from "./buildSearchButtonNode.js";

const buildControlNode = ({ inFieldModel = {} } = {}) => {
    const inputNode = buildInputNode({ inFieldModel });
    let controlNode = inputNode;

    if (inFieldModel.hasSearchButton) {
        controlNode = {
            tagName: "div",
            attributes: inFieldModel.groupClass ? { class: inFieldModel.groupClass } : {},
            children: [inputNode, buildSearchButtonNode({ inFieldModel })]
        };
    }

    if (inFieldModel.controlWrapperClass) {
        return {
            tagName: "div",
            attributes: { class: inFieldModel.controlWrapperClass },
            children: [controlNode]
        };
    }

    return controlNode;
};

export { buildControlNode };
export default buildControlNode;
