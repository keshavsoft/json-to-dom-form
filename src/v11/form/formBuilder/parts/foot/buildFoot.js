import { createFootPlan } from "./createFootPlan.js";
import { buildFootRowsNode } from "./buildFootRowsNode.js";

const buildFoot = ({ inFootConfig = {}, inClasses = {} } = {}) => {
    const footPlan = createFootPlan({ inFootConfig, inClasses });

    if (footPlan.rows.length === 0) {
        return null;
    }

    return {
        tagName: "div",
        attributes: footPlan.attributes,
        children: [buildFootRowsNode({ inFootPlan: footPlan })]
    };
};

export { buildFoot };
export default buildFoot;
