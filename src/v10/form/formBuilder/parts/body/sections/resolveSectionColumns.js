const resolveSectionColumns = ({ inSection = {}, inColumnsMap = new Map() } = {}) =>
    (Array.isArray(inSection.columns) ? inSection.columns : [])
        .map(col => typeof col === "string" ? inColumnsMap.get(col) : col)
        .filter(Boolean);

export { resolveSectionColumns };
export default resolveSectionColumns;