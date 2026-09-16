import { resolveFootRows } from "./resolveFootRows.js";
import { mergeClassNames } from "./mergeClassNames.js";

const createFootPlan = ({ inFootConfig = {}, inClasses = {} } = {}) => {
    const defaultFootClass = inClasses?.foot || "pt-3 mt-3 border-top";
    const defaultRowsClass = inClasses?.footRows || "d-flex flex-column gap-2";
    const defaultRowClass = inClasses?.footRow || "d-flex align-items-center justify-content-end gap-2 flex-wrap";

    return {
        attributes: {
            class: mergeClassNames(defaultFootClass, inFootConfig?.class)
        },
        rowsClass: mergeClassNames(defaultRowsClass, inFootConfig?.rowsClass),
        rowClass: defaultRowClass,
        buttonClass: inClasses?.button || "btn btn-outline-secondary",
        rows: resolveFootRows({ inFootConfig })
    };
};

export { createFootPlan };
export default createFootPlan;
