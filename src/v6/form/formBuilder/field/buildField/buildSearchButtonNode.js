const buildSearchButtonNode = ({ inFieldModel = {} } = {}) => ({
    tagName: "button",
    textContent: "Search",
    attributes: {
        type: "button",
        id: inFieldModel.searchButtonId,
        name: `${inFieldModel.key}-search`,
        "data-key": inFieldModel.key,
        class: inFieldModel.buttonClass
    }
});

export { buildSearchButtonNode };
export default buildSearchButtonNode;
