const buildLabelNode = ({ inFieldPlan = {} } = {}) => {
    const attributes = {};

    if (inFieldPlan.labelClass) {
        attributes.class = inFieldPlan.labelClass;
    }

    if (inFieldPlan.inputId) {
        attributes.for = inFieldPlan.inputId;
    }

    return {
        tagName: "label",
        textContent: inFieldPlan.labelText,
        attributes
    };
};

export { buildLabelNode };
export default buildLabelNode;
