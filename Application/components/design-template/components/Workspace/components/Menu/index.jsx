import React from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Menu/styles.module.scss';
import {Icon} from '@antscorp/components';

const Menu = (props) => {
    const {data} = props; 
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => data.values._meta.htmlClassNames);
    const style = {
        padding: getObjectPropSafely(() => data.values.containerPadding)
    };
    const styleExtra = {
        textAlign: getObjectPropSafely(() => data.values.align)
    };

    const renderMenu = () => {
        const menus = getObjectPropSafely(() => data.values.menu.items) || [];

        return menus.length ? menus.map((menu, index) => {
            const href = getObjectPropSafely(() => menu.link.values.href);
            const target = getObjectPropSafely(() => menu.link.values.target);
            const text = getObjectPropSafely(() => menu.text);
            const styleAnchor = {
                padding: getObjectPropSafely(() => data.values.padding), 
                fontSize: getObjectPropSafely(() => data.values.fontSize), 
                fontFamily: getObjectPropSafely(() => data.values.fontFamily.value), 
                color: getObjectPropSafely(() => data.values.textColor), 
                display: getObjectPropSafely(() => data.values.layout) === 'horizontal' ? 'inline-block' : 'block', 
                textDecoration: 'none',
                opacity: (data.values.hideDesktop) ? '0.25' : '1'
            };

            return (
                <a
                    href={href}
                    target={target}
                    key={index}
                    className={'v-padding v-font-size v-layout-display'}
                    style={styleAnchor}
                >
                    {text}
                </a>
            );
        }) : (
            <div style={{color: '#ccc'}}>
                <Icon type='icon-ants-bars' style={{color: '#ccc'}} />
                <div>Menu</div>
            </div>
        );
    };

    return (
        <div
            id={id}
            className={styles[classTitle]}
            style={style}
        >
            <div 
                style={styleExtra}
            >
                {renderMenu()}
            </div>
        </div>
    );
};

export default Menu;