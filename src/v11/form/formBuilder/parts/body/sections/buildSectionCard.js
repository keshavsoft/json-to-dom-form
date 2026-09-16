const buildSectionCard = ({ inChildren = [], inSection = {}, inClasses = {} } = {}) => ({
    tagName: "div",
    attributes: {
        class: inSection.cardClass || inClasses?.sectionCard || "card h-100 shadow-sm border-0"
    },
    children: inChildren
});

export { buildSectionCard };
export default buildSectionCard;
