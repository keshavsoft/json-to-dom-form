const resolveHasDatalist = ({ inColumn = {}, inInputType = "text" } = {}) =>
    inColumn.datalist === true || (inColumn.datalist !== false && inInputType !== "number");

const resolveHasSearchAction = ({ inColumn = {}, inConfig = {} } = {}) => {
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

const createControlPlan = ({
    inColumn = {},
    inClasses = {},
    inConfig = {},
    inFieldIdentity = {}
} = {}) => {
    const hasDatalist = resolveHasDatalist({
        inColumn,
        inInputType: inFieldIdentity.inputType
    });

    return {
        hasDatalist,
        datalistId: inColumn.datalistId || `${inFieldIdentity.key}-datalist`,
        hasSearchAction: resolveHasSearchAction({ inColumn, inConfig }),
        searchButtonId: inColumn.searchId || `${inFieldIdentity.key}-search`,
        inputClass: inClasses?.input || "",
        buttonClass: inClasses?.button || "btn btn-outline-secondary",
        groupClass: inClasses?.group || "",
        controlWrapperClass: inClasses?.controlWrapper || ""
    };
};

export { createControlPlan };
export default createControlPlan;
