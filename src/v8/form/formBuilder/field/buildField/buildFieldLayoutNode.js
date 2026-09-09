const buildFieldLayoutNode = ({ inFieldPlan = {}, inLabelNode = null, inControlNode = null } = {}) => {
    const fieldAttributes = inFieldPlan.fieldClass ? { class: inFieldPlan.fieldClass } : {};

    if (inFieldPlan.alignment === "horizontal") {
        const controlColumnNode = inFieldPlan.controlWrapperClass
            ? inControlNode
            : {
                tagName: "div",
                attributes: { class: "col-sm-8" },
                children: [inControlNode]
            };

        return {
            tagName: "div",
            attributes: fieldAttributes,
            children: [{
                tagName: "div",
                attributes: { class: "row align-items-center g-2" },
                children: [inLabelNode, controlColumnNode]
            }]
        };
    }

    return {
        tagName: "div",
        attributes: fieldAttributes,
        children: [inLabelNode, inControlNode]
    };
};

export { buildFieldLayoutNode };
export default buildFieldLayoutNode;
