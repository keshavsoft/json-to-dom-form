import childSpec from "./child.json" with { type: "json" };

const startFunc = ({ inColumns = [], inSpecKey = "formVerticalCreate" } = {}) => {
    const specObject = childSpec[inSpecKey];

    const children = inColumns.map(element => {
        let loopInside = structuredClone(specObject);

        loopInside.children[0].children[0].textContent = element.label;
        loopInside.children[0].children[0].attributes.for = element.key;
        loopInside.children[0].children[1].children[0].attributes.name = element.key;
        loopInside.children[0].children[1].children[0].attributes.type = element?.type;

        return loopInside
    });

    return children;
};

export default startFunc;
