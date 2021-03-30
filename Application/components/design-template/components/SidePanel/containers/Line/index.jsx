// Libraries
import React from 'react';
import classnames from 'classnames';

// Utils
import Style from 'Components/design-template/components/SidePanel/Style';
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';

const Line = props => {
    const {
        config = {},
        content = {},
        translate = (lal) => lal
    } = props;

    config.resource.style[0].elements.forEach(element => {
        switch (element.id) {
            case 'lineStyle':
                element.defaultValue = (getObjectPropSafely(() => content.values.border.borderTopStyle));
                break;
            case 'inputBorderStyle':
                element.defaultValue = (getObjectPropSafely(() => content.values.border.borderTopWidth.replace('px','')));
                break;
            case 'colorLine':
                element.defaultValue = (getObjectPropSafely(() => content.values.border.borderTopColor));
                break;
            case 'lineWidth':
                element.defaultValue = (getObjectPropSafely(() => content.values.width.replace('%','')));
                break;
            case 'alignments':
                element.defaultValue = (getObjectPropSafely(() => content.values.textAlign));
                break;
            case 'lineContainerPaddingText':
                element.defaultValue = (getObjectPropSafely(() => content.values.containerPadding.replace(/px/g,'')));
                break;
            case 'moreOptionsPaddingLine':
                const padding = (getObjectPropSafely(() => content.values.containerPadding.replace(/px/g,'').split(' ')));

                element.defaultValue = (padding.length > 1 ? true : false);
                break;
            default:
                break;
        }
    });
    config.resource.style[1].elements[0].defaultValue = (getObjectPropSafely(() => content.values.hideDesktop));
    const renderHtml = () => {
        try {
            const style = getObjectPropSafely(() => config.resource.style) || [];
            const general = getObjectPropSafely(() => config.resource.general) || [];

            return (
                <div className={classnames(styles['block-full'])} style={{width: 'calc(100 % - 6px)'}}>
                    <div className={classnames(styles['section-label-title'])}>{translate(config.name, config.name)}</div>
                    <hr style={{marginTop: 5, marginBottom: 5}} />
                    <Style style={style} content={content} />
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

export default Line;