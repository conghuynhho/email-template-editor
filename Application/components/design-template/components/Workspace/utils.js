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

const removePercentPattern = (string) => {
    if (typeof string !== 'string') {return }
    if (string.indexOf('%') > -1) {
        return string.replace('%','');
    }
    return string;
};

const getUnitAndValue = (string) => {
    const result = {
        unit: '',
        defaultValue: ''
    };

    result.defaultValue = string.match(/\d+/g);
    result.unit = string.match(/[a-zA-Z]+/g);
    return result;
};
const convertShortHandCSS = (shortHand) => {
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

export const mapButtonDataToConfig = (data, config) => {
    const configClone = {...config};
    
    // set background color
    // getObjectPropSafely(() => config.resource.style[0].element[0]);
    if (configClone.resource.style[0].elements[0].defaultValue) {
        configClone.resource.style[0].elements[0].defaultValue = getObjectPropSafely(() => data.values.buttonColors.backgroundColor);
    }

    // set textColorButton
    // getObjectPropSafely(() => config.resource.style[0].elements[1]);
    if (configClone.resource.style[0].elements[1].defaultValue) {
        configClone.resource.style[0].elements[1].defaultValue = getObjectPropSafely(() => data.values.buttonColors.color);
    }
    // set text-input width
    // getObjectPropSafely(() => config.resource.style[0].elements[2]);
    if (configClone.resource.style[0].elements[2].defaultValue) {
        configClone.resource.style[0].elements[2].defaultValue = removePercentPattern(getObjectPropSafely(() => data.values.size.width));
    }

    // set width to auto 
    // getObjectPropSafely(() => config.resource.style[0].elements[3]);
    if (configClone.resource.style[0].elements[3].defaultValue) {
        configClone.resource.style[0].elements[3].defaultValue = (getObjectPropSafely(() => data.values.size.autoWidth));
    }

    // set alignment
    if (configClone.resource.style[0].elements[4].defaultValue) {
        configClone.resource.style[0].elements[4].defaultValue = (getObjectPropSafely(() => data.values.textAlign));
    }

    // set lineHeight
    // getObjectPropSafely(() => config.resource.style[0].elements[5]);
    if (configClone.resource.style[0].elements[5].defaultValue) {
        configClone.resource.style[0].elements[5].defaultValue = removePercentPattern(getObjectPropSafely(() => data.values.lineHeight));
    }
    
    // switch more option for button padding
    // if (configClone.resource.style[0].elements[7].defaultValue) {
    //     configClone.resource.style[0].elements[7].defaultValue = true;
    // }

    // set padding when is on moreOptions
    // getObjectPropSafely(() => config.resource.style[0].elements[8]);
    if (configClone.resource.style[0].elements[8].elementChild) {
        const elementChild = configClone.resource.style[0].elements[8].elementChild;
        const values = convertShortHandCSS((getObjectPropSafely(()=> data.values.padding)));

        configClone.resource.style[0].elements[8].elementChild[0] = {
            ...elementChild[0],
            ...getObjectPropSafely(() =>values.top)
        };
        configClone.resource.style[0].elements[8].elementChild[1] = {
            ...elementChild[1],
            ...getObjectPropSafely(() =>values.right)
        };
        configClone.resource.style[0].elements[8].elementChild[2] = {
            ...elementChild[2],
            ...getObjectPropSafely(() =>values.bottom)
        };
        configClone.resource.style[0].elements[8].elementChild[3] = {
            ...elementChild[3],
            ...getObjectPropSafely(() =>values.left)
        };
    }

    // set roundBorder
    // getObjectPropSafely(() => config.resource.style[0].elements[7]);
    if (configClone.resource.style[0].elements[9].defaultValue) {
        configClone.resource.style[0].elements[9].defaultValue = getObjectPropSafely(()=> data.values.borderRadius);
    }

    // switch true/false moreOptions Border
    // getObjectPropSafely(() => config.resource.style[0].elements[8]);

    // set border when is on moreOption border mode
    // getObjectPropSafely(() => config.resource.style[0].elements[9]);
    // TODO: DO IT LATER

    // set container padding
    // getObjectPropSafely(() => config.resource.style[0].elements[10]);
    if (configClone.resource.style[0].elements[13].defaultValue) {
        const values = convertShortHandCSS((getObjectPropSafely(()=> data.values.containerPadding)));

        configClone.resource.style[0].elements[13].defaultValue = getObjectPropSafely(()=> values.top);
    }

    // switch more option for container padding
    // getObjectPropSafely(() => config.resource.style[0].elements[11]);

    // STYLE[1]
    // switch mode hide on destop
    if (configClone.resource.style[1].elements[0].defaultValue) {
        configClone.resource.style[1].elements[0].defaultValue = getObjectPropSafely(() => data.values.hideOnDesktop);
    }
    // SET GENERAL
    // set link
    if (configClone.resource.general[0].elements[1].defaultValue) {
        configClone.resource.general[0].elements[0].defaultValue = getObjectPropSafely(() => data.values.href.values.href);
    }   
    return configClone;
};

