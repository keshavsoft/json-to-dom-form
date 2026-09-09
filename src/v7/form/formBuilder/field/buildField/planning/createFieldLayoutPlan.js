const resolveAlignment = ({ inConfig = {} } = {}) =>
    inConfig?.control?.alignment ||
    inConfig?.alignment ||
    (inConfig?.layout === "horizontal" ? "horizontal" : "stacked");

const resolveLabelClass = ({ inAlignment = "stacked", inClasses = {} } = {}) =>
    inAlignment === "horizontal"
        ? (inClasses?.label || "col-sm-4 col-form-label text-sm-end mb-0")
        : (inClasses?.label || "form-label mb-1");

const resolveDefaultFieldClass = ({ inConfig = {} } = {}) => {
    if (!inConfig?.grid) {
        return "";
    }

    const gridCols = typeof inConfig.grid === "object"
        ? (inConfig.grid.columns || inConfig.grid.cols)
        : inConfig.grid;

    if (gridCols === 1) return "col-12";
    if (gridCols === 2) return "col-md-6";
    if (gridCols === 3) return "col-md-4";
    if (gridCols === 4) return "col-md-3";

    return "";
};

const createFieldLayoutPlan = ({ inColumn = {}, inClasses = {}, inConfig = {} } = {}) => {
    const alignment = resolveAlignment({ inConfig });
    const defaultFieldClass = resolveDefaultFieldClass({ inConfig });

    return {
        alignment,
        labelClass: resolveLabelClass({ inAlignment: alignment, inClasses }),
        fieldClass: inColumn.colClass || inColumn.class || defaultFieldClass || inClasses?.field || ""
    };
};

export { createFieldLayoutPlan };
export default createFieldLayoutPlan;
