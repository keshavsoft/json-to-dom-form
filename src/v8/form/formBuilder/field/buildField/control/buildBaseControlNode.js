import { buildInputNode } from "./buildInputNode.js";
import { buildSearchControlNode } from "./buildSearchControlNode.js";

const buildBaseControlNode = ({ inFieldPlan = {} } = {}) =>
    inFieldPlan.hasSearchAction
        ? buildSearchControlNode({ inFieldPlan })
        : buildInputNode({ inFieldPlan });

export { buildBaseControlNode };
export default buildBaseControlNode;
