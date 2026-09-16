const buildContainerBodyNode = ({ inContainerPlan = {}, inFormSpec = null } = {}) => {
    const localContainerPlan = inContainerPlan;
    const localFormSpec = inFormSpec;

    const bodyChildren = localFormSpec ? [localFormSpec] : [];

    if (localContainerPlan.extraControls.length > 0) {
        bodyChildren.push(...localContainerPlan.extraControls);
    }

    return {
        tagName: "div",
        attributes: { class: localContainerPlan.bodyClass },
        children: bodyChildren
    };
};

export { buildContainerBodyNode };
export default buildContainerBodyNode;
