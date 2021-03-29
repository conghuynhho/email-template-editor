// Libraries
import React from 'react';
import classnames from 'classnames';

// Utils
import Style from 'Components/design-template/components/SidePanel/Style';
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import {values} from 'lodash';

const Text = props => {
    const {
        config = {},
        content,
        translate = (lal) => lal
    } = props;

    const elements = (getObjectPropSafely(() => config.resource.style[0].elements));
    let style = '';
    let morePadding = false;
    let top, bottom, left, right;

    console.log('config', elements);
    console.log('content', content);

    elements.forEach((value) => {
        style = value.id;
        switch (style) {
            case 'lineHeight': 
                value.defaultValue = getObjectPropSafely(() => content.values[style]).replace('%','');
                break;
            case 'textContainerPaddingLabel': 
                value.defaultValue = getObjectPropSafely(() => content.values.containerPadding);
                const padding = value.defaultValue.replace(/px/g,'').split(' ');

                switch (padding.length) {
                    case 1:
                        morePadding = false;
                        top = bottom = left = right = padding[0];
                        break;
                    case 2:
                        morePadding = true;
                        top = bottom = padding[0];
                        left = right = padding[1];
                        break;
                    case 3:
                        morePadding = true;
                        top = padding[0];
                        left = right = padding[1];
                        bottom = padding[2];
                        break;
                    default:
                        morePadding = true;
                        top = padding[0];
                        right = padding[1];
                        left = padding[2];
                        bottom = padding[3];
                }
                {break}
            case 'moreOptionsPaddingText':
                value.defaultValue = morePadding;
                break;
            case 'childTextPadding':
                value.elementChild.forEach((index) => {
                    switch (index.id) {
                        case 'top':
                            index.defaultValue = top;
                            break;
                        case 'bottom':
                            index.defaultValue = bottom;
                            break;
                        case 'right':
                            index.defaultValue = right;
                            break;
                        default:
                            index.defaultValue = left;
                    }
                });
                break;
            case 'lineStyle':
                value.defaultValue = getObjectPropSafely(() => content.values.linkStyle.inherit);
                break;
            default:
                // textAlign
                value.defaultValue = getObjectPropSafely(() => content.values[style]);
        }
    });

    config.resource.style[0].elements[0].defaultValue = getObjectPropSafely(() => content.values.color);
    config.resource.style[1].elements[0].defaultValue = getObjectPropSafely(() => content.values.hideDesktop);

    const renderHtml = () => {
        try {
            const style = getObjectPropSafely(() => config.resource.style) || [];
            const general = getObjectPropSafely(() => config.resource.general) || [];

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

export default Text;