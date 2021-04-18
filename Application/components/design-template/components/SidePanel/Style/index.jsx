// Libraries
import React, {useEffect, useState, useContext, memo} from 'react';
import classnames from 'classnames';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import isEqual from 'react-fast-compare';
import _ from 'lodash';

// Components
import {
    Checkbox,
    FontColor,
    SelectSingle,
    FillColor,
    Opacity,
    BorderRadius,
    SelectRadio,
    BorderColor,
    LineWeight,
    LineStyle,
    FontFamily,
    FontSize,
    TextInput,
    TextArea,
    Switch,
    Icon
} from '@antscorp/components';
import Alignment from 'Components/design-template/components/SidePanel/Style/components/Alignment';
import Upload from 'Components/design-template/components/SidePanel/Style/components/Upload';

// Context
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {actionType} from 'Components/design-template/components/ContextStore/constants';

// Assets
import {getObjectPropSafely} from 'Utils/index.ts';
import {typeComponent} from 'Components/design-template/constants';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import produce from 'immer';

// utils
import {
    getRowIDFromHtmlID,
    getLastUsingId,
    updateUsageCounters,
    getContentIDFromHtmlID
} from 'Components/design-template/components/Workspace/utils';
import {string} from 'prop-types';
import {getPaddingChild, defaultBorder} from '../utils';

// hooks

const PATH = 'Components/design-template/components/SidePanel/Style/index.jsx';

