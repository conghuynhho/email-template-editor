import {getObjectPropSafely} from 'Utils';
import {typeElement} from 'Components/design-template/constants';

export const hierarchyDesignData = (data) => {
    const body = getObjectPropSafely(() => data.bodies);
    let bodyValues = {};
    const rows = [];
    let rowPositions = [];

    for (const key in body) {
        bodyValues = getObjectPropSafely(() => data.bodies[key].values);
        rowPositions = getObjectPropSafely(() => data.bodies[key].rows);

    }

    // for (const key in data.rows) { // 1
    rowPositions.forEach(row => {

        const columnKeys = getObjectPropSafely(() => data.rows[row].columns); // 2
    
        const columns = columnKeys.map(columnKey => {
            
            for (const key in data.columns) {
                if (key === columnKey) {

                    const contentKeys = getObjectPropSafely(() => data.columns[key].contents);
    
                    const contents = contentKeys.map(contentKey => {
    
                        for (const key in data.contents) {
                            if (key === contentKey) {
    
                                return {
                                    type: getObjectPropSafely(() => data.contents[key].type),
                                    slug: undefined,
                                    values: getObjectPropSafely(() => data.contents[key].values)
                                };
                            }
                        }
                    });
    
                    return {
                        contents: contents,
                        values: getObjectPropSafely(() => data.columns[key].values)
                    };
                }
            }
        });
    
        rows.push({
            cells: getObjectPropSafely(() => data.rows[row].cells), // 3
            values: getObjectPropSafely(() => data.rows[row].values), // 4
            columns: columns 
        });
    });

    // }

    const saveDesignData = {
        body: {
            rows: rows,
            values: bodyValues
        },
        counters: getObjectPropSafely(() => data.idCounters),
        schemaVersion: getObjectPropSafely(() => data.schemaVersion)
    };

    return saveDesignData;
};

export const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return [...result];
};

export const getRowId = (designData, rowIndex) => {
    const bodyKeyList = [];

    for (const key in designData.bodies) {
        bodyKeyList.push(key);
    }

    const rows = getObjectPropSafely(() => designData.bodies[bodyKeyList[0]].rows);
    const rowId = rows[rowIndex];

    return rowId;
};

export const getColumnId = (designData, rowId, columnIndex) => {
    const columns = getObjectPropSafely(() => designData.rows[rowId].columns);
    const columnId = columns[columnIndex];

    return columnId;
};

export const getRowsFromBodies = (bodies) => {
    const valueList = Object.values(bodies);

    return [...valueList[0].rows];
};

export const getLastUsingId = (data) => {
    const contentIdList = Object.keys(getObjectPropSafely(() => data.contents));
    const lastContentID = contentIdList[contentIdList.length - 1];
    
    const columnIdList = Object.keys(getObjectPropSafely(() => data.columns));
    const lastColumnID = columnIdList[columnIdList.length - 1];

    const rowIdList = Object.keys(getObjectPropSafely(() => data.rows));
    const lastRowID = rowIdList[rowIdList.length - 1];

    return (lastRowID > lastColumnID ? lastRowID : lastColumnID) > lastContentID ? (lastRowID > lastColumnID ? lastRowID : lastColumnID) : lastContentID;
};

export const getRowIDFromHtmlID = (data, htmlID) => {
    
    for (const key in data.rows) {
        if (htmlID === getObjectPropSafely(() => data.rows[key].values._meta.htmlID)) {
            return key;
        }
    }
    return '';
};

export const getRowIndexFromId = (data, rowId) => {

    const rows = getRowsFromBodies(getObjectPropSafely(() => data.bodies));
    let result = '';

    if (Array.isArray(rows) && rows.length) {
        rows.forEach((row, index) => {
            if (row === rowId) {
                result = index;
            }
        });    
    }

    return result;
};

export const getContentIDFromHTMLID = (data, htmlID ) => {
    for (const key in data.contents) {
        if (htmlID === getObjectPropSafely(() => data.contents[key].values._meta.htmlID)) {
            return key;
        }
    }
    return '';
};

export const getActiveElement = (store) => {
    const getSearchGroup = (searchString, typeElement) => {
        const searchStringUpperCase = searchString.toUpperCase();
        let result = '';

        for ( const key in typeElement) {
            const type = typeElement[key];

            if (searchStringUpperCase.includes(type)) {result = type}
        }
        return result;
    };
    const activeElementHTMLID = getObjectPropSafely(() => store.activeElement);
    const groupKey = getSearchGroup(activeElementHTMLID, typeElement);

    switch (groupKey) {
        case typeElement.TEXT : {
            const textID = getContentIDFromHTMLID(store, activeElementHTMLID);
            const textElement = getObjectPropSafely(() => store.contents[textID]);

            return textElement;
        }
        case typeElement.BUTTON: {
            const buttonID = getContentIDFromHTMLID(store, activeElementHTMLID);
            const buttonElement = getObjectPropSafely(() => store.contents[buttonID]);

            return buttonElement;
        }
        case typeElement.COLUMNS:
            return groupKey;
        case typeElement.LINE:
            return groupKey;
        default:
            return groupKey;
    }

};
