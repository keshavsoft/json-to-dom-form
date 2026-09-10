const buildInputNode = ({ inFieldPlan = {} } = {}) => {
    console.log("inFieldPlan : ", inFieldPlan);

    const attributes = {
        type: inFieldPlan.inputType,
        name: inFieldPlan.key,
        placeholder: `Enter ${inFieldPlan.labelText}...`
    };

    if (inFieldPlan.inputClass) {
        attributes.class = inFieldPlan.inputClass;
    }

    if (inFieldPlan.hasDatalist) {
        attributes.list = inFieldPlan.datalistId;
    }

    if (inFieldPlan.inputId) {
        attributes.id = inFieldPlan.inputId;
    }

    return {
        tagName: "input",
        attributes
    };
};

export { buildInputNode };
export default buildInputNode;
