const buildSectionBody = ({ inChildren = [], inClass = "" } = {}) => ({
    tagName: "div",
    attributes: inClass ? { class: inClass } : {},
    children: inChildren
});

export { buildSectionBody };
export default buildSectionBody;
