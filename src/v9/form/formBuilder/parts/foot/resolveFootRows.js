const hasButtons = inRow => Array.isArray(inRow?.buttons) && inRow.buttons.length > 0;

const resolveFootRows = ({ inFootConfig = {} } = {}) => {
    if (Array.isArray(inFootConfig?.rows)) {
        return inFootConfig.rows.filter(hasButtons);
    }

    if (Array.isArray(inFootConfig?.buttons) && inFootConfig.buttons.length > 0) {
        return [{ buttons: inFootConfig.buttons }];
    }

    return [];
};

export { resolveFootRows };
export default resolveFootRows;
