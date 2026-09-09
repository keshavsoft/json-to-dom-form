const buildSectionsContainer = ({ inChildren = [], inClass = "row g-4" } = {}) => ({
    tagName: "div", attributes: { class: inClass }, children: inChildren
});
export { buildSectionsContainer };
export default buildSectionsContainer;