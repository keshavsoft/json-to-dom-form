import { buildInputNode } from "./buildInputNode.js";
import { buildSearchButtonNode } from "./buildSearchButtonNode.js";

const buildSearchControlNode = ({ inFieldPlan = {} } = {}) => ({
    tagName: "div",
    attributes: inFieldPlan.groupClass ? { class: inFieldPlan.groupClass } : {},
    children: [
        buildInputNode({ inFieldPlan }),
        buildSearchButtonNode({ inFieldPlan })
    ]
});

export { buildSearchControlNode };
export default buildSearchControlNode;
