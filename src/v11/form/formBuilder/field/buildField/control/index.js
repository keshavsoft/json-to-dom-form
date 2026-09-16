import { buildBaseControlNode } from "./buildBaseControlNode.js";
import { wrapControlNode } from "./wrapControlNode.js";

const buildControlNode = ({ inFieldPlan = {} } = {}) => {
    // Start with the main interactive control.
    const baseControlNode = buildBaseControlNode({ inFieldPlan });

    // Add the outer wrapper last so styling can target the whole control block.
    return wrapControlNode({
        inFieldPlan,
        inControlNode: baseControlNode
    });
};

export { buildControlNode };
export default buildControlNode;
