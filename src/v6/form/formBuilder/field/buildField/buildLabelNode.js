const buildLabelNode = ({ inFieldModel = {} } = {}) => {
    const attributes = {};

    if (inFieldModel.labelClass) {
        attributes.class = inFieldModel.labelClass;
    }

    if (inFieldModel.inputId) {
        attributes.for = inFieldModel.inputId;
    }

    return {
        tagName: "label",
        textContent: inFieldModel.labelText,
        attributes
    };
};

export { buildLabelNode };
export default buildLabelNode;
