import { createContainerPlan } from "./createContainerPlan.js";
import { buildContainerHeaderNode } from "./buildContainerHeaderNode.js";
import { buildContainerBodyNode } from "./buildContainerBodyNode.js";
import { buildContainerFooterNode } from "./buildContainerFooterNode.js";

const buildContainer = ({ inContainerConfig = null, inFormSpec = null, inClasses = {} } = {}) => {
    const localContainerConfig = inContainerConfig;
    const localFormSpec = inFormSpec;
    const localClasses = inClasses;

    if (!localContainerConfig) {
        return localFormSpec;
    };

    const containerPlan = createContainerPlan({ inContainerConfig: localContainerConfig, inClasses: localClasses });

    const containerChildren = [];

    if (containerPlan.header) {
        containerChildren.push(buildContainerHeaderNode({ inHeaderPlan: containerPlan.header }));
    }

    containerChildren.push(buildContainerBodyNode({ inContainerPlan: containerPlan, inFormSpec: localFormSpec }));

    if (containerPlan.footer) {
        containerChildren.push(buildContainerFooterNode({ inFooterPlan: containerPlan.footer }));
    };
    // console.log("containerChildren : ", containerChildren);

    return {
        tagName: "div",
        attributes: containerPlan.attributes,
        children: containerChildren
    };
};

export { buildContainer };
export default buildContainer;
