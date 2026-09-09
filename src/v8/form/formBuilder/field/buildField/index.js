import { createFieldPlan } from "./planning/index.js";
import { buildLabelNode } from "./buildLabelNode.js";
import { buildControlNode } from "./control/index.js";
import { buildFieldLayoutNode } from "./buildFieldLayoutNode.js";

const buildField = ({ inColumn = {}, inClasses = {}, inConfig = {} } = {}) => {
    // Decide the field once so the DOM builders stay small and predictable.
    const fieldPlan = createFieldPlan({ inColumn, inClasses, inConfig });

    // Build the semantic pieces first.
    const labelNode = buildLabelNode({ inFieldPlan: fieldPlan });
    const controlNode = buildControlNode({ inFieldPlan: fieldPlan });

    // Then place those pieces into the final layout shell.
    return buildFieldLayoutNode({
        inFieldPlan: fieldPlan,
        inLabelNode: labelNode,
        inControlNode: controlNode
    });
};

export { buildField };
export default buildField;
