import { buildField } from "../field/index.js";
const buildSectionFields = ({ inColumns = [], inClasses = {}, inConfig = {} } = {}) =>
    inColumns.map(inColumn => buildField({ inColumn, inClasses, inConfig }));
export { buildSectionFields };
export default buildSectionFields;