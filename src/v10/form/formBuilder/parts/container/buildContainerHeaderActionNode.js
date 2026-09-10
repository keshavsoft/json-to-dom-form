const buildContainerHeaderActionNode = ({ inActionConfig = {} } = {}) => {
    const localActionConfig = inActionConfig;

    const children = [];

    if (localActionConfig.icon) {
        children.push({
            tagName: "i",
            attributes: { class: `${localActionConfig.icon} me-1` }
        });
    }

    if (localActionConfig.label) {
        children.push({
            tagName: "span",
            textContent: localActionConfig.label
        });
    }

    const attributes = {
        type: localActionConfig.type || "button",
        class: localActionConfig.class || "btn btn-sm btn-outline-secondary"
    };
    if (localActionConfig.id) attributes.id = localActionConfig.id;
    if (localActionConfig.title) attributes.title = localActionConfig.title;

    return {
        tagName: "button",
        attributes,
        children
    };
};

export { buildContainerHeaderActionNode };
export default buildContainerHeaderActionNode;
