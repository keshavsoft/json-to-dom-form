const wrapControlNode = ({ inFieldPlan = {}, inControlNode = null } = {}) => {
    if (!inFieldPlan.controlWrapperClass) {
        return inControlNode;
    }

    return {
        tagName: "div",
        attributes: { class: inFieldPlan.controlWrapperClass },
        children: [inControlNode]
    };
};

export { wrapControlNode };
export default wrapControlNode;
