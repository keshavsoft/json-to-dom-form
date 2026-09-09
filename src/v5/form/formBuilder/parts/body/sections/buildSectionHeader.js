const buildSectionHeader = ({ inSection = {}, inClasses = {} } = {}) => {
    if (!inSection.title) {
        return null;
    }

    const children = [
        ...(inSection.icon ? [{ tagName: "i", attributes: { class: inSection.icon } }] : []),
        {
            tagName: "span",
            textContent: inSection.title
        }
    ];

    return {
        tagName: "div",
        attributes: {
            class: inSection.headerClass ||
                inClasses?.sectionHeader ||
                "card-header bg-light py-2 fw-semibold d-flex align-items-center gap-2"
        },
        children
    };
};

export { buildSectionHeader };
export default buildSectionHeader;
