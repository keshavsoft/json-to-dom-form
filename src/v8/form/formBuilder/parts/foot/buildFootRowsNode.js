import { buildFootRowNode } from "./buildFootRowNode.js";

const buildFootRowsNode = ({ inFootPlan = {} } = {}) => ({
    tagName: "div",
    attributes: inFootPlan.rowsClass ? { class: inFootPlan.rowsClass } : {},
    children: inFootPlan.rows.map(inRowConfig => buildFootRowNode({
        inRowConfig,
        inFootPlan
    }))
});

export { buildFootRowsNode };
export default buildFootRowsNode;
