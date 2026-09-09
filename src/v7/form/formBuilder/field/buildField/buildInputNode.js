const buildInputNode = ({ inFieldModel = {} } = {}) => {
    const attributes = {
        type: inFieldModel.inputType,
        name: inFieldModel.key,
        placeholder: `Enter ${inFieldModel.labelText}...`
    };

    if (inFieldModel.inputClass) {
        attributes.class = inFieldModel.inputClass;
    }

    if (inFieldModel.hasDatalist) {
        attributes.list = inFieldModel.datalistId;
    }

    if (inFieldModel.inputId) {
        attributes.id = inFieldModel.inputId;
    }

    return {
        tagName: "input",
        attributes
    };
};

export { buildInputNode };
export default buildInputNode;
