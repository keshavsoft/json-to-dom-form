import childSpec from "./child.json" with { type: "json" };

const startFunc = ({ inColumns = [], inConfig, inSpecKey = "formVerticalCreate" } = {}) => {
    const specKey = inConfig.body.specKey;
    const splitArray = specKey.split(".");
    // const specObject = childSpec[specKey];

    const specObject = splitArray.reduce(
        (acc, key) => acc?.[key],
        childSpec
    );

    console.log("specObject : ", specObject);

    const children = inColumns.map(element => {
        let loopInside = structuredClone(specObject);

        loopInside.children[0].children[0].textContent = element.label;
        loopInside.children[0].children[0].attributes.for = element.key;
        loopInside.children[0].children[1].children[0].attributes.name = element.key;
        loopInside.children[0].children[1].children[0].attributes.type = element?.type;

        return loopInside
    });

    console.log("children---- : ", children);

    return children;
};

export default startFunc;
