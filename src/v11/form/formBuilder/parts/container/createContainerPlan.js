const createContainerPlan = ({ inContainerConfig = null, inClasses = {} } = {}) => {
    const localContainerConfig = inContainerConfig;
    const localClasses = inClasses;

    const containerClass = localClasses?.container || localContainerConfig?.class || "card shadow-sm border-0 mb-4";

    const containerAttributes = { class: containerClass };
    if (localContainerConfig?.id) {
        containerAttributes.id = localContainerConfig.id;
    }

    const headerConfig = localContainerConfig?.header || null;

    const headerClass = localClasses?.containerHeader
        || headerConfig?.class
        || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center";

    const titleClass = headerConfig?.titleClass || "fw-semibold text-secondary";

    const bodyClass = localClasses?.containerBody || localContainerConfig?.bodyClass || "card-body";

    const footerConfig = localContainerConfig?.footer || null;
    const footerClass = localClasses?.containerFooter || footerConfig?.class || "card-footer bg-light py-2";

    return {
        attributes: containerAttributes,
        header: headerConfig
            ? {
                config: headerConfig,
                class: headerClass,
                titleText: headerConfig.title || "Form",
                titleClass,
                iconClass: headerConfig.icon || "",
                actions: Array.isArray(headerConfig.actions) ? headerConfig.actions : []
            }
            : null,
        bodyClass,
        extraControls: Array.isArray(localContainerConfig?.extraControls) ? localContainerConfig.extraControls : [],
        footer: footerConfig
            ? {
                config: footerConfig,
                class: footerClass,
                text: footerConfig.text || ""
            }
            : null
    };
};

export { createContainerPlan };
export default createContainerPlan;
