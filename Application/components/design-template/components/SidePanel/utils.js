import {forEach} from 'lodash';

export const getPaddingChild = (padding) => {
    const result = {};

    switch (padding.length) {
        case 1:
            result.top = result.bottom = result.left = result.right = padding[0];
            break;
        case 2:
            result.top = result.bottom = padding[0];
            result.left = result.right = padding[1];
            break;
        case 3:
            result.top = padding[0];
            result.left = result.right = padding[1];
            result.bottom = padding[2];
            break;
        default:
            // 4
            result.top = padding[0];
            result.right = padding[1];
            result.bottom = padding[2];
            result.left = padding[3];

            const [a,b,c,d] = padding || [];

            result.top = a;
            result.right = b || a;
            result.bottom = c || a;
            result.left = d || b || a;
    }
    return result;
};

export const defaultBorder = {
    'borderBottomColor': '#CCCCCC',
    'borderBottomStyle': 'solid',
    'borderBottomWidth': '0px',
    'borderLeftColor': '#CCCCCC',
    'borderLeftStyle': 'solid',
    'borderLeftWidth': '0px',
    'borderRightColor': '#CCCCCC',
    'borderRightStyle': 'solid',
    'borderRightWidth': '0px',
    'borderTopColor': '#CCCCCC',
    'borderTopStyle': 'solid',
    'borderTopWidth': '0px'
};

export const getActionType = (actionName) =>{
    switch (actionName) {
        case 'web':
            return 1;
        
        default: 
            return 1;
    }
};
export const getTarget = (target) => {
    switch (target) {
        case '_blank':
            return 1;
        case '_self':
            return 2;
        default:
            return 1;
    }
};
const validURL = (str) => {
    let pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    return !!pattern.test(str);
};

export const getTypeOfImage = (imageLink, options) => {
    if (validURL(imageLink)) {return 'imageUrl'}
    return 'uploadImage';
};