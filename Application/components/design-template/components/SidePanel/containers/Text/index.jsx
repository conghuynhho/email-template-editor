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
        element,
        translate = (lal) => lal
    } = props;

    const elements = (getObjectPropSafely(() => config.resource.style[0].elements));
    let style = '';
    let morePadding = false;

    elements.forEach((value) => {
        style = value.id;
        switch (style) {
            case 'lineHeight': 
                value.defaultValue = getObjectPropSafely(() => element[style]).replace('%','');
                break;
            case 'containerPadding': 
                value.defaultValue = getObjectPropSafely(() => element[style]).replace(/px/g,'');
                const padding = value.defaultValue.split(' ');

                switch (padding.length) {
                    case 1:
                        morePadding = false;
                        break;
                    case 2:
                        morePadding = true;
                        value.defaultValue = value.top = value.bottom = padding[0];
                        value.left = value.rigth = padding[1];
                        break;
                    case 3:
                        morePadding = true;
                        value.defaultValue = value.top = padding[0];
                        value.left = value.rigth = padding[1];
                        value.bottom = padding[2];
                        break;
                    default:
                        morePadding = true;
                        value.defaultValue = value.top = padding[0];
                        value.rigth = padding[1];
                        value.left = padding[2];
                        value.bottom = padding[3];
                }
                {break}
            case 'moreOptionsPaddingText':
                value.defaultValue = morePadding;
                break;
            default:
                value.defaultValue = getObjectPropSafely(() => element[style]);
            
        }
    });

    config.resource.style[0].elements[0].defaultValue = getObjectPropSafely(() => element.color);
    config.resource.style[1].elements[0].defaultValue = getObjectPropSafely(() => element.hideDesktop);

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