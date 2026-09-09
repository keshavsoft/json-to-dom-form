const hasSections = ({ inConfig = {} } = {}) =>
    Array.isArray(inConfig?.sections) && inConfig.sections.length > 0;

export { hasSections };
export default hasSections;