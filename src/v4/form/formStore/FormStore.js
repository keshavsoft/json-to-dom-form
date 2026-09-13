import { SourceStore } from "../../common/SourceStore.js";

const isPlainObject = (value) => {
    return !!value && typeof value === "object" && !Array.isArray(value) && !(value instanceof Date);
};

const mergeJsonValues = (currentValue, incomingValue) => {
    if (incomingValue === undefined) {
        return currentValue;
    }

    if (Array.isArray(currentValue) || Array.isArray(incomingValue)) {
        return incomingValue ?? currentValue;
    }

    if (!isPlainObject(currentValue) || !isPlainObject(incomingValue)) {
        return incomingValue ?? currentValue;
    }

    const merged = { ...currentValue };
    Object.entries(incomingValue).forEach(([key, value]) => {
        merged[key] = mergeJsonValues(merged[key], value);
    });

    return merged;
};

class FormStore extends SourceStore {
    constructor({ inColumns = [], inConfig = {}, inData = {} } = {}) {
        const localColumns = inColumns;
        const localConfig = inConfig;
        const localData = inData;

        super({
            inColumns: localColumns,
            inConfig: localConfig
        });

        this.library = this._buildLibrary({
            inSource: this.source,
            inData: localData
        });
    }

    _buildLibrary({ inSource, inData = {} } = {}) {
        const localSource = inSource;
        const localData = inData;

        const activeColumns = this._resolveActiveColumns({
            inColumnsCatalog: localSource?.columns,
            inColumnKeys: localSource?.config?.body?.columns
        });

        return {
            activeColumns,
            formData: (localData && typeof localData === "object") ? localData : {}
        };
    }

    get activeColumns() {
        return this.library.activeColumns;
    }

    get formData() {
        return this.library.formData || {};
    }

    updateData({ inData = {} } = {}) {
        const baseData = this.library.formData || {};
        this.library.formData = mergeJsonValues(baseData, inData);
        return this.library.formData;
    }
}

export { FormStore };
export default FormStore;
