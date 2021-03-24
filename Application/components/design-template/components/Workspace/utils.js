import {getObjectPropSafely} from 'Utils';

export const hierarchyDesignData = (data) => {
    const body = getObjectPropSafely(() => data.bodies);
    let bodyValues = {};
    const rows = [];
    let rowPositions = [];

    for (const key in body) {
        bodyValues = getObjectPropSafely(() => data.bodies[key].values);
        rowPositions = getObjectPropSafely(() => data.bodies[key].rows);

    }

    rowPositions.forEach(row => {

        const columnKeys = getObjectPropSafely(() => data.rows[row].columns);
    
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
            cells: getObjectPropSafely(() => data.rows[row].cells), 
            values: getObjectPropSafely(() => data.rows[row].values), 
            columns: columns 
        });
    });

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

export const getContentId = (designData, columnId, contentIndex) => {
    const contents = getObjectPropSafely(() => designData.columns[columnId].contents);
    const contentId = contents[contentIndex];

    return contentId;
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

export const getContentIDFromHtmlID = (data, htmlID) => {
    const contents = getObjectPropSafely(() => data.contents);

    for (const key in contents) {
        if (getObjectPropSafely(() => contents[key].values._meta.htmlID) === htmlID) {
            return key;
        }
    }
    return '';
};

export const getContentIndexFromID = (data, contentID) => {
    const columns = getObjectPropSafely(() => data.columns);
    let contentIdx = -1;

    for (const key in columns) {
        const contents = getObjectPropSafely(() =>columns[key].contents);

        contents.length && contents.forEach((ID, index) => {
            
            if (contentID + '' === ID + '') {
                contentIdx = index;
            }
        });

        if (contentIdx !== -1) {

            return {
                columnID: key,
                contentIndex: contentIdx
            };
        }
    }

    return {
        columnID: '',
        contentIndex: -1
    };
};

export const getColumnIndexFromID = (data, columnID) => {
    const rows = getObjectPropSafely(() => data.rows);
    let columnIdx = -1;

    for (const key in rows) {
        const columns = getObjectPropSafely(() => rows[key].columns);
        
        columns.length && columns.forEach((ID, index) => {
            if (columnID === ID) {
                columnIdx = index;
            }
        });

        if (columnIdx !== -1) {
            return {
                rowID: key,
                columnIndex: columnIdx
            };
        }
    }

    return {
        rowID: '',
        columnIndex: -1
    };
};

export const updateUsageCounters = (usageCounters, htmlType, operator = 'add') => {
    const newUsageCounters = {...usageCounters};

    if (operator === 'subtract') {
        switch (htmlType) {
            case 'page': newUsageCounters.u_page--;
                break;
            case 'body': newUsageCounters.u_body--;
                break;
            case 'row': newUsageCounters.u_row--;
                break;
            case 'column': newUsageCounters.u_column--;
                break;
            case 'button': newUsageCounters.u_content_button--;
                break;
            case 'divider': newUsageCounters.u_content_divider--;
                break;
            case 'image': newUsageCounters.u_content_image--;
                break;
            case 'menu': newUsageCounters.u_content_menu--;
                break;
            case 'social': newUsageCounters.u_content_social--;
                break;
            case 'text': newUsageCounters.u_content_text--;
                break;
            default: break;
        }
    }
    if (operator === 'add') {
        switch (htmlType) {
            case 'page': newUsageCounters.u_page++;
                break;
            case 'body': newUsageCounters.u_body++;
                break;
            case 'row': newUsageCounters.u_row++;
                break;
            case 'column': newUsageCounters.u_column++;
                break;
            case 'button': newUsageCounters.u_content_button++;
                break;
            case 'divider': newUsageCounters.u_content_divider++;
                break;
            case 'image': newUsageCounters.u_content_image++;
                break;
            case 'menu': newUsageCounters.u_content_menu++;
                break;
            case 'social': newUsageCounters.u_content_social++;
                break;
            case 'text': newUsageCounters.u_content_text++;
                break;
            default: break;
        }
    }
    return newUsageCounters;
};