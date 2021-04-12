import moment from 'moment';
import configs from './constant';
import localforage from 'localforage';

export const isNil = value => typeof value === 'object' && value !== null;

export const getOffset = ( el ) => {
    let _x = 0;
    let _y = 0;

    while ( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return {top: _y, left: _x};
};

/***
 * Get a property of object safely
 * @param fn: function that gets object property
 * @param defaultValue: default value if something wrong
 * @example
 *  getSafe(() => a.b.c.d, 'someValue') => d
 *  getSafe(() => a.b[undefined].c.d, 'someValue') => 'someValue'
 * @returns {string|*}
 */
export const getObjectPropSafely = (fn, defaultValue:any = '') => {
    try {
        return fn();
    } catch (e) {
        return defaultValue;
    }
};

export const calculateOpacityColor = (hex, opacity) => {
    try {
    // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        opacity = opacity || 0;

        // convert to decimal and change luminosity
        let rgb = '#', c, i;

        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i * 2,2), 16);
            c = Math.round(Math.min(Math.max(0, 255 * (1 - opacity) + (c * opacity)), 255)).toString(16);
            rgb += ('00' + c).substr(c.length);
        }

        return rgb;
    } catch (e) {
        // Error
    }
};

export const formatDateTime = (value, pattern, locale = 'en') => {
    const formatDefault = ['YYYYMMDD hh:mm:ss', 'YYYYMMDDhhmmss', 'YYYYMMDD'];
    let formattedValue = value;

    try {
        if (typeof pattern !== 'undefined') {
            switch (pattern) {
                case 'YEAR': {
                    formattedValue = moment(value, ['YYYY',...formatDefault], 'en').locale(locale).format('YYYY');
                    break;
                }
                case 'YEAR_QUARTER': {
                    formattedValue = moment(value, ['YYYYQ',...formatDefault], 'en').locale(locale).format('[Q]Q, YYYY');
                    break;
                }
                case 'YEAR_MONTH': {
                    formattedValue = moment(value, ['YYYYMM',...formatDefault], 'en').locale(locale).format('MMM YYYY');
                    break;
                }
                case 'YEAR_WEEK': {
                    const fromDate = moment(value, ['YYYYWW', 'YYYYMM', ...formatDefault], 'en').startOf('isoWeek').locale(locale).format('MMM DD, YYYY');
                    const toDate = moment(value, ['YYYYWW', 'YYYYMM',...formatDefault], 'en').endOf('isoWeek').locale(locale).format('MMM DD, YYYY');
                    const week = moment(value, ['YYYYWW', 'YYYYMM',...formatDefault], 'en').locale(locale).format('[Week] WW');

                    formattedValue = `${fromDate} to ${toDate} (${week})`;
                    break;
                }
                case 'DATE':
                case 'YEAR_MONTH_DAY': {
                    formattedValue = moment(value, [...formatDefault], 'en').locale(locale).format('MMM DD, YYYY');
                    break;
                }
                case 'YEAR_MONTH_DAY_HOUR': {
                    formattedValue = moment(value, ['YYYYMMDDHH',...formatDefault], 'en').locale(locale).format('MMM, DD, YYYY, hh A');
                    break;
                }
                case 'YEAR_MONTH_DAY_SECOND': {
                    formattedValue = moment(value, ['YYYYMMDDHHmm',...formatDefault], 'en').locale(locale).format('MMM, DD, YYYY, hh:mm A');
                    break;
                }
                case 'QUARTER': {
                    formattedValue = moment(value, ['Q',...formatDefault], 'en').locale(locale).format('[Q]Q');
                    break;
                }
                case 'MONTH': {
                    formattedValue = moment(value, ['MM',...formatDefault], 'en').locale(locale).format('MMM');
                    break;
                }
                case 'WEEK': {
                    formattedValue = moment(value, ['WW', 'ww', ...formatDefault], 'en').locale(locale).format('[Week] WW');
                    break;
                }
                case 'DAY_OF_WEEK': {
                    formattedValue = moment(value, ['d',...formatDefault], 'en').locale(locale).format('dddd');
                    break;
                }
                case 'MONTH_DAY': {
                    formattedValue = moment(value, ['MMDD',...formatDefault], 'en').locale(locale).format('MMM DD');
                    break;
                }
                case 'DAY_OF_MONTH':
                case 'DAY': {
                    formattedValue = moment(value, ['DD',...formatDefault], 'en').locale(locale).format('DD');
                    break;
                }
                case 'HOUR': {
                    formattedValue = moment(value, ['HH',...formatDefault], 'en').locale(locale).format('hh A');
                    break;
                }
                case 'MINUTE': {
                    formattedValue = moment(value, ['mm',...formatDefault], 'en').locale(locale).format('mm');
                    break;
                }
                default:
                    formattedValue = value;
                    break;
            }
        }
    } catch (e) {
        return value;
    }

    if (formattedValue === 'Invalid date') {
        return value;
    }

    return formattedValue;
};

