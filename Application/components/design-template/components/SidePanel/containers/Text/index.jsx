// Libraries
import React from 'react';
import classnames from 'classnames';

// Utils
import Style from 'Components/design-template/components/SidePanel/Style';
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import {values} from 'lodash';
import {getPaddingChild} from '../../utils';

const Text = props => {
    const {
        config = {},
        content,
        translate = (lal) => lal
    } = props;

    const elements = (getObjectPropSafely(() => config.resource.style[0].elements));
    let style = '';

    elements.forEach((value) => {
        style = value.id;
        switch (style) {
            case 'textColor':
                value.defaultValue = getObjectPropSafely(() => content.values.color);
                break;
            case 'lineHeight': 
                value.defaultValue = getObjectPropSafely(() => content.values[style]).replace('%','');
                break;
            case 'textContainerPaddingLabel': 
                value.defaultValue = getObjectPropSafely(() => content.values.containerPadding);
                {break}
            case 'moreOptionsPaddingText':
                const paddingText = getObjectPropSafely(() => content.values.containerPadding).split(' ');

                value.defaultValue = (paddingText.length > 1 ? true : false);
                break;
            case 'childTextPadding':
                const padding = getPaddingChild(getObjectPropSafely(() => content.values.containerPadding).replace(/px/g,'').split(' '));

                value.elementChild.forEach((index) => {
                    switch (index.id) {
                        case 'top':
                            index.defaultValue = padding.top;
                            break;
                        case 'bottom':
                            index.defaultValue = padding.bottom;
                            break;
                        case 'right':
                            index.defaultValue = padding.right;
                            break;
                        default:
                            index.defaultValue = padding.left;
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