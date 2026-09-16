const buildFootButtonNode = ({ inButtonConfig = {}, inFootPlan = {} } = {}) => {
    const isPrimary = inButtonConfig.variant === "primary";
    const defaultButtonClass = isPrimary
        ? "btn btn-primary"
        : inFootPlan.buttonClass;
    const buttonClass = inButtonConfig.class || defaultButtonClass;

    const attributes = {
        type: inButtonConfig.type || "button",
        name: inButtonConfig.name || "",
        class: buttonClass
    };

    if (inButtonConfig.id) {
        attributes.id = inButtonConfig.id;
    }

    return {
        tagName: "button",
        textContent: inButtonConfig.label || inButtonConfig.name,
        attributes
    };
};

export { buildFootButtonNode };
export default buildFootButtonNode;
