import {
    buildContainer, buildHead, buildBody,
    buildFoot, buildBodyV1
} from "./parts/index.js";

const buildForm = ({ inColumns = [], inConfig = {}, inClasses = {} } = {}) => {
    const localColumns = inColumns;
    const localConfig = inConfig;
    const localClasses = inClasses;

    const head = buildHead({ inHeadConfig: localConfig?.head, inClasses: localClasses });
    // const body = buildBody({ inColumns: localColumns, inConfig: localConfig, inClasses: localClasses });
    const foot = buildFoot({ inFootConfig: localConfig?.foot, inClasses: localClasses });

    const body = buildBodyV1({
        inColumns: localColumns,
        inConfig: localConfig
    });

    console.log("body : ", body);

    const formAttr = localClasses?.form ? { class: localClasses.form } : {};

    const formSpec = {
        tagName: "div",
        attributes: formAttr,
        children: [head, body, foot].filter(Boolean)
    };

    const finalSpec = buildContainer({
        inContainerConfig: localConfig?.container,
        inFormSpec: formSpec,
        inClasses: localClasses
    });

    return finalSpec;
};

export { buildForm };
export default buildForm;
