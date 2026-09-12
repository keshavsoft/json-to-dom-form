import { Form } from "./Form.js";

const startFunc = async () => {
    console.log("[docs/spec] Starting educational demo...");
    const elCodeStructure = document.getElementById("code-structure");
    const elCodeData = document.getElementById("code-data");
    const elCodeSpec = document.getElementById("code-compiled-spec");
    const elOutputState = document.getElementById("output-form-data");
    const elStatusBadge = document.getElementById("status-badge");

    try {
        console.log("[docs/spec] Fetching JSONs...");
        const [structure, columns, config, initialData] = await Promise.all([
            fetch("./structure.json").then(r => r.json()),
            fetch("./columns.json").then(r => r.json()),
            fetch("./form/config.json").then(r => r.json()),
            fetch("./data.json").then(r => r.json())
        ]);

        console.log("[docs/spec] JSONs fetched successfully.");

        // Show raw JSON source panes
        if (elCodeStructure) elCodeStructure.textContent = JSON.stringify(structure, null, 2);
        if (elCodeData) elCodeData.textContent = JSON.stringify({ columns, initialData, config }, null, 2);

        const t0 = performance.now();

        // 1. Initialize Form with Approach A (Full Blueprint Compilation via json-to-spec)
        const form = new Form({
            inStructure: structure,
            inColumns: columns,
            inConfig: config,
            inData: initialData,
            inTargetContainerId: "form-container"
        });

        // 2. Render Form via CDN pipeline
        const renderResult = form.render();
        const elapsed = (performance.now() - t0).toFixed(2);

        // 3. Show Compiled Spec
        if (elCodeSpec) {
            elCodeSpec.textContent = JSON.stringify(renderResult.spec, null, 2);
        }

        if (elStatusBadge) {
            elStatusBadge.textContent = `Compiled & Rendered in ${elapsed}ms`;
        }

        // 4. Update live data display
        const updateDisplay = () => {
            const currentData = form.getData();
            if (elOutputState) {
                elOutputState.textContent = JSON.stringify(currentData, null, 2);
            }
        };
        updateDisplay();

        // 5. Attach event listeners
        const formElement = document.getElementById("entry-form");
        if (formElement) {
            formElement.addEventListener("submit", (e) => {
                e.preventDefault();
                updateDisplay();
                alert("Form Saved:\n" + JSON.stringify(form.getData(), null, 2));
            });

            formElement.addEventListener("input", () => {
                updateDisplay();
            });
        }

        const resetBtn = document.getElementById("btn-reset");
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                form.reset();
                updateDisplay();
            });
        }

        console.log("[docs/spec] Form educational demo rendered successfully:", form);
    } catch (err) {
        console.error("[docs/spec Error]:", err);
        if (elStatusBadge) {
            elStatusBadge.textContent = "Error: " + err.message;
            elStatusBadge.className = "px-3 py-1 text-xs font-mono rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20";
        }
    }
};

startFunc();
