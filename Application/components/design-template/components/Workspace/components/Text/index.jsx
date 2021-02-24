import React from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Text/styles.module.scss';

const Text = (props) => {
    const {data} = props; 
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => data.values._meta.htmlClassNames);
    const style = {
        padding: getObjectPropSafely(() => data.values.containerPadding)
    };
    const styleExtra = {
        textAlign: getObjectPropSafely(() => data.values.textAlign),
        lineHeight: getObjectPropSafely(() => data.values.lineHeight),
        color: getObjectPropSafely(() => data.values.color), 
        overflowWrap: 'break-word'
    };
    const text = getObjectPropSafely(() => data.values.text);

    return (
        <div
            id={id}
            className={styles[classTitle]}
            style={style}
        >
            <div 
                className="editable" 
                style={styleExtra}
                dangerouslySetInnerHTML={{
                    __html: text
                }}
            />
        </div>
    );
};

export default Text;