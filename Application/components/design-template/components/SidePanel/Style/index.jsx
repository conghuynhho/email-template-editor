// Libraries
import React, {useEffect, useState} from 'react';
import classnames from 'classnames';

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
    Switch
} from '@antscorp/components';
import Alignment from 'Components/design-template/components/SidePanel/Style/components/Alignment';
import Upload from 'Components/design-template/components/SidePanel/Style/components/Upload';

// Assets
import {getObjectPropSafely} from 'Utils/index.ts';
import {typeComponent} from 'Components/design-template/constants';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';

const PATH = 'Components/design-template/components/SidePanel/Style/index.jsx';

const Style = props => {
    const {
        style = [],
        translate = (lal) => lal
    } = props;
    const [config, setConfig] = useState({});

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

    const updateComponent = (idParent, idChild, value) => {
        try {
            // if (idChild && idParent) {
            //     if (typeof props.updateComponent === 'function') {
            //         props.updateComponent({
            //             id: props.id,
            //             style: {
            //                 ...props.style,
            //                 [idParent]: {
            //                     ...props.style[idParent],
            //                     [idChild]: value
            //                 }
            //             }
            //         });
            //     }
            // }
        } catch (error) {
            //
        }
    };

    const switchCaseComponent = (element, idParent) => {
        try {
            if (element && Object.values(element).length) {
                const {
                    options = [],
                    label = '',
                    tooltip = '',
                    defaultValue,
                    id: idChild = '',
                    style = {},
                    message = '',
                    unit = '',
                    isShowUnit = false,
                    isShowMessage = false,
                    isShowIcon = false,
                    elementChild = [],
                    keyShow = '',
                    isShowMessageLeft = false,
                    isShowMessageRight = false
                } = element;
                const valueStyle = '';
                // const valueStyle = getObjectPropSafely(() => props.style[idParent][idChild]) || '';

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
                                // selectColor={(color) => updateComponent(idParent, idChild, color)}
                                color={defaultValue}
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
                            const type = getObjectPropSafely(() => props.style[idParent][keyShow]);

                            isShow = type === 'imageUrl' ? true : false;
                        }

                        return isShow ? (
                            <>
                                <TextInput
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

    const renderComponent = (elements, id) => {
        try {
            if (elements && elements.length) {
                return elements.map(item => {
                    return (
                        <div key={item.id} className='mb-15' style={{...getObjectPropSafely(() => item.style.styleParent), marginBottom: 15}}>
                            {switchCaseComponent(item, id)}
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
                            <div className="section">
                                <div className={classnames(styles['section-label'])}>{translate(item.label, item.label)}</div>
                                <div className='section-container pl-15 mb-15' style={{display: 'flex', flexWrap: 'wrap', marginLeft: 10}}>
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
