import {forEach} from 'lodash';
import {getObjectPropSafely} from 'Utils/index.ts';

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

            const [a, b, c, d] = padding || [];

            result.top = a;
            result.right = b || a;
            result.bottom = c || a;
            result.left = d || b || a;
    }
    return result;
};

export const defaultBorder = {
    borderBottomColor: '#CCCCCC',
    borderBottomStyle: 'solid',
    borderBottomWidth: '0px',
    borderLeftColor: '#CCCCCC',
    borderLeftStyle: 'solid',
    borderLeftWidth: '0px',
    borderRightColor: '#CCCCCC',
    borderRightStyle: 'solid',
    borderRightWidth: '0px',
    borderTopColor: '#CCCCCC',
    borderTopStyle: 'solid',
    borderTopWidth: '0px'
};

export const getActionType = (actionName) => {
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
    let pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // fragment locator

    return !!pattern.test(str);
};

export const getTypeOfImage = (imageLink, options) => {
    if (validURL(imageLink)) {
        return 'imageUrl';
    }
    return 'uploadImage';
};

const getCellWidth = (cells, index) => {
    const sum = cells.reduce((total, value) => total + value, 0);

    return (cells[index] / sum);
};

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

const getBorderStyle = (border) => {
    if (Object.values(border).length <= 0) {return 'border-top: 0px solid transparent; border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;'}
    const loop = ['top', 'right', 'bottom', 'left'];
    let result = '';

    loop.forEach( value => {
        const borderDirection = `border${capitalize(value)}`;

        result += `border-${value}: ${eval(`border.${borderDirection}Color`)} ${eval(`border.${borderDirection}Style`)} ${eval(`border.${borderDirection}Width`)}; `;
    } );
    return result;
};

