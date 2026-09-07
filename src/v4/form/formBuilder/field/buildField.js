const buildField = ({ inColumn = {}, inClasses = {}, inConfig = {} } = {}) => {
    const localColumn = inColumn;
    const localClasses = inClasses;
    const localConfig = inConfig;

    const key = localColumn.key || "";
    const labelText = localColumn.label || key;
    const inputType = localColumn.type === "number" ? "number" : "text";

    // 1. Determine Control Alignment: "stacked" | "horizontal"
    const alignment = localConfig?.control?.alignment ||
                      localConfig?.alignment ||
                      (localConfig?.layout === "horizontal" ? "horizontal" : "stacked");

    const labelClass = alignment === "horizontal"
        ? (localClasses?.label || "col-sm-4 col-form-label text-sm-end mb-0")
        : (localClasses?.label || "form-label mb-1");

    const labelNode = {
        tagName: "label",
        textContent: labelText,
        attributes: labelClass ? { class: labelClass } : {}
    };

    const hasDatalist = localColumn.datalist === true || (localColumn.datalist !== false && inputType !== "number");
    const datalistId = localColumn.datalistId || `${key}-datalist`;

    const inputAttributes = {
        type: inputType,
        name: key,
        placeholder: `Enter ${labelText}...`
    };

    if (localClasses?.input) {
        inputAttributes.class = localClasses.input;
    }

    if (hasDatalist) {
        inputAttributes.list = datalistId;
    }

    const inputNode = {
        tagName: "input",
        attributes: inputAttributes
    };

    if (localColumn.id) {
        inputNode.attributes.id = localColumn.id;
        labelNode.attributes.for = localColumn.id;
    }

    // 2. Determine Search Buttons (Control Feature)
    const isSearchDisabled = localConfig?.control?.searchButtons === false ||
                             localConfig?.searchButtons === false ||
                             localColumn.searchButton === false ||
                             localColumn.search === false;
    const isSearchExplicit = localConfig?.control?.searchButtons === true ||
                             localConfig?.searchButtons === true ||
                             localColumn.searchButton === true ||
                             localColumn.search === true;
    const hasSearchButton = !isSearchDisabled && (isSearchExplicit || Boolean(localColumn.searchId));

    let controlNode;

    if (hasSearchButton) {
        const searchButtonNode = {
            tagName: "button",
            textContent: "Search",
            attributes: {
                type: "button",
                id: localColumn.searchId || `${key}-search`,
                name: `${key}-search`,
                "data-key": key,
                class: localClasses?.button || "btn btn-outline-secondary"
            }
        };

        const groupNode = {
            tagName: "div",
            attributes: localClasses?.group ? { class: localClasses.group } : {},
            children: [inputNode, searchButtonNode]
        };

        controlNode = groupNode;
    } else {
        controlNode = inputNode;
    }

    if (localClasses?.controlWrapper) {
        controlNode = {
            tagName: "div",
            attributes: { class: localClasses.controlWrapper },
            children: [controlNode]
        };
    }

    // 3. Determine Grid Column Class
    let defaultColClass = "";
    if (localConfig?.grid) {
        const gridCols = typeof localConfig.grid === "object"
            ? (localConfig.grid.columns || localConfig.grid.cols)
            : localConfig.grid;
        if (gridCols === 1) defaultColClass = "col-12";
        else if (gridCols === 2) defaultColClass = "col-md-6";
        else if (gridCols === 3) defaultColClass = "col-md-4";
        else if (gridCols === 4) defaultColClass = "col-md-3";
    }

    const fieldClass = localColumn.colClass || localColumn.class || defaultColClass || localClasses?.field || "";

    // 4. Wrap according to alignment
    if (alignment === "horizontal") {
        const controlWrapperNode = localClasses?.controlWrapper
            ? controlNode
            : {
                tagName: "div",
                attributes: { class: "col-sm-8" },
                children: [controlNode]
            };

        const innerRow = {
            tagName: "div",
            attributes: { class: "row align-items-center g-2" },
            children: [labelNode, controlWrapperNode]
        };

        return {
            tagName: "div",
            attributes: fieldClass ? { class: fieldClass } : {},
            children: [innerRow]
        };
    }

    return {
        tagName: "div",
        attributes: fieldClass ? { class: fieldClass } : {},
        children: [labelNode, controlNode]
    };
};

export { buildField };
export default buildField;
