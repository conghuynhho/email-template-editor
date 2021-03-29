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

    console.log('config',config.resource);
    console.log('element', element);
    const elements = (getObjectPropSafely(() => config.resource.style[0].elements));
    let style = '';

    elements.forEach((value) => {
        style = value.id;
        switch (style) {
            case 'lineHeight': 
                value.defaultValue = getObjectPropSafely(() => element[style]).replace('%','');
                break;
            case 'containerPadding': 
                value.defaultValue = getObjectPropSafely(() => element[style]).replace(/px/g,'');
                // if (value.defaultValue.length === 2)
                //     break;
                // case 'moreOptionsPaddingText':
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