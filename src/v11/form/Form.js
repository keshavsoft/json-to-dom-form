import { FormStore } from "./formStore/index.js";
import { createMethods } from "./methods/index.js";
import { createActions } from "./actions/index.js";

class Form {
    constructor({
        data = {},
        columns = [],
        config = {},
        layout,
        theme,
        classes = {},
        dataProvider = null,
        targetContainerId = ""
    } = {}) {
        const localData = data;
        const localColumns = columns;
        const localConfig = config;
        const localLayout = layout || localConfig?.layout || "stacked";
        const localTheme = theme || localConfig?.theme || "default";
        const localClasses = classes;
        const localDataProvider = dataProvider;
        const localTargetContainerId = targetContainerId;

        this.containerId = localTargetContainerId;
        this.layout = localLayout;
        this.theme = localTheme;
        this.customClasses = localClasses;

        this.dataProvider = localDataProvider;
        this.formElement = null;
        this.controlsTree = null;

        this.store = new FormStore({
            inData: localData,
            inColumns: localColumns,
            inConfig: localConfig
        });

        this.methods = createMethods({ inForm: this });
        this.actions = createActions({ inForm: this });
    };

    render(args = {}) {
        return this.methods.render(args);
    };

    async load(args = {}) {
        return await this.actions.load(args);
    }

    update(args = {}) {
        return this.actions.update(args);
    }

    getData() {
        return this.actions.getData();
    }

    setData(args = {}) {
        return this.actions.setData(args);
    }

    reset() {
        return this.actions.reset();
    }

    getControlsTree() {
        return this.controlsTree;
    }

    get columns() {
        return this.store.activeColumns;
    }

    get config() {
        return this.store.config;
    }

    get data() {
        return this.store.formData;
    }
}

export { Form };
export default Form;
