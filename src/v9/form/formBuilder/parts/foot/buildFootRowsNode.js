import { buildFootRowNode } from "./buildFootRowNode.js";

const buildFootRowsNode = ({ inFootPlan = {} } = {}) => {

    if (!("rows" in inFootPlan)) {
        console.error("[json-to-dom-form:buildFootRowsNode] inFootPlan must contain 'rows' key");
        return null;
    };

    if (!Array.isArray(inFootPlan.rows)) {
        console.error("[json-to-dom-form:buildFootRowsNode] inFootPlan.rows must be an array");
        return null;
    };

    if (inFootPlan.rows.length === 0) {
        console.error("[json-to-dom-form:buildFootRowsNode] inFootPlan.rows must not be empty");
        return null;
    };

    return {
        tagName: "div",
        attributes: inFootPlan.rowsClass ? { class: inFootPlan.rowsClass } : {},
        children: inFootPlan.rows.map(inRowConfig => buildFootRowNode({
            inRowConfig,
            inFootPlan
        }))
    }
};

export { buildFootRowsNode };
export default buildFootRowsNode;
