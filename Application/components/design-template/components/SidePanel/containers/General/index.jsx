// Libraries
import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

// Utils
import Style from 'Components/design-template/components/SidePanel/Style';
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import {getFontFamily, getUnitAndValue} from '../../../Workspace/utils';

const General = props => {
    const {
        config = {},
        translate = (lal) => lal,
        content = {}
    } = props;
    const mapGeneralDataToConfig = (data, configSample) => {
        // let style = [];
        const style = getObjectPropSafely(()=>configSample.resource.style);
        let general = {};
        let emailSetting  = {};
        let links = {};
        const getUnderLineStyle = (bool)=> {
            switch (bool) {
                case true:
                    return 'Underline';
                case false: 
                    return 'None';
                default:
                    return 'None';
            }
        };

        if (Array.isArray(style)) {
            style.forEach(sty => {
                switch (sty.id) {
                    case 'general':
                        const width = getUnitAndValue(getObjectPropSafely(()=>data.values.contentWidth));
                        const contentWidth = {
                            ...getObjectPropSafely(()=>sty.elements[0]),
                            ...width
                        };
                        const backgroundColor = {
                            ...getObjectPropSafely(()=>sty.elements[1]),
                            defaultValue: getObjectPropSafely(()=> data.values.backgroundColor)
                        };
                        const font = getFontFamily(getObjectPropSafely(()=>data.values.fontFamily.value));
                        const fontFamily = {
                            ...getObjectPropSafely(()=> sty.elements[2]),
                            defaultValue: font
                        };

                        general = {
                            ...sty,
                            elements: [contentWidth,backgroundColor,fontFamily
                            ]
                        };
                        break;
                    case 'emailSettings':
                        const preheaderText = {
                            ...getObjectPropSafely(()=>sty.elements[0]),
                            defaultValue: getObjectPropSafely(()=>data.values.preheaderText)
                        };

                        emailSetting = {
                            ...sty,
                            elements: [preheaderText]
                        };
                        break;
                    case 'links':
                        const fontColor = {
                            ...getObjectPropSafely(()=>sty.elements[0]),
                            defaultValue: getObjectPropSafely(()=>data.values.linkStyle.linkColor)
                        };
                        const underLineStyle = {
                            ...getObjectPropSafely(()=>sty.elements[1]),
                            defaultValue: getUnderLineStyle(getObjectPropSafely(()=>data.values.linkStyle.linkUnderLine))
                        };

                        links = {
                            ...sty,
                            elements: [fontColor,underLineStyle]
                        };
                        break;
                    default:
                        break;
                }
            });
            const saveData = {
                ...configSample,
                resource: {
                    ...getObjectPropSafely(configSample.resource),
                    style: [general,emailSetting,links]
                }
            };

            return saveData;
        }
        return configSample;
    };
    const convertedConfig = mapGeneralDataToConfig(content, config);
    const renderHtml = () => {
        try {
            const style = getObjectPropSafely(() => convertedConfig.resource.style) || [];
            const general = getObjectPropSafely(() => convertedConfig.resource.general) || [];

            return (
                <div className={classnames(styles['block-full'])} style={{width: 'calc(100 % - 6px)'}}>
                    <div className={classnames(styles['section-label-title'])}>{translate(config.name, config.name)}</div>
                    <hr style={{marginTop: 5, marginBottom: 5}} />
                    <Style style={style} />
                </div>
            );
        } catch (error) {
            //
        }
    };

    return (
        <>
            {renderHtml()}
        </>
    );
};

export default General;