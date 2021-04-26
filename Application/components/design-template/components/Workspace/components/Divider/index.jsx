import React from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Divider/styles.module.scss';

const Divider = (props) => {
    const {data} = props; 
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => data.values._meta.htmlClassNames);
    const style = {
        padding: getObjectPropSafely(() => data.values.containerPadding),
        opacity: (data.values.hideDesktop) ? '0.25' : '1'
    };
    const styleExtra = {
        textAlign: getObjectPropSafely(() => data.values.textAlign),
        lineHeight: '0px'

    };
    const styleInner = {
        borderTop: `
            ${getObjectPropSafely(() => data.values.border.borderTopWidth)}
            ${getObjectPropSafely(() => data.values.border.borderTopColor)}
            ${getObjectPropSafely(() => data.values.border.borderTopStyle)}
        `,
        width: getObjectPropSafely(() => data.values.width),
        display: 'inline-block',
        height: '0px',
        lineHeight: getObjectPropSafely(() => data.values.border.borderTopWidth),
        verticalAlign: 'middle'
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
                <div style={styleInner} />
            </div>
        </div>
    );
};

export default Divider;