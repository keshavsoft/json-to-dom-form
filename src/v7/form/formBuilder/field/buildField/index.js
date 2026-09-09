import { createFieldModel } from "./createFieldModel.js";
import { buildLabelNode } from "./buildLabelNode.js";
import { buildControlNode } from "./buildControlNode.js";
import { buildFieldNode } from "./buildFieldNode.js";

const buildField = ({ inColumn = {}, inClasses = {}, inConfig = {} } = {}) => {
    const fieldModel = createFieldModel({ inColumn, inClasses, inConfig });
    const labelNode = buildLabelNode({ inFieldModel: fieldModel });
    const controlNode = buildControlNode({ inFieldModel: fieldModel });

    return buildFieldNode({
        inFieldModel: fieldModel,
        inLabelNode: labelNode,
        inControlNode: controlNode
    });
};

export { buildField };
export default buildField;
