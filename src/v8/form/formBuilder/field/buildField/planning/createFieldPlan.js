import { createFieldIdentity } from "./createFieldIdentity.js";
import { createFieldLayoutPlan } from "./createFieldLayoutPlan.js";
import { createControlPlan } from "./createControlPlan.js";

const createFieldPlan = ({ inColumn = {}, inClasses = {}, inConfig = {} } = {}) => {
    const fieldIdentity = createFieldIdentity({ inColumn });
    const fieldLayoutPlan = createFieldLayoutPlan({ inColumn, inClasses, inConfig });
    const controlPlan = createControlPlan({
        inColumn,
        inClasses,
        inConfig,
        inFieldIdentity: fieldIdentity
    });

    return {
        ...fieldIdentity,
        ...fieldLayoutPlan,
        ...controlPlan
    };
};

export { createFieldPlan };
export default createFieldPlan;
