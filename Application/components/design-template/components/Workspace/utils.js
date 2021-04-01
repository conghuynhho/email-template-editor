import {typeElement} from 'Components/design-template/constants';
import {useCallback} from 'react';
import {result} from 'lodash';
import {string} from 'prop-types';
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
                    const contentKeys = getObjectPropSafely(
                        () => data.columns[key].contents
                    );

                    const contents = contentKeys.map((contentKey) => {
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

    const rows = getObjectPropSafely(
        () => designData.bodies[bodyKeyList[0]].rows
    );
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

    return (lastRowID > lastColumnID ? lastRowID : lastColumnID) > lastContentID
        ? lastRowID > lastColumnID
            ? lastRowID
            : lastColumnID
        : lastContentID;
};

export const getRowIDFromHtmlID = (data, htmlID) => {
    for (const key in data.rows) {
        if (
            htmlID === getObjectPropSafely(() => data.rows[key].values._meta.htmlID)
        ) {
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
        const contents = getObjectPropSafely(() => columns[key].contents);

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

export const getActiveElement = (data, activeElement) => {
    const {contents} = data;
    let type = '';

    switch (true) {
        case activeElement.indexOf('button') > -1:
            type = 'button';
            break;
        case activeElement.indexOf('text') > -1:
            type = 'text';
            break;
        case activeElement.indexOf('divider') > -1:
            type = 'line';
            break;
        case activeElement.indexOf('menu') > -1:
            type = 'menu';
            break;
        case activeElement.indexOf('image') > -1:
            type = 'image';
            break;
        case activeElement.indexOf('row') > -1:
            type = 'columns';
            break;
        default:
            type = 'general';

    }
    result.type = type.toUpperCase();

    const content = Object.values(contents).length ? Object.values(contents).find(item => item.values._meta.htmlID === activeElement) : {};

    return {
        type: type.toUpperCase(),
        content
    };
};

export const getContentIDFromHTMLID = (data, htmlID ) => {
    for (const key in data.contents) {
        if (htmlID === getObjectPropSafely(() => data.contents[key].values._meta.htmlID)) {
            return key;
        }
    }
    return '';
};

export const getActiveElementFromStore = (store) => {
    // function to get search group
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

export const removePercentPattern = (string) => {
    if (typeof string !== 'string') {return }
    if (string.indexOf('%') > -1) {
        return string.replace('%','');
    }
    return string;
};

export const getUnitAndValue = (string) => {
    const result = {
        unit: '',
        defaultValue: ''
    };

    const [unit] = string.match(/[a-zA-Z]+|%/g);
    const [defaultValue] = string.match(/\d+/g);

    result.defaultValue = defaultValue;
    result.unit = unit;
    return result;
};

export const convertShortHandCSS = (shortHand) => {
    const list = shortHand.split(' ');
    let result = {
        top: {
            unit: '',
            defaultValue: ''
        },
        right: {
            unit: '',
            defaultValue: ''
        },
        bottom: {
            unit: '',
            defaultValue: ''
        },
        left: {
            unit: '',
            defaultValue: ''
        }
    };

    if (!Array.isArray(list)) {return}
    switch (list.length) {
        case 1:
            result.top = result.bottom = result.left = result.right = {...getUnitAndValue(list[0])};
            break;
        case 2:
            result.top = result.bottom = {...getUnitAndValue(list[0])};
            result.left = result.right = {...getUnitAndValue(list[1])};
            break;
        case 3: 
            result.top = {...getUnitAndValue(list[0])};
            result.left = result.right = {...getUnitAndValue(list[1])};
            result.bottom = {...getUnitAndValue(list[2])};
            break;
        case 4: 
            result.top = {...getUnitAndValue(list[0])};
            result.right = {...getUnitAndValue(list[1])};
            result.bottom = {...getUnitAndValue(list[2])};
            result.left = {...getUnitAndValue(list[3])};
            break;
        default:
            break;
    }

    return result;
};

export const findAlignment = (list) => {
    if (!Array.isArray(list)) {return}
    const alignment = list.find(element => (getObjectPropSafely(() => element.type)) === 'ALIGNMENT');
    const result = getObjectPropSafely(()=>alignment.defaultValue);

    return result; 
};
export const validURL = (str) => {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!pattern.test(str);
};

export const getFontFamily = (string) => {
    const array = string.split(',');
    const result = array[0].replace(/'|"/g, '');

    return result;
};

// export const useDebounce = (fnToDebounce, durationInMs = 200) => {
//     if (isNaN(durationInMs)) {
//         throw new TypeError('durationInMs for debounce should be a number');
//     }

//     if (fnToDebounce == null) {
//         throw new TypeError('fnToDebounce cannot be null');
//     }

//     if (typeof fnToDebounce !== 'function') {
//         throw new TypeError('fnToDebounce should be a function');
//     }

//     return useCallback(debounce(fnToDebounce, durationInMs), [fnToDebounce, durationInMs]);
// };