export const hexToRgb = (hex) => {
    try {
        if (hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

            if (hex.length > 7) {
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16),
                    a: parseInt(result[4], 16)
                } : null;
            } else {
                return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
            }
        }

        return  {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        };
    } catch (e) {
        // Error
    }
};

export const setLocalStorage = (key, value) => {
    try {
        if (typeof key === 'string' && typeof value === 'string') {
            localforage.setItem(`${configs.LOCAL_STORAGE_PREFIX}:${key}`, value);
        }
    } catch (error) {
        //
    }
};

export const deleteLocalStorage = (key) => {
    try {
        if (typeof key === 'string') {
            localforage.removeItem(`${configs.LOCAL_STORAGE_PREFIX}:${key}`);
        }
    } catch (error) {
        //
    }
};

export const random = (number) => {
    try {
        let text = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < number; i++) {text += possible.charAt(Math.floor(Math.random() * possible.length))}

        return text;
    } catch (error) {
        //
    }
};

// Cache result of original function when arguments not change
export const memoization = (func) => {
    try {
        const cache = {};

        const result = (args) => {
            const stringifiedArgs = JSON.stringify(args);

            cache[stringifiedArgs] = typeof cache[stringifiedArgs] !== 'undefined' ?
                cache[stringifiedArgs] : func(args);

            return cache[stringifiedArgs];
        };

        return result;
    } catch (error) {
        // Error
    }
};

/***
 * Round target number to the closest provided number
 * @example roundNumberBy(1)(0.4) -> 1
 * @example roundNumberBy(120)(140) -> 120
 * @param by
 * @returns {Function}
 */
export const roundNumberBy = (by = 10) => (value) => {
    try {
        if (value > 0 && value <= 1) {
            return 1;
        }

        return Math.round(Math.round(value / by) * by);
    } catch (error) {
        // Error
    }
};

export const getWidthOfText = (str, fontSize, fontFamily) => {
    try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
            context.font = `${fontSize} ${fontFamily}`;
            return context.measureText(str).width;
        }

    } catch (error) {
        // Error
    }
};

// export const getMaxLetter = ({str = '', strLength, fontSize, fontFamily, maxWidth}) => {
//     try {
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d');
//         let width = '';

//         const length = (str + '').length;

//         if (length) {
//             let newString = '';

//             if (length === strLength) {
//                 context.font = `${fontSize} ${fontFamily}`;
//                 width = context.measureText(str).width;
//                 newString = str;
//             } else if (length >= 0) {
//                 context.font = `${fontSize} ${fontFamily}`;

//                 width = context.measureText(`${str}...`).width;
//                 newString = `${str}...`;
//             } else {
//                 return '';
//             }

//             if (width < maxWidth) {
//                 return newString;
//             } else {
//                 return getMaxLetter({str: str.toString().substring(0, length - 1), maxWidth, strLength, fontSize, fontFamily});
//             }
//         } else {
//             width = context.measureText('...').width;

//             if (width < maxWidth) {
//                 return '...';
//             } else {
//                 return '';
//             }
//         }
//     } catch (error) {
//         // Error
//     }
// };

// export function calculateAxisProps({min, max, maxValue, tickInterval, maxTickLabelCount, isPercent}) {
//     const ticks = [], labelStatuses = [];

//     try {
//         const isMaxAuto = typeof max !== 'number';
//         const defaultTickCount = 5;

//         // Calculated maxValue
//         if (isMaxAuto) {
//             maxValue = isPercent ? 100 : maxValue;
//         } else {
//             maxValue = isPercent ? 100 * max : max;
//         }

//         if (typeof maxValue === 'undefined' ||
//             (typeof maxValue === 'number' && isNaN(maxValue))) {
//             return {min, max, ticks, labelStatuses};
//         }

//         // Round min, max if float
//         min = roundNumberBy(1)(min);
//         maxValue = roundNumberBy(1)(maxValue);

//         if (maxValue < min) {
//             // Swap maxValue vs min
//             maxValue = min + maxValue;
//             min = maxValue - min;
//             maxValue = maxValue - min;
//         } else if (maxValue === min) {
//             // should increase max 10
//             maxValue = min + 10;
//         }

//         // Base ticks and labelStatuses
//         ticks.push(min);
//         labelStatuses.push(true);

//         // Handle calculate interval
//         const isIntervalAuto = tickInterval === '';

//         tickInterval = isIntervalAuto ? ((maxValue - min) / defaultTickCount) : tickInterval;

//         if (maxTickLabelCount >= 1 && tickInterval) {
//             let tickCount = Math.floor((maxValue - min) / tickInterval);

//             // Maximum 100 tick line
//             if (tickCount > configs.MAX_CHART_TICK_LINE) {
//                 tickCount = configs.MAX_CHART_TICK_LINE;
//                 tickInterval = Math.floor((maxValue - min) / tickCount);
//             }

