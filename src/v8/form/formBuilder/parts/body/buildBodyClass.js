const buildBodyClass = ({ inConfig = {}, inClasses = {} } = {}) =>
    inConfig?.grid ? `row g-${inConfig.grid?.gap ?? 3}` : inClasses?.body || "";

export { buildBodyClass };
export default buildBodyClass;