import { hasSections } from "./hasSections.js";
import { buildSections } from "./buildSections.js";
import { buildFieldRows } from "./buildFieldRows.js";
import { buildBodyClass } from "./buildBodyClass.js";

const buildBody = ({ inColumns = [], inConfig = {}, inClasses = {} } = {}) => {
    if (!Array.isArray(inColumns)) {
        return { tagName: "div", children: [] };
    }

    if (hasSections({ inConfig })) {
        return buildSections({ inColumns, inConfig, inClasses });
    }

    const children = buildFieldRows({ inColumns, inConfig, inClasses });
    const bodyClass = buildBodyClass({ inConfig, inClasses });

    return {
        tagName: "div",
        attributes: bodyClass ? { class: bodyClass } : {},
        children
    };
};

export { buildBody };
export default buildBody;