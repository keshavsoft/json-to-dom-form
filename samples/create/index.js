import { Form } from "./Form.js";

const startFunc = async () => {
    try {
        console.log("[create2] Fetching JSONs...");
        const [structure, columns, config, data] = await Promise.all([
            fetch("./structure.json").then(r => r.json()),
            fetch("./columns.json").then(r => r.json()),
            fetch("./form/config.json").then(r => r.json()),
            fetch("./data.json").then(r => r.json())
        ]);

        console.log("[create2] Initializing Form...");
        const form = new Form({
            inStructure: structure,
            inColumns: columns,
            inConfig: config,
            inData: data,
            inTargetContainerId: "form-container"
        });

        console.log("[create2] Rendering Form...");
        const res = form.render();
        console.log("[create2] Rendered successfully:", res);
    } catch (err) {
        console.error("[create2 Error]:", err);
    }
};

startFunc();
