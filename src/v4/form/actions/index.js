const createActions = ({ inForm } = {}) => {
    const localForm = inForm;

    const localLoad = async ({ inQuery = {} } = {}) => {
        if (!localForm?.dataProvider || typeof localForm.dataProvider.read !== "function") {
            return localForm?.store?.formData || {};
        }
        try {
            const fetchedData = await localForm.dataProvider.read({ inQuery });
            const record = Array.isArray(fetchedData) ? fetchedData[0] : (fetchedData?.data || fetchedData || {});
            localForm.store.updateData({ inData: record });
            localForm.renderStructure();
            return record;
        } catch (error) {
            console.error("[json-to-dom-form:load] Failed to load data via dataProvider:", error);
            return localForm?.store?.formData || {};
        }
    };

    const localUpdate = ({ inData = {} } = {}) => {
        localForm.store.updateData({ inData });
        return localForm.renderStructure();
    };

    const localGetData = () => {
        if (!localForm?.formElement) return {};

        const result = {};
        const collect = (node) => {
            if (!(node instanceof Element)) return;

            const candidates = node.matches ? node.matches("input, select, textarea") ? [node] : [] : [];
            const childInputs = Array.from(node.querySelectorAll("input, select, textarea"));
            const allInputs = [...candidates, ...childInputs];

            allInputs.forEach((control) => {
                if (!control.name) return;

                if (control instanceof HTMLInputElement && (control.type === "checkbox" || control.type === "radio")) {
                    if (control.checked) {
                        result[control.name] = control.value ?? true;
                    }
                    return;
                }

                if (control instanceof HTMLSelectElement && control.multiple) {
                    result[control.name] = Array.from(control.selectedOptions).map(option => option.value);
                    return;
                }

                if (control instanceof HTMLInputElement && control.type === "file") {
                    result[control.name] = control.files?.length ? Array.from(control.files).map(file => file.name) : "";
                    return;
                }

                result[control.name] = control.value;
            });
        };

        if (localForm.formElement instanceof HTMLFormElement) {
            collect(localForm.formElement);
            return result;
        }

        collect(localForm.formElement);
        return result;
    };

    const localSetData = ({ inData = {} } = {}) => {
        return localUpdate({ inData });
    };

    const localReset = () => {
        if (localForm?.formElement && typeof localForm.formElement.reset === "function") {
            localForm.formElement.reset();
        }
    };

    return {
        load: localLoad,
        update: localUpdate,
        getData: localGetData,
        setData: localSetData,
        reset: localReset
    };
};

export { createActions };
export default createActions;
