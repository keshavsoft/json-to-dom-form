import columnSpecs from "./columns.json" with { type: "json" };
import childSpec from "./child.json" with { type: "json" };

const startFunc = async () => {
    const container = document.getElementById("form-container");

    const testArray = columnSpecs.map(element => {
        let loopInside = structuredClone(childSpec);

        loopInside.children[0].children[0].textContent = element.label;
        loopInside.children[0].children[0].attributes.for = element.key;
        loopInside.children[0].children[1].children[0].attributes.name = element.key;
        loopInside.children[0].children[1].children[0].attributes.type = element?.type;
        console.log("loopInside : ", loopInside);

        return loopInside
    });
    console.log("testArray ---: ", testArray);
    const specElement = window.ks['json-to-dom'].buildSpecElement({ inSpec: testArray });

    specElement.forEach(element => {
        container.appendChild(element);
    });
};

startFunc();
