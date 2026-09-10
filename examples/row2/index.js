import childSpec from "./spec.json" with { type: "json" };

const startFunc = () => {
    window.ks['json-to-dom'].specToDom({
        spec: childSpec,
        domIdToPushTo: "form-container"
    });
};

startFunc();
