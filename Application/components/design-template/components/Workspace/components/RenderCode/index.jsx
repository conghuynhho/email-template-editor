import React from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/RenderCode/styles.module.scss';

const RenderCode = (props) => {
    const {data} = props; 
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => data.values._meta.htmlClassNames);
    const style = {
        padding: getObjectPropSafely(() => data.values.containerPadding)
    };
    const html = getObjectPropSafely(() => data.values.html);

    return (
        <div
            id={id}
            className={styles[classTitle]}
            style={style}
        >
            <div 
                dangerouslySetInnerHTML={{
                    __html: html
                }}
            />
        </div>
    );
};

export default RenderCode;