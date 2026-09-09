import { buildField } from "../field/index.js";
const buildFieldRows = ({ inColumns = [], inClasses = {}, inConfig = {} } = {}) =>
    inColumns.map(inColumn => buildField({ inColumn, inClasses, inConfig }));
export { buildFieldRows }; export default buildFieldRows;