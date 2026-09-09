const buildSectionTitle = ({ inSection = {} } = {}) =>
    !inSection.title
        ? null
        : ({
            tagName: "h6",
            attributes: {
                class: inSection.titleClass ||
                    "fw-bold text-secondary mb-3 pb-2 border-bottom"
            },
            textContent: inSection.title
        });

export { buildSectionTitle };
export default buildSectionTitle;