const Style = props => {
    const {
        style = [],
        values = {},
        translate = (lal) => lal
    } = props;
    const [config, setConfig] = useState({});
    const [activeColumn, setActiveColumn] = useState(0);

    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {
        activeElement,
        rows
    } = store;
    const rowId = getRowIDFromHtmlID(store, activeElement);
    const row = getObjectPropSafely(() => rows[rowId]);
    const cells = getObjectPropSafely(() => row.cells);
    const columns = getObjectPropSafely(() => store.columns);
    const usageCounters = getObjectPropSafely(() => store.usageCounters);

    const columnId = getObjectPropSafely(() => row.columns[activeColumn]);
    const column = getObjectPropSafely(() =>store.columns[columnId]);
    const columnValues = getObjectPropSafely(() =>store.columns[columnId].values);

    const contentId = activeElement.includes('content') ? getContentIDFromHtmlID(store, activeElement) : '';
    const content = contentId ? getObjectPropSafely(() => store.contents[contentId]) : {};
    const menuItems = activeElement.includes('menu') ? getObjectPropSafely(() => values.menu.items) : [];

    // properties
    const listPaddings = getObjectPropSafely(() => row.values.padding.split(' '));
    const columnPaddings = getObjectPropSafely(() => column.values.padding.split(' '));
    const columnBorder = getObjectPropSafely(() => column.values.border);
    const columnBorderWidth = getObjectPropSafely(() => column.values.border.borderWidth.split(' ')) || [];
    const columnBorderColor = getObjectPropSafely(() => column.values.border.borderColor.split(' '));
    const columnBorderStyle = getObjectPropSafely(() => column.values.border.borderStyle.split(' '));
    const menuPaddings = getObjectPropSafely(() => values.padding.split(' '));
    const containerPaddings = getObjectPropSafely(() => values.containerPadding.split(' '));

    useEffect(() => {
        try {
            if (style && style.length) {
                setConfig(style);
            }
        } catch (error) {
            //
        }
    }, [style]);

    const findValue = (name, options) => {
        try {
            if (options && options.length) {
                const obj = options.find(item => item.name === name);

                return obj || {};
            }
        } catch (error) {
            //
        }
    };

    const updateComponent = (idParent, idChild, receivedValues) => {
        if (activeElement.includes('row')) {
            let newRow = {};
            let newColumn = {};

            switch (idChild) {
                case 'backgroundColor': {
                    newRow = produce(row, draft => {
                        draft.values.backgroundColor = receivedValues;
                    });
                    break;
                }
                case 'columnsBackgroundColor': {
                    newRow = produce(row, draft => {
                        draft.values.columnsBackgroundColor = receivedValues;
                    });
                    break;
                }
                case 'moreOptionsPadding': {
                    const padding = getObjectPropSafely(() => row.values.padding);

                    newRow = produce(row, draft => {
                        draft.values.padding = receivedValues  ? `${padding} ${padding} ${padding} ${padding}` : padding.split(' ')[0];
                    });
                    break;
                }
                case 'padding': {
                    newRow = produce(row, draft => {
                        receivedValues === 'px' ? draft.values.padding = listPaddings[0] : draft.values.padding = receivedValues;
                    });
                    break;
                }
                case 'selectRadioImage': {
                    newRow = produce(row, draft => {
                        draft.values.backgroundImage = receivedValues === 'uploadImage' ?  {
                            ...values.backgroundImage,
                            url: '',
                            tempUrl: {
                                url: values.backgroundImage.url
                            }
                        } : {
                            ...values.backgroundImage,
                            url: values.backgroundImage.tempUrl.url,
                            tempUrl: ''
                        };
                    });
                    break;
                }
                case 'backgroundColorColumn': {
                    newColumn = produce(column, draft => {
                        draft.values.backgroundColor = receivedValues;
                    });
                    break;
                }
                case 'moreOptionsColumnPadding': {
                    const padding = getObjectPropSafely(() => column.values.padding);

                    newColumn = produce(column, draft => {
                        draft.values.padding = receivedValues  ? `${padding} ${padding} ${padding} ${padding}` : padding.split(' ')[0];
                    });
                    break;
                }
                case 'paddingColumn': {
                    newColumn = produce(column, draft => {
                        receivedValues === 'px' ? draft.values.padding = columnPaddings[0] : draft.values.padding = receivedValues;
                    });
                    break;
                }
                case 'moreOptionsBorder': {
                    const newColumnBorderColor = columnBorderColor.length ? [...columnBorderColor] : ['#000', '#000', '#000', '#000'];
                    const newColumnBorderWidth = columnBorderWidth.length ? [...columnBorderWidth] : ['0px', '0px', '0px', '0px'];
                    const newColumnBorderStyle = columnBorderStyle.length ? [...columnBorderStyle] : ['solid', 'solid','solid','solid'];

                    if (receivedValues) {

                        newColumn = produce(column, draft => {
                            draft.values.border = {
                                borderWidth: `${newColumnBorderWidth[0]} ${newColumnBorderWidth[0]} ${newColumnBorderWidth[0]} ${newColumnBorderWidth[0]}`,
                                borderColor: `${newColumnBorderColor[0]} ${newColumnBorderColor[0]} ${newColumnBorderColor[0]} ${newColumnBorderColor[0]}`,
                                borderStyle: `${newColumnBorderStyle[0]} ${newColumnBorderStyle[0]} ${newColumnBorderStyle[0]} ${newColumnBorderStyle[0]}`
                            };
                        });
                    } else {
                        newColumn = produce(column, draft => {
                            draft.values.border = {
                                borderWidth: newColumnBorderWidth[0],
                                borderColor: newColumnBorderColor[0],
                                borderStyle: newColumnBorderStyle[0]
                            };
                        });
                    }
                    break;
                }
                case 'borderColorColumn': {
                    if (receivedValues) {
                        newColumn = produce(column, draft => {
                            draft.values.border.borderColor = receivedValues;
                        });
                    }
                    break;
                }
                case 'borderSelectSingle': {
                    if (receivedValues) {
                        newColumn = produce(column, draft => {
                            draft.values.border.borderStyle = receivedValues;
                        });
                    }
                    break;
                }
                case 'borderColumnWidth': {

                    if (receivedValues && receivedValues !== 'px') {
                        if (receivedValues === '0px' && !columnBorderWidth.length) {
                            //
                        } else {
                            newColumn = produce(column, draft => {
                                draft.values.border.borderWidth = receivedValues;
                                if (!columnBorderStyle.length) {
                                    draft.values.border.borderStyle = 'solid';
                                }
                            });

                        }
                    }
                    break;
                }
                case 'columnBorderColorTop':
                case 'columnBorderColorRight':
                case 'columnBorderColorBottom':
                case 'columnBorderColorLeft': {
                    if (receivedValues) {
                        const newColumnBorderColor = [...columnBorderColor];
                        let index = 0;

                        switch (idChild) {
                            case 'columnBorderColorTop': index = 0; break;
                            case 'columnBorderColorRight': index = 1; break;
                            case 'columnBorderColorBottom': index = 2; break;
                            case 'columnBorderColorLeft': index = 3; break;
                        }
                            
                        newColumnBorderColor[index] = receivedValues;
                        newColumn = produce(column, draft => {
                            draft.values.border.borderColor = `${newColumnBorderColor[0]} ${newColumnBorderColor[1]} ${newColumnBorderColor[2]} ${newColumnBorderColor[3]}`;
                        });
                    }
                    break;
                }
                case 'columnBorderStyleTop':
                case 'columnBorderStyleRight':
                case 'columnBorderStyleBottom':
                case 'columnBorderStyleLeft': {
                    if (receivedValues) {
                        const newColumnBorderStyle = [...columnBorderStyle];
                        let index = 0;

                        switch (idChild) {
                            case 'columnBorderStyleTop': index = 0; break;
                            case 'columnBorderStyleRight': index = 1; break;
                            case 'columnBorderStyleBottom': index = 2; break;
                            case 'columnBorderStyleLeft': index = 3; break;
                        }

                        newColumnBorderStyle[index] = receivedValues;
                        newColumn = produce(column, draft => {
                            draft.values.border.borderStyle = `${newColumnBorderStyle[0]} ${newColumnBorderStyle[1]} ${newColumnBorderStyle[2]} ${newColumnBorderStyle[3]}`;
                        });
                    }
                    break;
                }
            }

            dispatchStore({
                type: actionType.UPDATE_ROW,
                payload: {
                    id: rowId,
                    values: newRow
                }
            });

            dispatchStore({
                type: actionType.UPDATE_COLUMN,
                payload: {
                    id: columnId,
                    values: newColumn
                }
            });
        }
        if (activeElement.includes('content')) {
            let newContent = {};

            switch (idChild) {
                case 'fontFamily': {
                    const currentFont = getObjectPropSafely(() => values.fontFamily.label);

                    if (receivedValues.name !== currentFont) {
                        newContent = produce(content, draft => {
                            draft.values[idChild] = {
                                label: receivedValues.label,
                                value: receivedValues.value,
                                url: '',
                                defaultFont: receivedValues.defaultFont
                            };
                        });
                    }
                    break;
                }
                case 'padding':
                case 'containerPadding':
                case 'layout':
                case 'align':
                case 'textColor':
                case 'linkColor':
                case 'fontSize': {
                    const existValue = getObjectPropSafely(() => values[idChild]);

                    if (receivedValues && receivedValues !== existValue && receivedValues !== 'px') {
                        newContent = produce(content, draft => {
                            draft.values[idChild] = receivedValues;
                        });
                    }
                    break;
                }
                case 'borderTopStyle': {
                    if (receivedValues) {
                        newContent = produce(content, draft => {
                            draft.values.border.borderTopStyle = receivedValues;
                        });
                    }
                    break;
                }
                case 'borderTopWidth': {
                    if (receivedValues && receivedValues !== 'px') {
                        newContent = produce(content, draft => {
                            draft.values.border.borderTopWidth = receivedValues;
                        });
                    }
                    break;
                }
                case 'borderTopColor': {
                    if (receivedValues) {
                        newContent = produce(content, draft => {
                            draft.values.border.borderTopColor = receivedValues;
                        });
                    }
                    break;
                }
                case 'alignments': {
                    if (receivedValues) {
                        newContent = produce(content, draft => {
                            draft.values.textAlign = receivedValues;
                        });
                    }
                    break;
                }
                case 'backgroundColorButton': {
                    if (receivedValues) {
                        newContent = produce(content, draft => {
                            draft.values.buttonColors.backgroundColor = receivedValues;
                        });
                    }
                    break;
                }
                case 'moreOptionsMenuPadding': {
                    if (receivedValues) {
                        newContent = produce(content, draft => {
                            draft.values.padding = `${menuPaddings[0]} ${menuPaddings[0]} ${menuPaddings[0]} ${menuPaddings[0]}`;
                        });
                    } else {
                        newContent = produce(content, draft => {
                            draft.values.padding = menuPaddings[0];
                        });
                    }
                    break;
                }
                case 'moreOptionsContainerPadding': {
                    if (receivedValues) {
                        newContent = produce(content, draft => {
                            draft.values.containerPadding = `${containerPaddings[0]} ${containerPaddings[0]} ${containerPaddings[0]} ${containerPaddings[0]}`;
                        });
                    } else {
                        newContent = produce(content, draft => {
                            draft.values.containerPadding = containerPaddings[0];
                        });
                    }
                    break;
                }
                default: {
                    if (receivedValues && receivedValues !== '%') {
                        newContent = produce(content, draft => {
                            draft.values[idChild] = receivedValues;
                        });
                    }
                }
            }

            dispatchStore({
                type: actionType.UPDATE_CONTENT,
                payload: {
                    id: contentId,
                    values: newContent
                }
            });
        }        
    };

    const updateComponentChild = (key, idChild, value) => {
        try {
            switch (key) {
                case 'childPadding' : {
                    const newListPaddings = [...listPaddings];

                    switch (idChild) {
                        case 'top': newListPaddings[0] = value; break;
                        case 'right': newListPaddings[1] = value; break;
                        case 'bottom': newListPaddings[2] = value; break;
                        case 'left': newListPaddings[3] = value; break;
                    }

                    const newRow = produce(row, draft => {
                        draft.values.padding = `${newListPaddings[0]} ${newListPaddings[1]} ${newListPaddings[2]} ${newListPaddings[3]}`;
                    });
        
                    dispatchStore({
                        type: actionType.UPDATE_ROW,
                        payload: {
                            id: rowId,
                            values: newRow
                        }
                    });
                    break;
                }
                case 'childColumnPadding': {
                    const newColumnPaddings = [...columnPaddings];

                    switch (idChild) {
                        case 'top': newColumnPaddings[0] = value; break;
                        case 'right': newColumnPaddings[1] = value; break;
                        case 'bottom': newColumnPaddings[2] = value; break;
                        case 'left': newColumnPaddings[3] = value; break;
                    }

                    const newColumn = produce(column, draft => {
                        draft.values.padding = `${newColumnPaddings[0]} ${newColumnPaddings[1]} ${newColumnPaddings[2]} ${newColumnPaddings[3]}`;
                    });
        
                    dispatchStore({
                        type: actionType.UPDATE_COLUMN,
                        payload: {
                            id: columnId,
                            values: newColumn
                        }
                    });
                    break;
                }
                case 'childBorder': {
                    const newColumnBorderWidth = [...columnBorderWidth];

                    switch (idChild) {
                        case 'columnBorderWidthTop': newColumnBorderWidth[0] = value; break;
                        case 'columnBorderWidthRight': newColumnBorderWidth[1] = value; break;
                        case 'columnBorderWidthBottom': newColumnBorderWidth[2] = value; break;
                        case 'columnBorderWidthLeft': newColumnBorderWidth[3] = value; break;
                    }
                    const newColumn = produce(column, draft => {
                        draft.values.border.borderWidth = `${newColumnBorderWidth[0]} ${newColumnBorderWidth[1]} ${newColumnBorderWidth[2]} ${newColumnBorderWidth[3]}`;
                    });

                    dispatchStore({
                        type: actionType.UPDATE_COLUMN,
                        payload: {
                            id: columnId,
                            values: newColumn
                        }
                    });
                    break;
                }
                case 'childMenuPadding': 
                case 'childContainerPadding': {
                    const newPaddings = key === 'childMenuPadding' ? [...menuPaddings] : [...containerPaddings];
                    const convertPaddings = [newPaddings[0], newPaddings[1] || newPaddings[0], newPaddings[2] || newPaddings[0], newPaddings[3] || newPaddings[1] || newPaddings[0]];

                    switch (idChild) {
                        case 'top': {
                            if (value && value !== convertPaddings[0]) {
                                convertPaddings[0] = value;
                            }
                            break;
                        }
                        case 'right': {
                            if (value && value !== convertPaddings[1]) {
                                convertPaddings[1] = value;
                            }
                            break;
                        }
                        case 'bottom': {
                            if (value && value !== convertPaddings[2]) {
                                convertPaddings[2] = value;
                            }
                            break;
                        }
                        case 'left': {
                            if (value && value !== convertPaddings[3]) {
                                convertPaddings[3] = value;
                            }
                            break;
                        }
                    }

                    const newContent = produce(content, draft => {
                        draft.values[key === 'childMenuPadding' ? 'padding' : 'containerPadding'] = `${convertPaddings[0]} ${convertPaddings[1]} ${convertPaddings[2]} ${convertPaddings[3]}`;
                    });

                    dispatchStore({
                        type: actionType.UPDATE_CONTENT,
                        payload: {
                            id: contentId,
                            values: newContent
                        }
                    });
                    break;
                }
            }
        } catch (error) {
            //
        }
    };

    const switchCaseComponent = (element, key, type) => {
        try {
            if (element && Object.values(element).length) {
                const {
                    options = [],
                    label = '',
                    tooltip = '',
                    defaultValue,
                    id: idChild = '',
                    keyParent: idParent = '',
                    style = {},
                    message = '',
                    listBlock = [],
                    listTab = [],
                    unit = '',
                    isShowUnit = false,
                    isShowMessage = false,
                    isShowIcon = false,
                    elementChild = [],
                    keyShow = '',
                    isShowMessageLeft = false,
                    isShowMessageRight = false,
                    upLineKey = '',
                    keySelected = '',
                    keyActive = ''
                } = element;
                
                // let value = getObjectPropSafely(() => eval(`values.${idParent && (idParent + '.' || '')}${type ? key : idChild}`) || '');

                let value = '';
                let selectedValue = '';

                switch (idChild) {
                    case 'backgroundColorColumn': {
                        value = columnValues[keyActive]; 
                        break;
                    } 
                    case 'selectRadioImage': {
                        selectedValue = values[keySelected].url ? options[1].name : options[0].name;
                        break;
                    }
                    case 'paddingColumn': {
                        value = columnValues.padding;
                        break;
                    }
                    case 'borderColorColumn': {
                        value = columnBorderColor[0] || '#000';
                        break;
                    }
                    case 'borderSelectSingle': {
                        value = columnBorderStyle[0] || 'solid';
                        break;
                    }
                    case 'borderColumnWidth': {
                        value = columnBorderWidth[0] || '0px';
                        break;
                    }
                    case 'fontFamily': {
                        value = getObjectPropSafely(() => values.fontFamily.label);
                        break;
                    }
                    default: {
                        value = getObjectPropSafely(() => eval(`values.${idParent && (idParent + '.' || '')}${type ? key : idChild}`) || '');
                        break;
                    }
                }

                switch (upLineKey) {
                    case 'listPaddings': 
                    case 'columnPaddings': 
                    case 'menuPaddings':
                    case 'containerPaddings': {
                        const [a, b, c, d] = eval(upLineKey) || [];

                        switch (idChild) {
                            case 'top': value = a; break;
                            case 'right': value = b || a; break;
                            case 'bottom': value = c || a; break;
                            case 'left': value = d || b || a; break;
                        }
                        break;
                    }
                    case 'buttonPaddings': {
                        const padding = getObjectPropSafely(()=>values.padding);
                        const [a, b, c, d] = (padding.replace(/[^.0-9\s]/g,'')).split(' ');

                        switch (idChild) {
                            case 'top': value = a; break;
                            case 'right' : value = b || a; break;
                            case 'bottom' : value = c || a; break;
                            case 'left' : value = d || b || a; break;
                        }
                        break;
                    }
                    case 'columnBorderWidth':
                    case 'columnBorderStyle':
                    case 'columnBorderColor': {
                        const [top, right, bottom, left] = eval(upLineKey) || [];

                        if (eval(upLineKey).length > 1) {
                            switch (idChild) {
                                case `${upLineKey}Top`: value = top; break;
                                case `${upLineKey}Right`: value = right; break;
                                case `${upLineKey}Bottom`: value = bottom; break;
                                case `${upLineKey}Left`: value = left; break;
                            }
                        }
                        break;
                    }
                }

                // console.log((idParent + '.' || '') + (type ? key : idChild));
                // console.log('hello', value);

                // const valueStyle = typeof value === 'boolean' ? value : (typeof value === 'object' ? value.label : value.replace(new RegExp(`${unit}`,'gi'), ''));

                if (type && key === 'border') {
                    value = Object.values(value).length ? getObjectPropSafely(()=>value[idChild]) : defaultBorder[idChild];
                }

                const valueStyle = typeof value === 'boolean' ? value : (typeof value === 'string' ? value.replace(new RegExp(`${unit}`, 'gi'), '') : value);
                
                // console.log(values, 'values');
                // console.log(value, 'valueAfter');
                // console.log(idParent, 'idParent');
                // console.log(key, 'key');
                // console.log(idChild, 'idChild');
                // console.log(type, 'type');
                // console.log(unit, 'unit'); 
                // console.log(valueStyle, 'valueStyle');
                // console.log(element.type, 'elementType');

                switch (element.type) {
                    case typeComponent.CHECKBOX: {
                        return (
                            <Checkbox
                                checked={typeof valueStyle === 'boolean' ? valueStyle : defaultValue}
                                label={label}
                                onCheck={(isValid) => updateComponent(idParent, idChild, isValid)}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.FONT_COLOR: {

                        return (
                            <FontColor
                                styleCustom={getObjectPropSafely(() => style.styleChild) || {width: 44}}
                                tooltipName={label || tooltip}
                                label={label || null}
                                selectColor={(color) => updateComponent(idParent, idChild, color)}
                                color={valueStyle || defaultValue}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.SELECT_SINGLE: {
                        let isShow = true;

                        if (keyShow === 'borderStyle') {
                            isShow = Array.isArray(columnBorderStyle) && columnBorderStyle.length > 1 ? false : true;
                        }

                        return isShow ? (
                            <SelectSingle
                                style={{
                                    toggle: {minWidth: 70, width: 290, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, width: 290, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                sources={options}
                                label={label || null}
                                tooltipName={label || tooltip}
                                default={findValue(valueStyle || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '')}
                                translate={translate}
                            />
                        ) : null;
                    }
                    case typeComponent.SELECT_RADIO: {

                        const handleOnChange = (value) => {
                            if (value) {
                                updateComponent(idParent, idChild, value);
                            }
                        };

                        return (
                            <SelectRadio
                                styleLabel={{height: 10}}
                                defaultName={selectedValue || defaultValue}
                                sources={options}
                                onChange={handleOnChange}
                            />
                        );
                    }
                    case typeComponent.FILL_COLOR: {
                        let isShow = true;

                        if (keyShow === 'borderColor') {
                            isShow = Array.isArray(columnBorderColor) && columnBorderColor.length > 1 ? false : true;
                        }

                        return isShow ? (
                            <FillColor
                                styleCustom={getObjectPropSafely(() => style.styleChild) || {width: 44}}
                                label={label || null}
                                styleLabel={{marginBottom: 6}}
                                tooltipName={label || tooltip}
                                selectColor={(color) => updateComponent(idParent, idChild, color)}
                                color={valueStyle || defaultValue}
                                translate={translate}
                            />
                        ) : null;
                    }
                    case typeComponent.OPACITY: {
                        return (
                            <Opacity
                                style={{
                                    toggle: {minWidth: 70, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                label={label || null}
                                sources={options}
                                tooltipName={label || tooltip}
                                showIcon={isShowIcon}
                                default={findValue(valueStyle || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '')}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.BORDER_COLOR: {
                        return (
                            <BorderColor
                                styleCustom={getObjectPropSafely(() => style.styleChild) || {width: 44}}
                                label={label || null}
                                tooltipName={label || tooltip}
                                selectColor={(color) => updateComponent(idParent, idChild, color)}
                                color={valueStyle || defaultValue}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.BORDER_RADIUS: {
                        return (
                            <BorderRadius
                                style={{
                                    toggle: {minWidth: 70, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                label={label || null}
                                sources={options}
                                tooltipName={label || tooltip}
                                showIcon={isShowIcon}
                                default={findValue(valueStyle || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '')}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.BORDER_WEIGHT: {
                        return (
                            <LineWeight
                                style={{
                                    toggle: {minWidth: 70, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                sources={options}
                                tooltipName={label || tooltip}
                                showIcon={isShowIcon}
                                default={findValue(valueStyle || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '')}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.LINE_STYLE: {
                        return (
                            <LineStyle
                                style={{
                                    toggle: {minWidth: 70, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                sources={options}
                                label={label || null}
                                tooltipName={label || tooltip}
                                showIcon={isShowIcon}
                                default={findValue(valueStyle || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '')}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.FONT_FAMILY: {
                        return (
                            <FontFamily
                                style={{
                                    toggle: {minWidth: 70, width: 270, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, width: 270, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                sources={options}
                                isChangeFont
                                showIcon={isShowIcon}
                                label={label || null}
                                tooltipName={label || tooltip}
                                default={findValue(valueStyle || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option || {})}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.FONT_SIZE: {
                        return (
                            <FontSize
                                style={{
                                    toggle: {minWidth: 70, width: 290, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, width: 290, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                label={label || null}
                                sources={options}
                                tooltipName={label || tooltip}
                                default={findValue(valueStyle || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '')}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.TEXT_INPUT: {
                        let isShow = true;

                        if (keyShow) {
                            const isValid = getObjectPropSafely(() => eval(`content.values.${keyShow}`));

                            // console.log(isValid, 'isValid');
                            // console.log(keyShow, 'keyShow');
                            // console.log(content, 'content');
                            if (typeof isValid === 'string') {isShow = isValid.split(' ').length > 1 ? false : true}
                            if (typeof isValid === 'boolean') {isShow = !isValid}
                            if (typeof isValid === 'undefined') {isShow = false}
                            // console.log(isShow, 'isShow');
                        }

                        switch (keyShow) {
                            case 'moreOptionsPadding': {
                                isShow = listPaddings.length > 1 ? false : true;
                                break;
                            }
                            case 'backgroundImage': {
                                const url = getObjectPropSafely(() => values[keyShow].url) || '';

                                isShow = url ? true : false;
                                break;
                            }
                            case 'moreOptionsColumnPadding': {
                                isShow = columnPaddings.length > 1 ? false : true;
                                break;
                            }
                            case 'borderWidth': {
                                isShow = Array.isArray(columnBorderWidth) && columnBorderWidth.length > 1 ? false : true;
                                break;  
                            }
                            case 'moreOptionsMenuPadding': {
                                isShow = menuPaddings.length > 1 ? false : true;
                                break;
                            }
                            case 'moreOptionsContainerPadding': {
                                isShow = containerPaddings.length > 1 ? false : true;
                                break;
                            }}

                        const handleOnChange = (value) => {
                            if (type === typeComponent.COMPONENT_CHILD) {
                                if (value) {
                                    updateComponentChild(key, idChild, `${value}${unit || ''}`, valueStyle);
                                }
                            } else {
                                updateComponent(idParent, idChild, `${value}${unit}`);
                            }
                        };

                        return isShow ? (
                            <>
                                <TextInput
                                    label={label || null}
                                    styleLabel={{height: 30}}
                                    style={getObjectPropSafely(() => style.styleChild) || {width: 100}}
                                    // value={textStyleValue || valueStyle}
                                    value={valueStyle}
                                    onChange={(value) => handleOnChange(value)}
                                />
                                {
                                    isShowUnit ? (
                                        <span style={{fontSize: 12, marginLeft: 5}}>{unit}</span>
                                    ) : null
                                }
                                {
                                    isShowMessage ? (
                                        <div className="section-label font-weight-normal" style={{marginBottom: 5, height: 30}}>
                                            <span style={{fontSize: 11, color: '#999999'}}>{translate(message, message)}</span>
                                        </div>
                                    ) : null
                                }
                            </>
                        ) : null;
                    }
                    case typeComponent.TEXT_AREA: {
                        return (
                            <>
                                <TextArea
                                    label={label || null}
                                    styleLabel={{height: 30}}
                                    style={getObjectPropSafely(() => style.styleChild) || {width: 100}}
                                    value={valueStyle || defaultValue}
                                // onChange={handleOnChange}
                                />
                                {
                                    isShowUnit ? (
                                        <span style={{fontSize: 12, marginLeft: 5}}>{unit}</span>
                                    ) : null
                                }
                                {
                                    isShowMessage ? (
                                        <div className="section-label font-weight-normal" style={{marginBottom: 5, height: 30}}>
                                            <span style={{fontSize: 11, color: '#999999'}}>{translate(message, message)}</span>
                                        </div>
                                    ) : null
                                }
                            </>
                        );
                    }
                    case typeComponent.SWITCH: {
                        let isActive = false;

                        switch (idChild) {
                            case 'moreOptionsPadding': {
                                isActive = listPaddings.length > 1 ? true : false; break;
                            }
                            case 'moreOptionsColumnPadding': {
                                isActive = columnPaddings.length > 1 ? true : false; break;
                            }
                            case 'moreOptionsBorder': {
                                isActive = columnBorderWidth.length > 1 ? true : false; break;
                            }
                            case 'moreOptionsMenuPadding': {
                                isActive = menuPaddings.length > 1 ? true : false; break;
                            }
                            case 'moreOptionsContainerPadding': {
                                isActive = containerPaddings.length > 1 ? true : false; break;
                            }
                        }

                        return (
                            <>
                                {
                                    label && (
                                        <div className="section-label text-nowrap font-weight-normal" style={{height: 22}}>
                                            <span style={{fontSize: 12}}>{translate(label, label)}</span>
                                        </div>
                                    )
                                }
                                <div className={'pb-10'} style={{display: 'flex', alignItems: 'center'}}>
                                    {
                                        isShowMessageLeft ? (
                                            <div className="section-label font-weight-normal" style={{marginRight: 10}}>
                                                <span style={{fontSize: 12}}>{translate(message, message)}</span>
                                            </div>
                                        ) : null
                                    }
                                    <Switch
                                        style={{marginLeft: 0}}
                                        default={valueStyle || isActive}
                                        backgroundColor='#9cce24'
                                        size='12'
                                        onClick={(isShow) => updateComponent(idParent, idChild, isShow)}
                                    />
                                    {
                                        isShowMessageRight ? (
                                            <div className="section-label font-weight-normal" style={{marginLeft: 10}}>
                                                <span style={{fontSize: 12}}>{translate(message, message)}</span>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </>
                        );
                    }
                    case typeComponent.ALIGNMENT: {
                        return (
                            <Alignment
                                label={label || null}
                                styleLabel={{height: 30}}
                                translate={translate}
                                callback={(value) => updateComponent(idParent, idChild, value)}
                                value={valueStyle || defaultValue}
                            />
                        );
                    }
                    case typeComponent.LABEL: {
                        return (
                            <div className="section-label text-nowrap font-weight-normal">
                                <span style={{fontSize: 12}}>{translate(label, label)}</span>
                            </div>
                        );
                    }
                    case typeComponent.UPLOAD: {
                        let isShow = true;
                        
                        if (keyShow) {
                            const url = getObjectPropSafely(() => values[keyShow].url) || '';

                            isShow = url ? false : true;
                        }

                        return isShow ? (
                            <>
                                {
                                    label && (
                                        <div className="section-label text-nowrap font-weight-normal" style={{height: 22}}>
                                            <span style={{fontSize: 12}}>{translate(label, label)}</span>
                                        </div>
                                    )
                                }
                                <Upload
                                    isShowMessage
                                    extensions={['jpg', 'gif', 'png']}
                                    labelButton={'Browse Image'}
                                    // isShowError={getObjectPropSafely(() => stateUpload.error.file.length)}
                                    // messageError={translate(msgError[stateUpload.error.file[0]])}
                                    // callback={handleUploadFile}
                                    translate={translate}
                                />
                            </>
                        ) : null;
                    }
                    case typeComponent.COMPONENT_CHILD: {
                        let isShow = true;

                        if (keyShow) {
                            const isValid = getObjectPropSafely(() => eval(`content.values.${keyShow}`));

                            if (typeof isValid === 'string') {isShow = isValid.split(' ').length > 1 ? true : false}
                            if (typeof isValid === 'boolean') {isShow = isValid}
                            // console.log(isValid, 'isValid');
                            // console.log(keyShow, 'keyShow');
                            // console.log(content, 'content');
                            // console.log(elementChild, 'elementChild');
                            // console.log(isShow, 'isS');
                            // isShow = typeof isValid === 'boolean' ? isValid : true;
                        }
                        switch (keyShow) {
                            case 'moreOptionsPadding': {
                                isShow = listPaddings.length > 1 ? true : false; break;
                            }
                            case 'moreOptionsColumnPadding': {
                                isShow = columnPaddings.length > 1 ? true : false; break;
                            }
                            case 'moreOptionsBorder': {
                                isShow = Array.isArray(columnBorderWidth) && columnBorderWidth.length > 1 ? true : false; break;
                            }
                            case 'moreOptionsMenuPadding': {
                                isShow = menuPaddings.length > 1 ? true : false; break;
                            }
                            case 'moreOptionsContainerPadding': {
                                isShow = containerPaddings.length > 1 ? true : false; break;
                            }}

                        return isShow ? (
                            <div className={classnames(styles['content-child'])}>
                                {renderComponent(elementChild, idChild, element.type)}
                            </div>
                        ) : null;
                    }
                    case typeComponent.BLOCK_COLUMNS: {
                        let listWidth = [];

                        const listBlockWidth = listBlock.length ? listBlock.map((column) => column.width) : [];

                        Array.isArray(cells) && cells.length && cells.forEach(cell => {
                            const width = getObjectPropSafely(() => `${(cell / _.sum(cells)) * 100}%`);

                            listWidth.push(width);
                        });
                        
                        const isActive = isEqual(listBlockWidth, listWidth);

                        const onClickColumn = (e) => {
                            if (!isActive) {
                                if (listWidth.length > listBlockWidth.length) {
  
                                    dispatchStore({
                                        type: actionType.TOGGLE_DELETE_FORM,
                                        payload: {
                                            toggleDeleteForm : {
                                                isDeleteFormOpening: true,
                                                type: 'column',
                                                id: '',
                                                rowID: rowId,
                                                message: `You will lose ${listWidth.length - listBlockWidth.length} column. Are you sure?`,
                                                numberOfColumns: listWidth.length - listBlockWidth.length
                                            }                                         
                                        }
                                    });
                                } else {
                                    const numberOfNewColumns = listBlockWidth.length - cells.length;
                                    const newCells = [];

                                    listBlockWidth.length && listBlockWidth.forEach(width => {
                                        const charIndex = width.indexOf('%');
                                        const widthFormat = width.slice(0, charIndex);

                                        newCells.push(+widthFormat / 10);
                                    });

                                    if (numberOfNewColumns === 0) {
                                        const newRows = produce(rows, draft => {
                                            draft[rowId].cells = newCells;
                                        });

                                        dispatchStore({
                                            type: actionType.HANDLE_ROW,
                                            payload: {
                                                rows: newRows              
                                            }
                                        });
                                    } else {
                                        let newRows = rows;
                                        let newColumns = columns;
                                        let newUsageCounters = {...usageCounters};

                                        for (let i = 0; i < numberOfNewColumns; i++) {
                                            const newColumnId = (parseInt(getLastUsingId(store), 0) + 1 + i) + '';

                                            newUsageCounters = updateUsageCounters(newUsageCounters, 'column', 'add');

                                            newRows = produce(newRows, draft => {
                                                draft[rowId].cells = newCells;
                                                draft[rowId].columns.push(newColumnId);
                                            });

                                            newColumns = produce(newColumns, draft => {
                                                draft[newColumnId] = {
                                                    contents: [],
                                                    location: {
                                                        colection: 'columns',
                                                        id: newColumnId
                                                    },
                                                    values: {
                                                        '_meta': {
                                                            'htmlID': `u_column_${newUsageCounters.u_column}`,
                                                            'htmlClassNames': 'u_column'
                                                        },
                                                        'border': {},
                                                        'padding': '0px',
                                                        'backgroundColor': ''
                                                    }
                                                };
                                            });    
                                        } 

                                        dispatchStore({
                                            type: actionType.HANDLE_ROW,
                                            payload: {
                                                rows: newRows,
                                                columns: newColumns,
                                                usageCounters: newUsageCounters                
                                            }
                                        });
                                    }
                                }
                                
                            }
                        };

                        const component = listBlock.length ? listBlock.map(item => {
                            return (
                                <div key={item.id} className={classnames(styles['blockbuilder-column'])} style={{width: item.width}}>
                                    <div className={styles['blockbuilder-column-content']} title={item.width} />
                                </div>
                            );
                        }) : null;

                        return (
                            <div 
                                className={classnames(
                                    styles['blockbuilder-row'], 
                                    {[styles['active']]: isActive},
                                    'row'
                                )} 
                                onClick={onClickColumn}
                            >
                                {component}
                            </div>
                        );
                    }
                    case typeComponent.TAB_COLUMN: {

                        const onClickAddColum = () => {
                            if (row.cells.length < 8) {
                                const newColumnId = (parseInt(getLastUsingId(store), 0) + 1) + '';
                                const newUsageCounters = updateUsageCounters(usageCounters, 'column', 'add');
                                const newCells = [];

                                for (let i = 1; i <= row.cells.length + 1; i++) {
                                    newCells.push(1);
                                }

                                const newRows = produce(rows, draft => {
                                    draft[rowId].cells = [...newCells];
                                    draft[rowId].columns = [...draft[rowId].columns, newColumnId];
                                });
                                
                                const newColumns = produce(columns, draft => {
                                    draft[newColumnId] = {
                                        contents: [],
                                        location: {
                                            colection: 'columns',
                                            id: newColumnId
                                        },
                                        values: {
                                            '_meta': {
                                                'htmlID': `u_column_${newUsageCounters.u_column}`,
                                                'htmlClassNames': 'u_column'
                                            },
                                            'border': {},
                                            'padding': '0px',
                                            'backgroundColor': ''
                                        }
                                    };
                                });
    
                                dispatchStore({
                                    type: actionType.HANDLE_ROW,
                                    payload: {
                                        rows: newRows,
                                        columns: newColumns,
                                        usageCounters: newUsageCounters                
                                    }
                                });
                            }
                        };

                        const onClickDeleteColumn = () => {
                            if (row.cells.length > 1) {
                                const newUsageCounters = updateUsageCounters(usageCounters, 'column', 'subtract');
                                const deleteColumnId = getObjectPropSafely(() => row.columns[row.columns.length - 1]);

                                const newRows = produce(rows, draft => {
                                    draft[rowId].cells.pop();
                                    draft[rowId].columns.pop();
                                });

                                const newColumns = produce(columns, draft => {
                                    delete draft[deleteColumnId];
                                });

                                dispatchStore({
                                    type: actionType.HANDLE_ROW,
                                    payload: {
                                        rows: newRows,
                                        columns: newColumns,
                                        usageCounters: newUsageCounters                
                                    }
                                });
                            }
                        };

                        const onClickChangeColumn = (index) => {
                            setActiveColumn(index);
                        };
                        const component = listTab.length ? listTab.map((item, index) => {
                            if (index < cells.length) {
                                return (
                                    <div key={item.id} className={classnames(styles['tab'], {[styles['active']] : activeColumn === index})} onClick={() => onClickChangeColumn(index)}>
                                        <span style={{fontSize: 12}}>{item.label}</span>
                                    </div>
                                );
                            }
                        }) : null;

                        return (
                            <div style={{display: 'flex'}}>
                                <div className={classnames(styles['block-tab-column'])}>
                                    {component}
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: 5}}>
                                    <div className={classnames(styles['add-column'])} style={{marginRight: 2}} onClick={onClickAddColum}>
                                        <Icon type='icon-ants-add' />
                                    </div>
                                    <div className={classnames(styles['add-column'])} onClick={onClickDeleteColumn}>
                                        <Icon type='icon-ants-trash' />
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    case typeComponent.LIST_COMPONENTS: {

                        return (
                            <div>
                                <Droppable 
                                    droppableId='droppable-side-panel-1' 
                                    type='side-panel'
                                    renderClone={(provided, snapshot, rubric) => {
                                        const item = {...elementChild[rubric.source.index]};

                                        return (
                                            <div 
                                                className={classnames('col-6', styles['list-component-item'])} 
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    ...(snapshot.isDropAnimating && {transitionDuration: '0.001s'})
                                                }}                                        
                                            >
                                                <div className={classnames(styles['list-component-item-icon'])} style={{borderColor: '#222'}}>
                                                    <Icon type={item.icon} style={{color: '#222', fontSize: '16px'}} />
                                                </div>
                                                {translate(item.label, item.label)}
                                            </div>
                                        );
                                    }}
                                >
                                    {(provided, snapshot) => {

                                        return (
                                            <div className="row" ref={provided.innerRef} {...provided.droppableProps}>
                                                {elementChild.length && elementChild.map((child, index) => {
                                                    const shouldRenderClone = 'draggable-new-' + child.id === snapshot.draggingFromThisWith;

                                                    return (
                                                        <React.Fragment key={child.id}>
                                                            {shouldRenderClone ? 
                                                                (
                                                                    <div 
                                                                        className={classnames('col-6', styles['list-component-item'])}                                         
                                                                    >
                                                                        <div className={classnames(styles['list-component-item-icon'])} >
                                                                            <Icon type={child.icon} style={{color: '#ccc', fontSize: '16px'}} />
                                                                        </div>
                                                                        {translate(child.label, child.label)}
                                                                    </div>
                                                                ) : 
                                                                (
                                                                    <Draggable draggableId={'draggable-new-' + child.id} index={index}>
                                                                        {(provided) => {
                                                                            return (
                                                                                <div 
                                                                                    className={classnames('col-6', styles['list-component-item'])} 
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={{
                                                                                        ...provided.draggableProps.style, transform: 'none'                 
                                                                                    }}                                        
                                                                                >
                                                                                    <div className={classnames(styles['list-component-item-icon'])} >
                                                                                        <Icon type={child.icon} style={{color: '#ccc', fontSize: '16px'}} />
                                                                                    </div>
                                                                                    {translate(child.label, child.label)}
                                                                                </div>
                                                                            );
                                                                        }}
                                                                    </Draggable>
                                                                )}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        );
                        // return (
                        //     <div className="row">
                        //         {elementChild.length && elementChild.map((child) => {
                        //             return (
                        //                 <div 
                        //                     key={child.id}
                        //                     className={classnames('col-6', styles['list-component-item'])}                                          
                        //                 >
                        //                     <div className={classnames(styles['list-component-item-icon'])} >
                        //                         <Icon type={child.icon} style={{color: '#ccc', fontSize: '16px'}} />
                        //                     </div>
                        //                     {translate(child.label, child.label)}
                        //                 </div>
                        //             );
                        //         })}
                        //     </div>
                        // );
                    }
                }
            }
            
        } catch (error) {
            // handleError(error, {
            //     path: PATH,
            //     action: 'switchCaseComponent',
            //     args: {element, idParent}
            // });
        }
    };

    const renderComponent = (elements, id, type = '') => {
        
        try {
            if (elements && elements.length) {
                return elements.map((item,index) => {
                    return (
                        <div key={`${item.id}-${index}`} className={classnames(styles[`${item.className}`], `mb-15 ${item.className}`)} style={{marginBottom: 15, ...getObjectPropSafely(() => item.style.styleParent)}}>
                            {switchCaseComponent(item, id, type)}
                        </div>
                    );
                });
            }
        } catch (error) {
            //
        }
    };

    const renderHtml = () => {

        try {
            if (config && config.length) {
                return config.map(item => {
                    return (
                        <div key={item.id}>
                            <div className="section" style={{...item.style}}>
                                <div className={classnames(styles['section-label'])}>{translate(item.label, item.label)}</div>
                                <div className='section-container pl-15 mb-15' style={{display: 'flex', flexWrap: 'wrap', marginLeft: 10, justifyContent: 'space-between'}}>
                                    {renderComponent(item.elements, item.id)}
                                </div>
                            </div>
                            <hr style={{marginTop: 5, marginBottom: 5}} />
                        </div>
                    );
                });
            }
        } catch (error) {
            //
        }
    };

    try {
        return (
            <>
                {renderHtml()}
            </>
        );
    } catch (error) {
        //
    }
};

export default memo(Style);