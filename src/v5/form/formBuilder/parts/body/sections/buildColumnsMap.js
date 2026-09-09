const buildColumnsMap = ({ inColumns = [] } = {}) =>
    new Map(inColumns.filter(col => col?.key).map(col => [col.key, col]));

export { buildColumnsMap };
export default buildColumnsMap;