export const exportHTML = (nestedData) => {
    if (!nestedData) {
        return;
    }
    
    const bodyValues = getObjectPropSafely(()=>nestedData.body.values);
    const contentWidth = getObjectPropSafely(()=>bodyValues.contentWidth);
    const contentWidthNumber = Number(contentWidth.replace('px',''));
    // const contentAlign = getObjectPropSafely(()=>bodyValues.contentAlign);
    const preheaderText = getObjectPropSafely(()=>bodyValues.preheaderText);
    const fontFamily = getObjectPropSafely(()=>bodyValues.fontFamily);
    
    // function
    const getHrefButton = (href) => {
        switch (getObjectPropSafely(()=>href.name)) {
            case 'web':
                return getObjectPropSafely(()=>href.values.href);
            case 'email': {
                const bodyEmail = getObjectPropSafely(()=>href.values.body);
                const email = getObjectPropSafely(()=>href.values.email);
                const subject = getObjectPropSafely(()=>href.values.subject);

                // return eval(getObjectPropSafely(()=>href.attrs.href));
                return `mailto:${email}?subject=${subject}&body=${bodyEmail}`;
            }
            case 'sms':
            case 'phone': {
                const phoneNumber = getObjectPropSafely(()=>href.values.phone);

                // return eval(getObjectPropSafely(()=>href.attrs.href));
                return `${href.name}:${phoneNumber}`;
            }
            default:
                return '';
        }
    };

    const getRightLeftPadding = (padding) => {
        const paddingArr = padding.replace(/[^.0-9\s]/g,'').split(' ');
        const [a,b,c,d] = paddingArr || [];
        const right = b || a;
        const left = c || b || a;
        const result = [right,left];

        return result;
    };
    const generateBGImage = (bg) => {
        if (!bg) {return ''}
        const bgImageURL = getObjectPropSafely(()=>bg.url);

        if (!bgImageURL) {return ''}
        const bgImageRepeat = getObjectPropSafely(()=>bg.repeat);
        const bgImageCenter = getObjectPropSafely(()=>bg.center);

        return `
                    background-image: url(${bgImageURL});
                    background-repeat: ${bgImageRepeat ? 'repeat' : 'no-repeat'};
                    background-position: ${bgImageCenter ? 'center top' : 'left top'};
                `;
    };
    
    const switchCaseRenderHTMLContent = (content,columnWidth) => {
        const type = getObjectPropSafely(()=>content.type);
        const textAlign = getObjectPropSafely(()=>content.values.textAlign);

        switch (type) {
            case 'text': {
                const text = getObjectPropSafely(()=>content.values.text);
                const textLineHeight = getObjectPropSafely(()=>content.values.lineHeight);
                const textColor = getObjectPropSafely(()=>content.values.color);

                return `
                    <div
                        class="v-text-align"
                        style="
                        color: ${textColor || '#ffffff'};
                        line-height: ${textLineHeight ?? '100%'};
                        text-align: ${textAlign || 'center'};
                        word-wrap: break-word;
                        "
                    >
                        ${text ?? ''}
                    </div>
                `;
            }
            case 'button': {
                const btnBorderRadius = getObjectPropSafely(()=>content.values.borderRadius);
                const btnLineHeight = getObjectPropSafely(()=>content.values.lineHeight);
                const btnBGColor = getObjectPropSafely(()=>content.values.buttonColors.backgroundColor);
                const btnColor = getObjectPropSafely(()=>content.values.buttonColors.color);
                const btnHref = getObjectPropSafely(()=>content.values.href);
                const btnTarget = getObjectPropSafely(()=>content.values.href.values.target);
                const btnText = getObjectPropSafely(()=>content.values.text);
                const btnTextAlign = getObjectPropSafely(()=>content.values.textAlign);
                const btnAutoWidth = getObjectPropSafely(()=>content.values.size.autoWidth);
                const btnWidth = getObjectPropSafely(()=>content.values.size.width);
                const btnBorder = getObjectPropSafely(()=>content.values.border);
                const btnCalculatedWidth = getObjectPropSafely(()=>content.values.calculatedWidth);
                const btnCalculatedHeight = getObjectPropSafely(()=>content.values.calculatedHeight);
                const btnPadding = getObjectPropSafely(()=>content.values.padding);

                return `
                    <div class="v-text-align" align=${btnTextAlign || 'center'}>
                        <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:${fontFamily?.value || '"Montserrat", sans-serif'};"><tr><td class="v-text-align" style="font-family:${fontFamily?.value || '"Montserrat", sans-serif'};" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:${btnCalculatedHeight ?? '40px'}; v-text-anchor:middle; width:${btnCalculatedWidth ?? '134px'};" arcsize="0%" stroke="f" fillcolor=${btnBGColor || '#ffffff'}><w:anchorlock/><center style="color:${btnColor || '#000000'};font-family:${fontFamily?.value || '"Montserrat", sans-serif'};"><![endif]-->
                        <a
                        href=${getHrefButton(btnHref) || '""'}
                        target=${btnTarget ?? '_blank'}
                        style="
                            box-sizing: border-box;
                            display: inline-block;
                            font-family: ${fontFamily?.value || '"Montserrat", sans-serif'};
                            text-decoration: none;
                            -webkit-text-size-adjust: none;
                            text-align: center;
                            color: ${btnColor || '#000000'};
                            background-color: ${btnBGColor || '#ffffff'};
                            border-radius: ${btnBorderRadius || '0px'} ;
                            -webkit-border-radius: ${btnBorderRadius || '0px'};
                            -moz-border-radius:${btnBorderRadius || '0px'};
                            width: ${btnAutoWidth ? 'auto' : (btnWidth ?? '100%')};
                            max-width: 100%;
                            overflow-wrap: break-word;
                            word-break: break-word;
                            word-wrap: break-word;
                            mso-border-alt: none;
                            ${getBorderStyle(btnBorder)}
                        "
                        >
                        <span
                            style="
                            display: block;
                            padding: ${btnPadding || 0};
                            line-height: ${btnLineHeight || '120%'};
                            "
                            >
                            ${btnText || ''}
                            </span
                        >
                        </a>
                        <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                    </div>
                `;
            }
            case 'divider': {
                const borderTopDivider = getObjectPropSafely(()=>content.values.border);

                return `
                    <table
                        height="0px"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="
                        border-collapse: collapse;
                        table-layout: fixed;
                        border-spacing: 0;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        vertical-align: top;
                        border-top: ${Object.values(borderTopDivider).length > 0 ? borderTopDivider.borderTopWidth + borderTopDivider.borderTopStyle + borderTopDivider.borderTopColor : '0px solid #bbbbbb'};
                        -ms-text-size-adjust: 100%;
                        -webkit-text-size-adjust: 100%;
                        "
                    >
                        <tbody>
                        <tr style="vertical-align: top">
                            <td
                            style="
                                word-break: break-word;
                                border-collapse: collapse !important;
                                vertical-align: top;
                                font-size: 0px;
                                line-height: 0px;
                                mso-line-height-rule: exactly;
                                -ms-text-size-adjust: 100%;
                                -webkit-text-size-adjust: 100%;
                            "
                            >
                            <span>&#160;</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                `;
            }
            case 'menu': {
                const menuItem = getObjectPropSafely(()=>content.values.menu.items);
                const menuFontFamily = getObjectPropSafely(()=>content.values.fontFamily);
                const menuAlign = getObjectPropSafely(()=>content.values.align);
                const menuFontSize = getObjectPropSafely(()=>content.values.fontSize);
                const menuLinkColor = getObjectPropSafely(()=>content.values.linkColor);
                const menuPadding = getObjectPropSafely(()=>content.values.padding);
                const menuTextColor = getObjectPropSafely(()=>content.values.textColor);
                const menuLayout = getObjectPropSafely(()=>content.values.layout);
                const separator = getObjectPropSafely(()=>content.values.separator);

                return `
                    <div class="menu" style="text-align: ${menuAlign || 'center'}">
                        <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align=${menuAlign || 'center'}><tr><![endif]-->

                        ${Array.isArray(menuItem) && menuItem.length > 0 && ((menuItem.map((item, index) => {
        const itemName = getObjectPropSafely(()=>item.link.name);
        const itemText = getObjectPropSafely(()=>item.text);
        const webLink = getObjectPropSafely(()=>item.link.values.href);
        const itemTarget = getObjectPropSafely(()=>item.link.values.target) || '_blank';
        const isShowATag = (webLink && itemName === 'web') ? true : false; 
        const itemHref = getObjectPropSafely(()=>item.link);

        return (`
                                <!--[if (mso)|(IE)]><td style="padding:${menuPadding || '0px'}"><![endif]-->
                                ${isShowATag ? `<a href=${getHrefButton(itemHref)} target=${itemTarget}` : '<span'}
                                style="
                                    padding: ${menuPadding || '0px'} ;
                                    display: ${menuLayout === 'horizontal' ? 'inline' : (menuLayout === 'vertical' ? 'block' : 'inline')};
                                    color: ${isShowATag ? menuLinkColor : (menuTextColor || '#000000')};
                                    font-size: ${menuFontSize ?? '14px'} ;
                                    font-family: ${getObjectPropSafely(()=>menuFontFamily.value) || '\'Montserrat\', sans-serif'};
                                    ${isShowATag && 'text-decoration: none;'}
                                "
                                >
                                ${itemText || ''}
                                </span>
                                <!--[if (mso)|(IE)]></td><![endif]-->

                                ${(separator && index + 1 < menuItem.length) ? `
                                    <!--[if (mso)|(IE)]><td style="padding:${menuPadding || '0px'} "><![endif]-->
                                    <span style="padding:${menuPadding || '0px'} ;display:${menuLayout ? 'horizontal' : (menuLayout ? 'vertical' : 'block')};color:${menuTextColor || '#000000'};font-family:${getObjectPropSafely(()=>menuFontFamily.value) || '\'Montserrat\', sans-serif'};font-size: ${menuFontSize ?? '14px'} ;" class="hide-mobile">
                                    ${separator}
                                    </span>
                                    <!--[if (mso)|(IE)]></td><![endif]-->
                                ` : ''}
                            `);}))).join('')}

                        <!--[if (mso)|(IE)]></tr></table><![endif]-->
                    </div>
                `;
            }
            case 'html': {
                const html = getObjectPropSafely(()=>content.values.html);

                return `
                    <table style="font-family:${fontFamily?.value || '"Montserrat", sans-serif'};" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                            <tr>
                                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:${fontFamily?.value || '"Montserrat", sans-serif'};" align="left">
                                    
                                    <div>
                                        ${html ?? ''}
                                    </div>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                `;
            }
            case 'social': {
                const socialIcons = getObjectPropSafely(()=>content.values.icons.icons);
                const socialAlign = getObjectPropSafely(()=>content.values.align);
                const socialIconSpace = getObjectPropSafely(()=>content.values.spacing);
                const iconType = getObjectPropSafely(()=>content.values.icons.iconType);
                
                return `
                    <div align=${socialAlign || 'center'}>
                        <div style="display: table; max-width: '${105 + socialAlign * (socialIcons.length - 1)}px'">
                        <!--[if (mso)|(IE)]><table width='${105 + socialAlign * (socialIcons.length - 1)}px' cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:125px;"><tr><![endif]-->

                        ${socialIcons.length > 0 && (socialIcons.map((icon, index) => {
        const iconName = getObjectPropSafely(()=>icon.name);

        return `
                                <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: ${index < (socialIcons.length - 1) ? `${socialIconSpace}px` : '0px'};" valign="top"><![endif]-->
                                <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right:${index < (socialIcons.length - 1) ? `${socialIconSpace}px` : '0px'}">
                                    <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                        <a href="https://facebook.com/" title="Facebook" target="_blank">
                                        <img src="https://cdn.tools.unlayer.com/social/icons/${iconType || 'circle-white'}/${iconName ? iconName.toLowerCase() : 'facebook'}.png" alt=${iconName} title=${iconName} width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                        </a>
                                    </td></tr>
                                </tbody></table>
                                <!--[if (mso)|(IE)]></td><![endif]-->
                            `;
    })).join('')}



                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                    </div>
                `;
            }
            case 'image': {
                const imageTextAlign = getObjectPropSafely(()=>content.values.textAlign);
                const imageAlterText = getObjectPropSafely(()=>content.values.altText);
                const imageTarget = getObjectPropSafely(()=>content.values.action.values.target);
                const imageAction = getObjectPropSafely(()=>content.values.action);
                const imageActionLink = getObjectPropSafely(()=>content.values.action.values.href);
                const imageAutoWidth = getObjectPropSafely(()=>content.values.src.autoWidth);
                // const imageHeight = getObjectPropSafely(()=>content.values.src.height);
                const imageMaxWidth = ( imageAutoWidth === false ? getObjectPropSafely(()=>content.values.src.maxWidth)  : '100%');
                const imageURL = getObjectPropSafely(()=>content.values.src.url);
                const percentWidth = imageMaxWidth && Number(imageMaxWidth.replace('%','')) / 100;
                const imageContainerPadding = getObjectPropSafely(()=>content.values.containerPadding);
                const rightLeftPadding = getRightLeftPadding(imageContainerPadding);
                const [rightPadding , leftPadding] = rightLeftPadding || [0, 0]; 
                
                return `
                    <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                    >
                        <tr>
                        <td
                            class="v-text-align"
                            style="
                            padding-right: 0px;
                            padding-left: 0px;
                            "
                            align=${imageTextAlign || 'center'}
                        >
                            ${imageActionLink ? `<a href=${getHrefButton(imageAction)} target=${imageTarget || '_blank'}>` : ''}
                            <img
                            align=${imageTextAlign || 'center'}
                            border="0"
                            src=${imageURL ?? ''}
                            alt=${imageAlterText}
                            title=${imageAlterText}
                            style="
                                outline: none;
                                text-decoration: none;
                                -ms-interpolation-mode: bicubic;
                                clear: both;
                                display: inline-block !important;
                                border: none;
                                height: auto;
                                float: none;
                                width: ${imageAutoWidth ? '100%' : imageMaxWidth };
                                max-width: ${(columnWidth * percentWidth) - Number(rightPadding) - Number(leftPadding) } ;
                            "
                            width="138.6"
                            class="v-src-width v-src-max-width"
                            />
                            ${imageActionLink ? '</a>' : ''}
                        </td>
                        </tr>
                    </table>
                `;
            }
            default:
                break;
        }
    };

    const generateRows = (rows) => {
        //
        if (!rows || rows.length === 0) {return }

        const rowHTML = rows.map(row => {
            const rowBGColor = getObjectPropSafely(()=>row.values.backgroundColor);
            const rowBGImage = getObjectPropSafely(()=> row.values.backgroundImage);
            const rowContentBGColor = getObjectPropSafely(()=>row.values.columnsBackgroundColor);
            const rowPadding = getObjectPropSafely(()=>row.values.padding);
            const hideOnDesktop = getObjectPropSafely(()=>row.values.hideDesktop);
            const rowCells = getObjectPropSafely(()=>row.cells);
            
            // xu ly column
            const columns = (getObjectPropSafely(()=>row.columns)).map((column, index)=> {
                //
                const cellPercent = getCellWidth(rowCells,index);
                const widthClassName = cellPercent.toFixed(2).replace('.', 'p');
                const columnPadding = getObjectPropSafely(()=>column.values.padding);
                const border = getObjectPropSafely(()=>column.values.border);
                const columnBGColor = getObjectPropSafely(()=>column.values.backgroundColor);
                const columnWidth = contentWidthNumber * cellPercent;

                const contents = (getObjectPropSafely(()=>column.contents).map(content => {
                    const containerPadding = getObjectPropSafely(()=> content.values.containerPadding);
                    const imageID = getObjectPropSafely(()=>content.values._meta.htmlID);
                    const dividerWidth = getObjectPropSafely(()=>content.values.width);
                    const hideDesktop = getObjectPropSafely(()=>content.values.hideDesktop);
                    const hideMobile = getObjectPropSafely(()=>content.values.hideMobile);

                    return `
                    ${hideDesktop ? '<!--[if !mso]><!-->' : ''}
                        <table
                            ${imageID && imageID.indexOf('image') > 0 && `id:${imageID}`}
                            ${hideDesktop ? (hideMobile ? 'class: "hide-desktop hide-mobile"' : 'class :"hide-desktop"') : ''}
                            style="${hideDesktop ? 'display:none; mso-hide: all;' : ''} font-family: ${fontFamily?.value || '"Montserrat", sans-serif'}"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width=${dividerWidth || '100%'}
                            border="0"
                        >
                            <tbody>
                                <tr>
                                    <td
                                        style="
                                        overflow-wrap: break-word;
                                        word-break: break-word;
                                        padding: ${containerPadding || '0px'};
                                        font-family: ${fontFamily?.value || '"Montserrat", sans-serif'};
                                        "
                                        align="left"
                                    >
                                    ${switchCaseRenderHTMLContent(content, columnWidth)}

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ${hideDesktop ? '<!--<![endif]-->' : ''}
                    `;
                }));

                return `
                    <!--[if (mso)|(IE)]><td align="center" width="${columnWidth}" style=" ${columnBGColor ? `background-color: ${columnBGColor}` : ''} width: ${columnWidth}px;padding: ${columnPadding || '0px'}; ${getBorderStyle(border)}" valign="top"><![endif]-->
                        <div
                            class="u-col u-col-${widthClassName}"
                            style="
                            ${columnBGColor ? `background-color: ${columnBGColor}` : ''}
                            max-width: 320px;
                            min-width: ${columnWidth}px;
                            display: table-cell;
                            vertical-align: top;
                            "
                        >
                            <div style="width: 100% !important">
                                <!--[if (!mso)&(!IE)]><!-->
                                <div
                                    style="
                                    padding: 0px;
                                    border-top: 0px solid transparent;
                                    border-left: 0px solid transparent;
                                    border-right: 0px solid transparent;
                                    border-bottom: 0px solid transparent;
                                    "
                                ><!--<![endif]-->
                                    ${contents.join('')}
                                <!--[if (!mso)&(!IE)]><!-->
                                </div>
                                <!--<![endif]-->
                            </div>
                        </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                `;
            });

            //
            return `
            ${hideOnDesktop ? '<!--[if !mso]><!-->' : ''}
                <div
                class="u-row-container ${hideOnDesktop ? 'hide-desktop' : ''}"
                style="padding: ${rowPadding || '0px' }; background-color: ${rowBGColor || 'transparent'} 
                    ${hideOnDesktop ? 'display:none;mso-hide: all;' : ''}
                    "
                >
                    <div
                        class="u-row"
                        style="
                            margin: 0 auto;
                            min-width: 320px;
                            max-width: ${contentWidth};
                            overflow-wrap: break-word;
                            word-wrap: break-word;
                            word-break: break-word;
                            background-color: ${rowContentBGColor || 'transparent'};
                        "
                    >
                        <div
                            style="
                                border-collapse: collapse;
                                display: table;
                                width: 100%;
                                background-color: transparent;
                                ${generateBGImage(rowBGImage)}
                            "
                        >
                            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:${rowPadding || '0px'};background-color:${rowBGColor || 'transparent'};" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: ${contentWidth};"><tr style="background-color: ${rowContentBGColor || 'transparent'};"><![endif]-->
                            ${columns.join('')}
                            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                        </div>
                    </div>
                </div>
            ${hideOnDesktop ? '<!--<![endif]-->' : ''}
            `;
        });

        return rowHTML.join('');
    };

    const body = `
            <body
            class="clean-body"
            style="
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            background-color: ${getObjectPropSafely(()=>bodyValues.backgroundColor) || '#e8d4bb'};
        "
        >
            <!--[if IE]><div class="ie-container"><![endif]-->
            <!--[if mso]><div class="mso-container"><![endif]-->
            <table
            style="
                border-collapse: collapse;
                table-layout: fixed;
                border-spacing: 0;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                vertical-align: top;
                min-width: 320px;
                margin: 0 auto;
                background-color: #e8d4bb;
                width: 100%;
            "
            cellpadding="0"
            cellspacing="0"
            >
                <tbody>
                ${preheaderText ? `
                    <tr style="vertical-align: top"> 
                        <td style="display:none !important;visibility:hidden;mso-hide:all;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
                        ${preheaderText}
                        </td>
                    </tr>
                ` : ''}

                ${generateRows(getObjectPropSafely(()=>nestedData.body.rows,[]))}
                </tbody>
            </table>
            <!--[if mso]></div><![endif]-->
            <!--[if IE]></div><![endif]-->
        </body>
    `;
    const hmtl = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html
            xmlns="http://www.w3.org/1999/xhtml"
            xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office"
            >
            <head>
                <!--[if gte mso 9]>
                <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG />
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                </xml>
                <![endif]-->
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="x-apple-disable-message-reformatting" />
                <!--[if !mso]><!-->
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <!--<![endif]-->
                <title></title>

                <style type="text/css">
                a {
                    color: ${getObjectPropSafely(()=>bodyValues.linkStyle.linkColor) || '#0000ee'};
                    text-decoration: ${getObjectPropSafely(()=>bodyValues.linkStyle.linkUnderLine) ? 'underline' : 'none'};
                }
                @media (max-width: 480px) {
                    #u_content_image_1 .v-src-width {
                    width: auto !important;
                    }
                    #u_content_image_1 .v-src-max-width {
                    max-width: 58% !important;
                    }
                    #u_content_text_8 .v-text-align {
                    text-align: center !important;
                    }
                    #u_content_text_9 .v-text-align {
                    text-align: center !important;
                    }
                    #u_content_button_4 .v-text-align {
                    text-align: center !important;
                    }
                }
                @media only screen and (min-width:  ${(contentWidthNumber + 20) || 620 }px) {
                    .u-row {
                    width: ${contentWidth || '600px'} !important;
                    }
                    .u-row .u-col {
                    vertical-align: top;
                    }
                    .u-row .u-col-16p67 {
                        width: ${ (contentWidthNumber / 6)}px !important;
                    }
                    .u-row .u-col-66p67 {
                        width: ${ (contentWidthNumber * 4 / 6)}px !important;
                    }
                    .u-row .u-col-25{
                        width: ${(contentWidthNumber / 4)}px !important;
                    }
                    .u-row .u-col-33p33 {
                    width: ${ (contentWidthNumber / 3)}px !important;
                    }
                    .u-row .u-col-50 {
                    width: ${(contentWidthNumber / 2)}px !important;
                    }
                    .u-row .u-col-100 {
                    width: ${(contentWidthNumber)}px !important;
                    }
                }

                @media (max-width: ${contentWidthNumber + 20}px) {
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

                a[x-apple-data-detectors="true"] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
                @media (max-width: 480px) {
                    .hide-desktop {
                        display: block !important;
                    }
                    table.hide-desktop {
                        display: table !important;
                    }
                    .hide-mobile {
                        display: none !important;
                        max-height: 0px;
                        overflow: hidden;
                    }
                }
                </style>

                <!--[if !mso]><!-->
                ${Object.values(fontFamily).length > 0 ? `
                    <link
                    href=${Object.values(fontFamily).length > 0 ? fontFamily.url : 'https://fonts.googleapis.com/css?family=Montserrat:400,700'}
                    rel="stylesheet"
                    type="text/css"
                    />` : ''}
                <link
                href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
                rel="stylesheet"
                type="text/css"
                />
                <link
                href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700"
                rel="stylesheet"
                type="text/css"
                />
                <!--<![endif]-->
            </head>
            ${body}
            </html>
            `;
    
    return hmtl;
};
