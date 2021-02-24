import React from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Image/styles.module.scss';

const Image = (props) => {
    const {data} = props; 
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => data.values._meta.htmlClassNames);
    const src = getObjectPropSafely(() => data.values.src.url);
    const style = {
        padding: getObjectPropSafely(() => data.values.containerPadding)
    };
    const styleExtra = {
        position: 'relative',
        textAlign: getObjectPropSafely(() => data.values.textAlign),
        lineHeight: '0px'

    };
    const styleInner = {
        width: '100%',
        maxWidth: getObjectPropSafely(() => data.values.src.width)
    };

    return (
        <div
            id={id}
            className={styles[classTitle]}
            style={style}
        >
            <div style={styleExtra}>
                <img 
                    alt="Image" 
                    className="v-src-width v-src-max-width" 
                    src={src} 
                    style={styleInner} 
                    title="Image"
                />
            </div>
        </div>
    );
};

export default Image;