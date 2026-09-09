const resolveInputType = ({ inColumn = {} } = {}) =>
    inColumn.type === "number" ? "number" : "text";

const createFieldIdentity = ({ inColumn = {} } = {}) => {
    const key = inColumn.key || "";

    return {
        key,
        labelText: inColumn.label || key,
        inputType: resolveInputType({ inColumn }),
        inputId: inColumn.id || ""
    };
};

export { createFieldIdentity };
export default createFieldIdentity;
