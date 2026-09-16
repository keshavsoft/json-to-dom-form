const mergeClassNames = (...inValues) => Array.from(new Set(
    inValues
        .filter(Boolean)
        .join(" ")
        .split(/\s+/)
        .filter(Boolean)
)).join(" ");

export { mergeClassNames };
export default mergeClassNames;
