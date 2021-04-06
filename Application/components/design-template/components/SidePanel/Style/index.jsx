// Libraries
import React, {useEffect, useState, useContext} from 'react';
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
import {random} from 'Utils/index.ts';
import {getContentIDFromHtmlID} from '../../Workspace/utils';
import produce from 'immer';

// utils
import {
    getRowIDFromHtmlID
} from 'Components/design-template/components/Workspace/utils';

const PATH = 'Components/design-template/components/SidePanel/Style/index.jsx';

const Style = props => {
    const {
        style = [],
        values = {},
        content = [],
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

    const columnId = getObjectPropSafely(() => row.columns[activeColumn]);
    const columnValues = getObjectPropSafely(() =>store.columns[columnId].values);

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

    console.log('values', values);
    const updateComponent = (idParent, idChild, values, font) => {
        const id = getContentIDFromHtmlID(store, activeElement);
        const value = store.contents[id].values;

        // console.log('child', idChild);
        // console.log('values', values);
        // console.log('value edit', value);
        values = {
            values: produce(value, draft => {
                switch (idChild) {
                    // Text
                    case 'textColor':
                        draft.color ? draft.color = values : draft.textColor = values;
                        break;
                    case 'lineStyle':
                        draft.linkStyle.inherit = values;
                        break;
                    case 'moreOptionsPaddingText':
                        break;
                    case 'responsive':
                        break;
                    // Line
                    case 'borderTopStyle':
                        draft.border.borderTopStyle = values;
                        break;
                    case 'borderTopWidth':
                        draft.border.borderTopWidth = values;
                        break;
                    case 'borderTopColor':
                        draft.border.borderTopColor = values;
                        break;
                    // Menu
                    case 'textColorMenu':
                        draft.textColor = values;
                        break;
                        // Menu + Button
                    case 'textColorButton':
                        (draft.linkColor) ? draft.linkColor = values : draft.buttonColors.color = values;
                        break;
                        // chưa biết url, value trong fontFamily
                    case 'fontFamily':
                        console.log('option', font);
                        draft.fontFamily.label = values;
                        draft.fontFamily.url = font.url;
                        draft.fontFamily.value = font.name;
                        break;
                    case 'layout':
                        draft.layout = (values == 1 ? 'vertical' : 'horizontal');
                        break;
                        // Menu + Button
                    case 'alignments':
                        (draft.align) ? draft.align = values : draft.textAlign = values;
                        break;
                    // Button
                    case 'backgroundColorButton':
                        draft.buttonColors.backgroundColor = values;
                        break;
                    // textAlign, width(Line), fontSize(Menu)
                    default: 
                        draft[idChild] = values;
                }
            })
        };
        
        try {
            if (idChild) {
                dispatchStore({
                    type: actionType.UPDATE_CONTENT,
                    payload: {
                        id: id,
                        // keyParent: idParent,
                        // key: idChild,
                        values
                    }
                });
            }
        } catch (error) {
            //
        }
    };

    const updateComponentChild = (key, idChild, value) => {
        try {
            const valueStore = getObjectPropSafely(() => eval(`content.values.${key}`) || '');

            // if (idChild) {
            //     switch (idChild) {
            //         case 'top': {

            //         }
            //         case 'right': {

            //         }
            //         case 'bottom': {

            //         }
            //         case 'left': {

            //         }
            //     }
            // }
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
                    isShowMessageRight = false
                } = element;

                const value = getObjectPropSafely(() => eval(`values.${idParent && (idParent + '.' || '')}${type ? key : idChild}`) || '');

                // console.log((idParent + '.' || '') + (type ? key : idChild));
                // console.log('hello', value);

                const valueStyle = typeof value === 'boolean' ? value : (typeof value === 'object' ? value.label : value.replace(new RegExp(`${unit}`,'gi'), ''));

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
                        let layout;

                        switch (valueStyle) {
                            case 'horizontal':
                                layout = 2;
                                break;
                            case 'vertical':
                                layout = 1;
                                break;
                            default:
                                layout = valueStyle;
                        }
                        return (
                            <SelectSingle
                                style={{
                                    toggle: {minWidth: 70, width: 290, fontSize: 12, ...getObjectPropSafely(() => style.styleChild)},
                                    menu: {minWidth: 70, width: 290, maxHeight: 150, overflowX: 'auto', ...getObjectPropSafely(() => style.styleChild)}
                                }}
                                sources={options}
                                label={label || null}
                                tooltipName={label || tooltip}
                                default={findValue(layout || defaultValue, options)}
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '')}
                                translate={translate}
                            />
                        );
                    }
                    case typeComponent.SELECT_RADIO: {
                        return (
                            <SelectRadio
                                styleLabel={{height: 10}}
                                defaultName={defaultValue}
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
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name, option || '')}
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
                            const isValid = getObjectPropSafely(() => content.values[keyShow]);

                            isShow = typeof isValid === 'boolean' ? !isValid : true;
                        }

                        const handleOnChange = (value) => {
                            try {
                                if (type === typeComponent.COMPONENT_CHILD) {
                                    updateComponentChild(key, idChild, `${value}${unit || ''}`, valueStyle);
                                } else {
                                    updateComponent(idParent, idChild, `${value}${unit || ''}`);
                                }
                            } catch (error) {
                                //
                            }
                        };

                        return isShow ? (
                            <>
                                <TextInput
                                    label={label || null}
                                    styleLabel={{height: 30}}
                                    style={getObjectPropSafely(() => style.styleChild) || {width: 100}}
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
                            const isValid = getObjectPropSafely(() => content.values[keyShow]);

                            isShow = typeof isValid === 'boolean' ? isValid : true;
                        }

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
                                                type: 'content',
                                                id: '',
                                                rowID: rowId,
                                                message: `You will lose ${listWidth.length - listBlockWidth.length} column. Are you sure?`
                                            }                                         
                                        }
                                    });
                                } else {
                                    console.log('add new columns');
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
                return elements.map(item => {
                    return (
                        <div key={`${item.id}${random(3)}`} className={classnames(styles[`${item.className}`], `mb-15 ${item.className}`)} style={{marginBottom: 15, ...getObjectPropSafely(() => item.style.styleParent)}}>
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

export default Style;