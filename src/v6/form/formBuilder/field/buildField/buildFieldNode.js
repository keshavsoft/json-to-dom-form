const buildFieldNode = ({ inFieldModel = {}, inLabelNode = null, inControlNode = null } = {}) => {
    const fieldAttributes = inFieldModel.fieldClass ? { class: inFieldModel.fieldClass } : {};

    if (inFieldModel.alignment === "horizontal") {
        const controlColumnNode = inFieldModel.controlWrapperClass
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

export { buildFieldNode };
export default buildFieldNode;