//             let round = Math.round;

//             if (isIntervalAuto) {
//                 round = roundNumberBy(findBaseDivisorBy10(tickInterval));
//             }

//             tickInterval = round(tickInterval);
//             let labelInterval = tickInterval,
//                 labelCount = tickCount;

//             if (isMaxAuto && !isPercent) {
//                 // If auto, add 1 extra tick for easier view
//                 maxValue = round(maxValue);
//                 maxValue += tickInterval;
//             }

//             // Double interval until tick label count <= maximum viewable tick label count
//             // Maximum viewable tick label count is calculated in chart
//             while (labelCount > maxTickLabelCount) {
//                 labelInterval *= 2;
//                 labelCount = Math.ceil(labelCount / 2);
//             }

//             // Second tick will be rounded by multiple of 10 of interval
//             let value = round(min + tickInterval);
//             let labelValue = round(min + labelInterval);

//             while (value <= maxValue) {
//                 ticks.push(value);

//                 const isShowLabel = labelValue === value;

//                 if (isShowLabel) {
//                     labelValue = labelValue + labelInterval;
//                 }

//                 labelStatuses.push(isShowLabel);

//                 value += tickInterval;
//             }

//             if (isMaxAuto && ticks.length) {
//                 maxValue = Math.min(maxValue, ticks[ticks.length - 1]);
//             }
//         }

//         return {min, max: maxValue, ticks, labelStatuses};
//     } catch (e) {
//         //
//     }

//     return {min, max, ticks, labelStatuses};
// }

/***
 * Find the base when divide for 10
 * @example findBaseDivisorBy10(6) -> 6
 * @example findBaseDivisorBy10(14) -> 10
 * @example findBaseDivisorBy10(130) -> 100
 * @example findBaseDivisorBy10(2400) -> 1000
 * @param value
 * @returns {number|*}
 */
export const findBaseDivisorBy10 = (value) => {
    try {
        for (let coefficient = 0; coefficient < 9; coefficient++) {
            if ((value / (10 ** coefficient)) < 10) {
                if (coefficient === 0) {
                    // float is rounded by 1
                    if (value % Math.floor(value) !== 0) {
                        return roundNumberBy(1)(value);
                    }

                    return value;
                }

                return 10 ** coefficient;
            }
        }

        return 10;
    } catch (error) {
        // Error
    }
};

export const getSizeOfText = (str = 'A', fontSize = '12px', fontFamily = 'roboto') => {
    try {
        const node = document.createElement('div');
        const textNode = document.createTextNode(str);

        node.id = 'text-size';
        node.appendChild(textNode);
        document.body.appendChild(node);

        node.style.fontSize = fontSize;
        node.style.fontFamily = fontFamily;
        const height = (node.clientHeight + 1);
        const width = (node.clientWidth + 1);

        node.remove();
        return {height, width};
    } catch (error) {
        console.error(error);
    }
};

export const removeAccent = (str) => {
    try {
        str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
        str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
        str = str.replace(/[ìíịỉĩ]/g, 'i');
        str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
        str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
        str = str.replace(/[ỳýỵỷỹ]/g, 'y');
        str = str.replace(/đ/g, 'd');
        str = str.replace(/[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, 'A');
        str = str.replace(/[ÈÉẸẺẼÊỀẾỆỂỄ]/g, 'E');
        str = str.replace(/[ÌÍỊỈĨ]/g, 'I');
        str = str.replace(/[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, 'O');
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
        str = str.replace(/Đ/g, 'D');
        return str;
    } catch (error) {
        console.error(error);
    }
};

export const convertDataToSaveDesign = (data) => {
    let bodyValues = {};
    const rows:Record<string,any> = [];

    for (const key in data.design.bodies) {
        bodyValues = data.design.bodies[key].values;
    }

    for (const key in data.design.rows) {

        const columnKeys = data.design.rows[key].columns;

        const columns = columnKeys.map(columnKey => {
            
            for (const key in data.design.columns) {
                if (key === columnKey) {

                    const contentKeys = data.design.columns[key].contents;

                    const contents = contentKeys.map(contentKey => {

                        for (const key in data.design.contents) {
                            if (key === contentKey) {

                                return {
                                    type: data.design.contents[key].type,
                                    slug: undefined,
                                    values: data.design.contents[key].values
                                };
                            }
                        }
                    });

                    return {
                        contents: contents,
                        values: data.design.columns[key].values
                    };
                }
            }
        });

        rows.push({
            cells: data.design.rows[key].cells,
            values: data.design.rows[key].values,
            columns: columns
        });
    }

    const saveDesignData = {
        body: {
            rows: rows,
            values: bodyValues
        },
        counters: data.design.idCounters,
        schemaVersion: data.design.schemaVersion
    };

    return saveDesignData;
};
