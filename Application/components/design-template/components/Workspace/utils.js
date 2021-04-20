import {debounce, result} from 'lodash';
import {string} from 'prop-types';
import {getObjectPropSafely} from 'Utils';
import {typeElement} from 'Components/design-template/constants';
import {useCallback} from 'react';

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
        case activeElement.indexOf('html') > -1:
            type = 'html';
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
    const resultArray = shortHand.replace(/[^.0-9\s]/g,'').split(' ');

    const [a,b,c,d] = resultArray;
    const result = {};

    result.top = a;
    result.right = b || a;
    result.bottom = c || a;
    result.left = d || b || a;
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
    // convert action string to action code
export const getActionType = (actionName) =>{
    switch (actionName) {
        case 'web':
            return 1;
        
        default: 
            return 1;
    }
};
    // convert target string to target code
export const getTarget = (target) => {
    switch (target) {
        case '_blank':
            return 1;
        default:
            return 1;
    }
};
export const getTypeOfImage = (imageLink) => {
    if (validURL(imageLink)) {return 'imageUrl'}
    return 'uploadImage';
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

export const getHmtlDivider = (values) => {
    const html = `<table height="0px" align="${values.textAlign || ''}" border="0" cellpadding="0" cellspacing="0" width="${values.width || ''}" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: ${values.border.borderTopWidth || ''} ${values.border.borderTopStyle || ''} ${values.border.borderTopColor || ''};-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
        <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <span>&#160;</span>
                </td>
            </tr>
        </tbody>
    </table>
    `;

    return html;
};

export const getHtmlImg = (values) => {
    const html = `<table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                <img align="${values.textAlign || ''}" border="0" src="${values.src.url || ''}" alt="Image" title="${values.altText}" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;${values.src.maxWidth ? `width: ${values.src.maxWidth};` : ''}max-width: 138.6px;"  class="v-src-width v-src-max-width"/>
            </td>
        </tr>
    </table>
    `;

    return html;
};

export const getHtmlMenu = (values) => {
    let  html = `<div class="menu" style="text-align: ${values.align || ''}">
    `;

    values.menu.items.forEach((items => {
        html += `<span style="padding:${values.padding || ''};display:${(values.layout == 'horizontal') ? 'inline' : 'block'}; color:${values.textColor || ''}; font-family: ${values.fontFamily.value || '\'Montserrat\',sans-serif'};font-size:${values.fontSize || ''}">
        ${items.text || ''}
        </span>
        `;
    }));
    html += `</div>
    `;
    return html;
};

export const getHtmlText = (values) => {
    const html = `<div class="v-text-align" style="color: ${values.color || ''}; line-height: ${values.lineHeight || ''}; text-align: ${values.textAlign || ''}; word-wrap: break-word;">
        ${values.text}`;

    return html;
};

export const getHtmlButton = (values) => {
    const font = '\'Montserrat\',sans-serif';
    const html = `<div class="v-text-align" align="${values.textAlign}">
                                        <a href="" target="_blank" style="box-sizing: border-box;display: inline-block;font-family: ${font};text-decoration: none;-webkit-text-size-adjust: none;text-align: ${values.textAlign};color: ${values.buttonColors.color}; background-color: ${values.buttonColors.backgroundColor}; border-radius: ${values.borderRadius || '0px'}; -webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                            <span style="display:block;padding:12px 22px;line-height:120%;">${values.text}</span>
                                        `;

    return html;
};

export const getHtmlCol = (columns, col, minWidth) => {
    const font = '\'Montserrat\',sans-serif';
    let html = `<div class="u-col u-col-${col}" style="max-width: 320px;min-width: ${minWidth}px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                    <div style="padding: ${columns.values.padding || '0px'};border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    `;

    columns.contents.forEach((contents => {
        const id = (contents.values._meta.htmlClassNames.search('image') !== -1) ? ` id ="${contents.values._meta.htmlID}"` : '';

        html += `<table${id} style="font-family:${(contents.type === 'menu') ? contents.values.fontFamily.value : font};" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                        <tr>
                            <td style="overflow-wrap:break-word;word-break:break-word;padding: ${contents.values.containerPadding || ''};font-family:${(contents.type === 'menu') ? contents.values.fontFamily.value : font};" align="left">
                            `;
        switch (contents.type) {
            case 'divider': {
                html += getHmtlDivider(contents.values);
                break;
            }
            case 'image': {
                html += getHtmlImg(contents.values);
                break;
            }
            case 'menu': {
                html += getHtmlMenu(contents.values);
                break;
            }
            case 'text': {
                html += getHtmlText(contents.values);
                break;
            }
            case 'button': { 
                html += getHtmlButton(contents.values);
                break;
            }
        }
                
        {html += `</td>
                    </tr>
                </tbody>
            </table>
            `;}
    }));

    html += `</div>
            </div>
        </div>
            `;
    return html;
};

export const getHtmlRow = (row) => {
    let html = `<div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: ${(row.values.columnsBackgroundColor ? row.values.columnsBackgroundColor : 'transparent')};">
                <div style="border-collapse: collapse;display: table;width: 100%; ${(getObjectPropSafely(() => row.values.backgroundImage.url) ? `background-image: url('${row.values.backgroundImage.url}');background-repeat: ${row.values.backgroundImage.repeat ? 'yes' : 'no'};background-position: center top;` : '')} background-color: transparent;">
                `;
    let sum = 0;

    row.cells.forEach((cell => {
        sum += cell;
    }));
    row.columns.forEach((columns, index) => {
        let col = ((row.cells[index] / sum) * 100);

        if (col !== Math.trunc(col)) {
            col = col.toFixed(2).replace('.','p');
        }
        const minWidth = 600 / sum * row.cells[index];

        html += getHtmlCol(columns, col, minWidth);
        
    });
    html += `</div>
        </div>
    </div>
    `;
    return html;
};

export const exportHtml = (store) => {
    const data = hierarchyDesignData(store).body;

    let html = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
    <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
        <title></title>       
    
        <style type="text/css">
            a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 58% !important; } #u_content_text_8 .v-text-align { text-align: center !important; } #u_content_text_9 .v-text-align { text-align: center !important; } #u_content_button_4 .v-text-align { text-align: center !important; } }
    @media only screen and (min-width: 620px) {
        .u-row {
        width: 600px !important;
        }
        .u-row .u-col {
        vertical-align: top;
        }
    
        .u-row .u-col-33p33 {
        width: 199.98px !important;
        }
    
        .u-row .u-col-50 {
        width: 300px !important;
        }
    
        .u-row .u-col-100 {
        width: 600px !important;
        }
    
    }
    
    @media (max-width: 620px) {
        .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
        }
        .u-row .u-col {
        min-width: 320px !important;
        max-width: 100% !important;
        display: block !important;
        }
        .u-row {
        width: calc(100% - 40px) !important;
        }
        .u-col {
        width: 100% !important;
        }
        .u-col > div {
        margin: 0 auto;
        }
    }
    body {
        margin: 0;
        padding: 0;
    }
    
    table,
    tr,
    td {
        vertical-align: top;
        border-collapse: collapse;
    }
    
    p {
        margin: 0;
    }
    
    .ie-container table,
    .mso-container table {
        table-layout: fixed;
    }
    
    * {
        line-height: inherit;
    }
    
    a[x-apple-data-detectors='true'] {
        color: inherit !important;
        text-decoration: none !important;
    }
    
    </style>      

    <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
    
    </head>

    <body class="clean-body" style="margin: ${data.values.margin || 0}; padding: ${data.values.padding || 0}; -webkit-text-size-adjust: 100%; background-color: ${data.values.backgroundColor || ''}">
        <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: ${data.values.margin || 0} auto;background-color: ${data.values.backgroundColor || ''}; width:100%" cellpadding="0" cellspacing="0">
            <tbody>
            <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                `;

    data.rows.forEach((row => {
        html += getHtmlRow(row);
    }));
    html += `     </td>
            </tr>
        </tbody>
    </table>
    </body>`;
    return html;
};