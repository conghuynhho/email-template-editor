// Libraries
import React, {useEffect, useState, useContext} from 'react';
import classnames from 'classnames';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

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

const PATH = 'Components/design-template/components/SidePanel/Style/index.jsx';

const Style = props => {
    const {
        style = [],
        content = {},
        translate = (lal) => lal
    } = props;
    const [config, setConfig] = useState({});
    const {state, dispatch} = useContext(StoreContext);

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

    const updateComponent = (idParent, idChild, values) => {
        try {
            if (idChild) {
                dispatch({
                    type: actionType.UPDATE_CONTENT,
                    payload: {
                        id: getObjectPropSafely(() => content.location.id),
                        keyParent: idParent,
                        key: idChild,
                        values
                    }
                });
            }
        } catch (error) {
            //
        }
    };

    const updateComponentChild = (key, idChild, value) => {
        console.log('🚀 ~ file: index.jsx ~ line 89 ~ updateComponentChild ~ key', key, idChild, value, getObjectPropSafely(() => eval(`content.values.${key}`) || ''));
        try {
            const valueStore = getObjectPropSafely(() => eval(`content.values.${key}`) || '');

            console.log('🚀 ~ file: index.jsx ~ line 92 ~ updateComponentChild ~ valueStore', valueStore);

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

                const value = getObjectPropSafely(() => eval(`content.values.${idParent && (idParent + '.' || '')}${type ? key : idChild}`) || '');
                
                const valueStyle = typeof value === 'boolean' ? value : value.replace(new RegExp(`${unit}`,'gi'), '');

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
                        return (
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
                                onSelectOption={(option) => updateComponent(idParent, idChild, option.name || '')}
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
                                            >
                                                <div className={classnames(styles['list-component-item-icon'])} >
                                                    <Icon type={item.icon} style={{color: '#ccc', fontSize: '16px'}} />
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
                                                                        {(provided, snapshot) => {
                                                                            return (
                                                                                <div 
                                                                                    className={classnames('col-6', styles['list-component-item'])} 
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    style={{...provided.draggableProps.style, transform: 'none'}}                                        
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
