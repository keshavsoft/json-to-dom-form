const buildContainerFooterNode = ({ inFooterPlan = {} } = {}) => {
    const localFooterPlan = inFooterPlan;

    return {
        tagName: "div",
        attributes: { class: localFooterPlan.class },
        textContent: localFooterPlan.text
    };
};

export { buildContainerFooterNode };
export default buildContainerFooterNode;
