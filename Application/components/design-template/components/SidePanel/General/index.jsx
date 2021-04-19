// Libraries
import React, {useEffect, useState, useContext, memo} from 'react';
import classnames from 'classnames';
import produce from 'immer';

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

// Assets
import {typeComponent} from 'Components/design-template/constants';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';

// Context
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {actionType} from 'Components/design-template/components/ContextStore/constants';

// utils
import {getObjectPropSafely, random} from 'Utils/index.ts';
import {
    getContentIDFromHtmlID
} from 'Components/design-template/components/Workspace/utils';
import {getActionType, getTarget, getTypeOfImage} from '../utils';
import {values} from 'lodash';

const PATH = 'Components/design-template/components/SidePanel/General/index.jsx';

const Style = props => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {
        activeElement,
        rows,
        bodies
    } = store;
    const {
        values = {},
        general = [],
        translate = (lal) => lal
    } = props;
    const bodyId = activeElement.includes('body') ? Object.keys(getObjectPropSafely(() => store.bodies))[0] : '';
    const contentId = activeElement.includes('content') ? getContentIDFromHtmlID(store, activeElement) : '';
    const content = getObjectPropSafely(() => store.contents[contentId]) || {};
    const menuItems = activeElement.includes('menu') ? getObjectPropSafely(() => values.menu.items) : [];
    const [config, setConfig] = useState({});

    useEffect(() => {
        try {
            if (general && general.length) {
                setConfig(general);
            }
        } catch (error) {
            //
        }
    }, [general]);

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

    const updateComponent = (idParent, idChild, receivedValues, itemIndex = 0) => {
        let newBodies = bodies;

        switch (idChild) {
            case 'contentWidth': {
                if (receivedValues && receivedValues !== 'px') {
                    newBodies = produce(newBodies, draft => {
                        draft[bodyId].values[idChild] = receivedValues;
                    });
                }
                dispatchStore({
                    type: actionType.UPDATE_BODY,
                    payload: {
                        bodies: newBodies
                    }
                });
                break;
            }
            case 'backgroundColorGeneral': {
                if (receivedValues) {
                    newBodies = produce(newBodies, draft => {
                        draft[bodyId].values.backgroundColor = receivedValues;
                    });
                }
                dispatchStore({
                    type: actionType.UPDATE_BODY,
                    payload: {
                        bodies: newBodies
                    }
                });
                break;
            }
            case 'fontFamily': {
                if (receivedValues.name) {
                    newBodies = produce(newBodies, draft => {
                        draft[bodyId].values[idChild] = {
                            label: receivedValues.label,
                            value: receivedValues.value,
                            url: '',
                            defaultFont: receivedValues.defaultFont
                        };  
                    });
                }
                dispatchStore({
                    type: actionType.UPDATE_BODY,
                    payload: {
                        bodies: newBodies
                    }
                });
                break;
            }
            case 'preheaderText': {
                if (receivedValues) {
                    newBodies = produce(newBodies, draft => {
                        draft[bodyId].values[idChild] = receivedValues;
                    });
                }
                dispatchStore({
                    type: actionType.UPDATE_BODY,
                    payload: {
                        bodies: newBodies
                    }
                });
                break;
            }
            case 'linkColor': {
                if (receivedValues) {
                    newBodies = produce(newBodies, draft => {
                        draft[bodyId].values.linkStyle[idChild] = receivedValues;
                    });
                }
                dispatchStore({
                    type: actionType.UPDATE_BODY,
                    payload: {
                        bodies: newBodies
                    }
                });
                break;
            }
            case 'linkUnderline': {
                if (receivedValues) {
                    newBodies = produce(newBodies, draft => {
                        draft[bodyId].values.linkStyle[idChild] = receivedValues === 'underline' ? true : false;
                    });
                }
                dispatchStore({
                    type: actionType.UPDATE_BODY,
                    payload: {
                        bodies: newBodies
                    }
                });
                break;
            }
            case `actionType${itemIndex}`: {
                const name = getObjectPropSafely(() => content.values.menu.items[itemIndex].link.name) || '';

                if (receivedValues && receivedValues !== name) {
                    const newContent = produce(content, draft => {
                        let link = {};
                        
                        switch (receivedValues) {
                            case 'web': {
                                link = {
                                    name: 'web',
                                    values: {
                                        href: '',
                                        target: '_self'
                                    }
                                };
                                break;
                            }
                            case 'email': {
                                link = {
                                    attrs: {
                                        'href': 'mailto:{{email}}?subject={{subject}}&body={{body}}'
                                    },
                                    name: 'email',
                                    values: {
                                        email: '',
                                        body: '',
                                        subject: ''
                                    }
                                };
                                break;
                            }
                            case 'phone': {
                                link = {
                                    attrs: {
                                        'href': 'tel:{{phone}}'
                                    },
                                    name: 'phone',
                                    values: {
                                        phone: ''
                                    }
                                };
                                break;
                            }
                            case 'sms': {
                                link = {
                                    attrs: {
                                        'href': 'sms:{{phone}}'
                                    },
                                    name: 'sms',
                                    values: {
                                        phone: ''
                                    }
                                };
                                break;
                            }
                        }
                        draft.values.menu.items[itemIndex].link = link;
                    });

                    dispatchStore({
                        type: actionType.UPDATE_CONTENT,
                        payload: {
                            id: contentId,
                            values: newContent
                        }
                    });
                }
                break;
            }
            case `menuText${itemIndex}`: {
                const text = getObjectPropSafely(() => content.values.menu.items[itemIndex].text) || '';

                if (receivedValues && receivedValues !== text) {
                    const newContent = produce(content, draft => {
                        draft.values.menu.items[itemIndex].text = receivedValues;
                    });

                    dispatchStore({
                        type: actionType.UPDATE_CONTENT,
                        payload: {
                            id: contentId,
                            values: newContent
                        }
                    });
                } 
                break;
            }
            case `url${itemIndex}` : {
                const url = getObjectPropSafely(() => content.values.menu.items[itemIndex].link.values.href) || '';

                if (receivedValues && receivedValues !== url) {
                    const newContent = produce(content, draft => {
                        draft.values.menu.items[itemIndex].link.values.href = receivedValues;
                    });

                    dispatchStore({
                        type: actionType.UPDATE_CONTENT,
                        payload: {
                            id: contentId,
                            values: newContent
                        }
                    });
                }
                break;
            }
            case `email${itemIndex}`:
            case `subject${itemIndex}`:
            case `body${itemIndex}`: {
                const newIdChild = idChild.replace(itemIndex + '', '');

                const existValue = getObjectPropSafely(() => content.values.menu.items[itemIndex].link.values[newIdChild]) || '';

                if (receivedValues && receivedValues !== existValue) {
                    const newContent = produce(content, draft => {
                        draft.values.menu.items[itemIndex].link.values = {
                            ...draft.values.menu.items[itemIndex].link.values,
                            [newIdChild]: receivedValues
                        };
                    });

                    dispatchStore({
                        type: actionType.UPDATE_CONTENT,
                        payload: {
                            id: contentId,
                            values: newContent
                        }
                    });
                }
                break;
            }
            case `phoneCall${itemIndex}`:
            case `phoneSendSMS${itemIndex}`: {
                const phone = getObjectPropSafely(() => content.values.menu.items[itemIndex].link.values.phone) || '';
                
                if (receivedValues && receivedValues !== phone) {
                    const newContent = produce(content, draft => {
                        draft.values.menu.items[itemIndex].link.values.phone = receivedValues;
                    });

                    dispatchStore({
                        type: actionType.UPDATE_CONTENT,
                        payload: {
                            id: contentId,
                            values: newContent
                        }
                    });
                }
                break;
            }
            case `target${itemIndex}`: {
                const target = getObjectPropSafely(() => content.values.menu.items[itemIndex].phone.target) || '';

                if (receivedValues && receivedValues !== target) {
                    const newContent = produce(content, draft => {
                        draft.values.menu.items[itemIndex].link.values.target = receivedValues;
                    });

                    dispatchStore({
                        type: actionType.UPDATE_CONTENT,
                        payload: {
                            id: contentId,
                            values: newContent
                        }
                    });
                }
                break;
            }
        }
    };

    const switchCaseComponent = (element, key, numberOfMenu = 0, itemIndex = 0) => {
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
                    isShowMessageRight = false
                } = element;

                // console.log(values, 'values');
                // console.log(idChild, 'idChild');
                // console.log(idParent, 'idParent');
                // console.log(key, 'key');
                // console.log(element.type, 'elementType');

                let value = '';
                let actionTypeMenu = '';

                switch (idChild) {
                    case 'contentWidth': value = getObjectPropSafely(() => values.contentWidth); break;
                    case 'backgroundColorGeneral': value = getObjectPropSafely(() => values.backgroundColor); break;
                    case 'fontFamily': value = getObjectPropSafely(() => values.fontFamily.label); break;
                    case 'preheaderText': value = getObjectPropSafely(() => values.preheaderText); break;
                    case 'linkColor': value = getObjectPropSafely(() => values.linkStyle.linkColor); break;
                    case 'linkUnderline': value = getObjectPropSafely(() => values.linkStyle.linkUnderline) ? 'underline' : 'none'; break;
                    case 'selectRadioImage': value = getTypeOfImage(getObjectPropSafely(()=>values.src.url), options); break;
                    default:
                        value = getObjectPropSafely(() => eval(`values.${idParent && (idParent + '.' || '')}${idChild}`) || '');
                        break;
                }

                if (key === 'action') {
                    switch (idChild) {
                        case 'name':
                            value = getActionType(value);
                            break;
                        case 'target': 
                            value = getTarget(value);
                            break;
                        default:
                            break;
                    }
                } 

                if (numberOfMenu > 0) {
                    for (let i = 0; i < numberOfMenu; ++i) {

                        switch (idChild) {
                            case `menuText${i}`: {
                                value = getObjectPropSafely(() => menuItems[i].text) || ''; 
                                actionTypeMenu = getObjectPropSafely(() => menuItems[i].link.name) || 'web';
                                break;
                            }
                            case `actionType${i}`: {
                                value = getObjectPropSafely(() => menuItems[i].link.name) || 'web'; 
                                break;
                            }
                            case `url${i}`: {
                                actionTypeMenu = getObjectPropSafely(() => menuItems[i].link.name) || 'web';
                                value = getObjectPropSafely(() => menuItems[i].link.values.href) || ''; 
                                break;
                            }
                            case `email${i}`: {
                                actionTypeMenu = getObjectPropSafely(() => menuItems[i].link.name) || 'web';
                                value = getObjectPropSafely(() =>  menuItems[i].link.values.email) || '';
                                break;
                            }
                            case `subject${i}`: {
                                actionTypeMenu = getObjectPropSafely(() => menuItems[i].link.name) || 'web';
                                value = getObjectPropSafely(() => menuItems[i].link.values.subject) || ''; 
                                break;
                            }
                            case `body${i}`: {
                                actionTypeMenu = getObjectPropSafely(() => menuItems[i].link.name) || 'web';
                                value = getObjectPropSafely(() => menuItems[i].link.values.body) || ''; 
                                break;
                            }
                            case `phoneCall${i}`:
                            case `phoneSendSMS${i}`: {
                                actionTypeMenu = getObjectPropSafely(() => menuItems[i].link.name) || 'web';
                                value = getObjectPropSafely(() => menuItems[i].link.values.phone) || ''; 
                                break;
                            }
                            case `target${i}`: {
                                actionTypeMenu = getObjectPropSafely(() => menuItems[i].link.name) || 'web';
                                value = getObjectPropSafely(() => menuItems[i].link.values.target) || '';
                            }
                        } 
                    }
                } 
                const valueStyle = typeof value === 'boolean' ? value : (typeof value === 'string' ? value.replace(new RegExp(`${unit}`,'gi'), '') : value );

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

                        if (keyShow) {
                            isShow = keyShow === actionTypeMenu ? true : false;
                        }

                        return isShow ? (
                            <SelectSingle
                                style={{
                                    toggle: {minWidth: 70, width: 290, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, width: 290, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                sources={options}
                                label={label || null}
                                // tooltipName={label || tooltip}
                                default={findValue(valueStyle || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '', itemIndex)}
                                translate={translate}
                            />
                        ) : null;
                    }
                    case typeComponent.SELECT_RADIO: {
                        return (
                            <SelectRadio
                                styleLabel={{height: 10}}
                                defaultName={valueStyle || defaultValue}
                                sources={options}
                            // onChange={handleOnChange}
                            />
                        );
                    }
                    case typeComponent.FILL_COLOR: {
                        return (
                            <FillColor
                                styleCustom={getObjectPropSafely(() => style.styleChild) || {width: 44}}
                                label={label || null}
                                styleLabel={{marginBottom: 6}}
                                tooltipName={label || tooltip}
                                selectColor={(color) => updateComponent(idParent, idChild, color)}
                                color={valueStyle || defaultValue}
                                translate={translate}
                            />
                        );
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

                        // if (keyShow) {
                        //     const type = getObjectPropSafely(() => props.style[idParent][keyShow]);

                        //     isShow = type === 'imageUrl' ? true : false;
                        // }

                        if (keyShow) {
                            switch (keyShow) {
                                case 'web': isShow = keyShow === actionTypeMenu ? true : false; break;
                                case 'email': isShow = keyShow === actionTypeMenu ? true : false; break;
                                case 'phone': isShow = keyShow === actionTypeMenu ? true : false; break;
                                case 'sms': isShow = keyShow === actionTypeMenu ? true : false; break;
                            }
                        }

                        const handleOnChange = (value) => {       
                            updateComponent(idParent, idChild, `${value}${unit}`, itemIndex);
                        };

                        return isShow ? (
                            <>
                                <TextInput
                                    label={label || null}
                                    styleLabel={{height: 30}}
                                    style={getObjectPropSafely(() => style.styleChild) || {width: 100}}
                                    value={valueStyle || defaultValue}
                                    onChange={handleOnChange}
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
                        let isShow = true;

                        return isShow ? (
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
                        ) : null;
                    }
                    case typeComponent.SWITCH: {
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
                                        default={valueStyle || defaultValue}
                                        backgroundColor='#9cce24'
                                        size='12'
                                    // onClick={this.onClickOpenParameter}
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
                            // style={getObjectPropSafely(() => style.styleChild) || { width: 100 }}
                            // value={valueStyle || defaultValue}
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

                        // if (keyShow) {
                        //     const type = getObjectPropSafely(() => props.style[idParent][keyShow]);

                        //     isShow = type === 'uploadImage' ? true : false;
                        // }

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
                            const isValid = getObjectPropSafely(() => props.style[idParent][keyShow]);

                            isShow = typeof isValid === 'boolean' ? isValid : true;
                        }

                        return isShow ? (
                            <div className={classnames(styles['content-child'])}>
                                {renderComponent(elementChild, idParent)}
                            </div>
                        ) : null;
                    }
                    case typeComponent.BLOCK_COLUMNS: {
                        const component = listBlock.length ? listBlock.map(item => {
                            return (
                                <div key={item.id} className={classnames(styles['blockbuilder-column'])} style={{width: item.width}}>
                                    <div className={styles['blockbuilder-column-content']} title={item.width} />
                                </div>
                            );
                        }) : null;

                        return (
                            <div className={classnames(styles['blockbuilder-row'], 'row')}>
                                {component}
                            </div>
                        );
                    }
                    case typeComponent.TAB_COLUMN: {
                        const component = listTab.length ? listTab.map(item => {
                            return (
                                <div key={item.id} className={classnames(styles['tab'])}>
                                    <span style={{fontSize: 12}}>{item.label}</span>
                                </div>
                            );
                        }) : null;

                        return (
                            <div style={{display: 'flex'}}>
                                <div className={classnames(styles['block-tab-column'])}>
                                    {component}
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', marginLeft: 5}}>
                                    <div className={classnames(styles['add-column'])} style={{marginRight: 2}}>
                                        <Icon type='icon-ants-add' />
                                    </div>
                                    <div className={classnames(styles['add-column'])}>
                                        <Icon type='icon-ants-trash' />
                                    </div>
                                </div>
                            </div>
                        );
                    }
                    case typeComponent.DELETE_BUTTON: {
                        const onClickDelete = () => {
                            if (typeof itemIndex === 'number') {
                                const newContent = produce(content, draft => {
                                    draft.values.menu.items.splice(itemIndex, 1);
                                });

                                dispatchStore({
                                    type: actionType.UPDATE_CONTENT,
                                    payload: {
                                        id: contentId,
                                        values: newContent
                                    }
                                });
                            }
                        };

                        return (
                            <div style={{display: 'flex', justifyContent: 'flex-end', padding: '0 6px 0 0'}}>
                                <span style={{cursor: 'pointer'}} onClick={onClickDelete}>
                                    <Icon type='icon-ants-trash' style={{color: '#ccc'}} />
                                </span>
                            </div>
                        );
                    }
                    case typeComponent.ADD_MENU: {
                        const onClickAddMenu = () => {
                            const newContent = produce(content, draft => {
                                draft.values.menu.items.push({
                                    key: random(13),
                                    actionType: 'openWebsite',
                                    link: {
                                        name: 'web',
                                        values: {
                                            href: '',
                                            target: '_self'
                                        }
                                    },
                                    text: 'PAGE'
                                });
                            });

                            dispatchStore({
                                type: actionType.UPDATE_CONTENT,
                                payload: {
                                    id: contentId,
                                    values: newContent
                                }
                            });
                        };

                        return (
                            <div className={classnames(styles['add-menu'])} onClick={onClickAddMenu}>
                                <Icon type='icon-ants-add' style={{color: '#ccc'}} />
                            </div>
                        );
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

    const renderComponent = (elements, id, numberOfMenu = 0, itemIndex = 0) => {
        try {
            if (elements && elements.length) {
                return elements.map(item => {
                    return (
                        <div 
                            key={item.id} 
                            className={classnames(styles[`${item.className}`], `mb-15 ${item.className}`)} 
                            style={{
                                marginBottom: activeElement.includes('menu') && item.keyShow && item.keyShow !== menuItems[itemIndex].actionType ? 0 : 15, 
                                ...getObjectPropSafely(() => item.style.styleParent)
                            }}
                        >
                            {switchCaseComponent(item, id, numberOfMenu, itemIndex)}
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
                let newConfig = config;

                if (activeElement.includes('menu')) {
                    for (let i = 0; i < menuItems.length; i++) {
                        if (menuItems.length) {
                            newConfig = produce(newConfig, draft => {
                                draft.splice(i + 1, 0, {
                                    ...draft[0],
                                    id: `menu${i}`,
                                    elements: draft[0].elements.map((elem, index) => ({
                                        ...draft[0].elements[index],
                                        id: `${draft[0].elements[index].id}${i}`
                                    })),
                                    itemIndex: i
                                });
                            });
                        }
                    }

                    newConfig = produce(newConfig, draft => {
                        if (newConfig.length > 1) {
                            draft.splice(0, 1);
                        }
                    });
                }
                return newConfig.map(item => {
                    return (
                        <div key={item.id}>
                            <div className="section" style={{...item.style}}>
                                <div className={classnames(styles['section-label'])}>{translate(item.label, item.label)}</div>
                                <div className='section-container pl-15 mb-15' style={{display: 'flex', flexWrap: 'wrap', marginLeft: 10, justifyContent: 'space-between'}}>
                                    {renderComponent(item.elements, item.id, menuItems.length, item.itemIndex)}
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
