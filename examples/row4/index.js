import childSpec from "./spec.json" with { type: "json" };

const startFunc = () => {
    window.ks['json-to-dom'].specToDom({
        spec: childSpec,
        domIdToPushTo: "form-container"
    });

    const downloadButton = document.getElementById("reverse-download-btn");

    const handleDownload = () => {
        const reverseResult = getSpecFromSelectedId();
        if (!reverseResult) return;
        const selectedId = "start";

        const targetElement = document.getElementById(selectedId);

        const jsonText = showSpec({ inSpec: reverseResult.spec });
        const fileName = toSafeFileName({ inId: reverseResult.id });

        downloadTextFile({
            inFileName: fileName,
            inText: jsonText
        });

        globalThis.lastReverseId = reverseResult.id;
        globalThis.lastReverseSpec = reverseResult.spec;
        globalThis.domToSpecV13 = ({ inNode }) => domToSpec({ inNode });

        console.log(`[json-to-dom v13 reverse] #${reverseResult.id} -> spec`, reverseResult.spec);
        setStatus({ inText: `Downloaded ${fileName}` });
    };

    downloadButton?.addEventListener("click", handleDownload);

};

startFunc();
