const buildSearchButtonNode = ({ inFieldPlan = {} } = {}) => ({
    tagName: "button",
    textContent: "Search",
    attributes: {
        type: "button",
        id: inFieldPlan.searchButtonId,
        name: `${inFieldPlan.key}-search`,
        "data-key": inFieldPlan.key,
        class: inFieldPlan.buttonClass
    }
});

export { buildSearchButtonNode };
export default buildSearchButtonNode;
