const buildSectionCard = ({ inChildren = [] } = {}) => ({
    tagName: "div", attributes: { class: "card h-100 shadow-sm border-0" },
    children: inChildren
});
export { buildSectionCard }; export default buildSectionCard;