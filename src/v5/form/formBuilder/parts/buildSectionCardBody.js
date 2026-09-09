const buildSectionCardBody = ({ inBody } = {}) => ({
    tagName: "div", attributes: { class: "card-body" },
    children: [inBody]
});
export { buildSectionCardBody }; export default buildSectionCardBody;