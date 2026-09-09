const resolveAlignment = ({ inConfig = {} } = {}) =>
    inConfig?.control?.alignment ||
    inConfig?.alignment ||
    (inConfig?.layout === "horizontal" ? "horizontal" : "stacked");

const resolveLabelClass = ({ inAlignment = "stacked", inClasses = {} } = {}) =>
    inAlignment === "horizontal"
        ? (inClasses?.label || "col-sm-4 col-form-label text-sm-end mb-0")
        : (inClasses?.label || "form-label mb-1");

const resolveInputType = ({ inColumn = {} } = {}) =>
    inColumn.type === "number" ? "number" : "text";

const resolveHasDatalist = ({ inColumn = {}, inInputType = "text" } = {}) =>
    inColumn.datalist === true || (inColumn.datalist !== false && inInputType !== "number");

const resolveHasSearchButton = ({ inColumn = {}, inConfig = {} } = {}) => {
    const isSearchDisabled = inConfig?.control?.searchButtons === false ||
        inConfig?.searchButtons === false ||
        inColumn.searchButton === false ||
        inColumn.search === false;

    const isSearchExplicit = inConfig?.control?.searchButtons === true ||
        inConfig?.searchButtons === true ||
        inColumn.searchButton === true ||
        inColumn.search === true;

    return !isSearchDisabled && (isSearchExplicit || Boolean(inColumn.searchId));
};

const resolveDefaultColClass = ({ inConfig = {} } = {}) => {
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

const createFieldModel = ({ inColumn = {}, inClasses = {}, inConfig = {} } = {}) => {
    const key = inColumn.key || "";
    const labelText = inColumn.label || key;
    const inputType = resolveInputType({ inColumn });
    const alignment = resolveAlignment({ inConfig });
    const hasDatalist = resolveHasDatalist({ inColumn, inInputType: inputType });
    const defaultColClass = resolveDefaultColClass({ inConfig });

    return {
        key,
        labelText,
        inputType,
        alignment,
        inputId: inColumn.id || "",
        labelClass: resolveLabelClass({ inAlignment: alignment, inClasses }),
        inputClass: inClasses?.input || "",
        buttonClass: inClasses?.button || "btn btn-outline-secondary",
        groupClass: inClasses?.group || "",
        controlWrapperClass: inClasses?.controlWrapper || "",
        hasDatalist,
        datalistId: inColumn.datalistId || `${key}-datalist`,
        hasSearchButton: resolveHasSearchButton({ inColumn, inConfig }),
        searchButtonId: inColumn.searchId || `${key}-search`,
        fieldClass: inColumn.colClass || inColumn.class || defaultColClass || inClasses?.field || ""
    };
};

export { createFieldModel };
export default createFieldModel;
