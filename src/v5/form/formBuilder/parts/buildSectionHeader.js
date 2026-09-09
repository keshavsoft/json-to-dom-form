const buildSectionHeader = ({ inSection = {} } = {}) => ({
    tagName: "div",
    attributes: {
        class: "card-header bg-light py-2 fw-semibold"
    },
    textContent: inSection.title
});

export { buildSectionHeader };
export default buildSectionHeader;