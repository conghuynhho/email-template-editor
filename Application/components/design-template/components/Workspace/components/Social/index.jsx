import React from 'react';
import {getObjectPropSafely} from 'Utils';
import {Icon} from '@antscorp/components';
import {index} from 'd3-array';

const Social = (props) => {
    const {data} = props; 
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const style = {
        padding: getObjectPropSafely(() => data.values.containerPadding)
    };
    const styleExtra = {
        textAlign: getObjectPropSafely(() => data.values.align)
    };

    const getIcon = (name, iconType) => {
        return `https://cdn.tools.unlayer.com/social/icons/${iconType}/${name.toLowerCase()}.png`;
    };

    const renderMenu = () => {
        const socials = getObjectPropSafely(() => data.values.icons.icons) || [];
        const iconType = getObjectPropSafely(() => data.values.icons.iconType);

        return socials.length ? socials.map((social, index) => {
            const href = getObjectPropSafely(() => social.url);
            const name = getObjectPropSafely(() => social.name);
            const styleAnchor = {
                display: 'inline-block',
                width: '32px',
                height: '32px',
                marginRight: ((socials.length - 1) !== index) ? Number(getObjectPropSafely(() => data.values.spacing)) : 0
            };

            return (
                <a
                    href={href}
                    key={index}
                    style={styleAnchor}
                >
                    <img 
                        alt={name} 
                        src={getIcon(name, iconType)}
                        style={{width: 32, height: 32}}
                    />
                </a>
            );
        }) : (
            <div key={index} style={{color: '#ccc'}}>
                <Icon type='icon-ants-bars' style={{color: '#ccc'}} />
                <div>Social</div>
            </div>
        );
    };

    return (
        <div
            id={id}
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

export default Social;