const buildSectionBody = ({ inChildren = [], inClass = "" } = {}) => ({
    tagName: "div",
    attributes: { class: inClass },
    children: inChildren
});
export { buildSectionBody };
export default buildSectionBody;