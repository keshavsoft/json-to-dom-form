import { buildContainerHeaderActionNode } from "./buildContainerHeaderActionNode.js";

const buildContainerHeaderNode = ({ inHeaderPlan = {} } = {}) => {
    const localHeaderPlan = inHeaderPlan;

    const headerChildren = [];

    // Left section: Icon and Title
    const titleChildren = [];
    if (localHeaderPlan.iconClass) {
        titleChildren.push({
            tagName: "i",
            attributes: { class: `${localHeaderPlan.iconClass} me-1` }
        });
    }
    titleChildren.push({
        tagName: "span",
        textContent: localHeaderPlan.titleText
    });

    headerChildren.push({
        tagName: "div",
        attributes: { class: localHeaderPlan.titleClass },
        children: titleChildren
    });

    // Right section: Actions
    if (localHeaderPlan.actions.length > 0) {
        headerChildren.push({
            tagName: "div",
            attributes: { class: "d-flex align-items-center gap-2" },
            children: localHeaderPlan.actions.map(inActionConfig =>
                buildContainerHeaderActionNode({ inActionConfig })
            )
        });
    }

    return {
        tagName: "div",
        attributes: { class: localHeaderPlan.class },
        children: headerChildren
    };
};

export { buildContainerHeaderNode };
export default buildContainerHeaderNode;
