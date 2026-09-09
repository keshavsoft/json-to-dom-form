const buildSectionNode = ({ inSection = {}, inChildren = [] } = {}) => ({
    tagName: "div",
    attributes: {
        class: inSection.class || "col-md-6"
    },
    children: inChildren
});

export { buildSectionNode };
export default buildSectionNode;
