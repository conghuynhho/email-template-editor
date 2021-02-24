import React from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Button/styles.module.scss';

const Button = (props) => {
    const {data} = props; 
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => data.values._meta.htmlClassNames);
    const style = {
        padding: getObjectPropSafely(() => data.values.containerPadding)
    };
    const styleExtra = {
        textAlign: getObjectPropSafely(() => data.values.textAlign)
    };
    const styleInner = {
        color: getObjectPropSafely(() => data.values.buttonColors.color),
        backgroundColor: getObjectPropSafely(() => data.values.buttonColors.backgroundColor),
        borderRadius: getObjectPropSafely(() => data.values.borderRadius),
        lineHeight: getObjectPropSafely(() => data.values.lineHeight),
        textAlign: getObjectPropSafely(() => data.values.textAlign),
        padding: getObjectPropSafely(() => data.values.padding),
        textDecoration: 'none',
        display: 'inline-block',
        width: 'auto',
        maxWidth: '100%',
        wordWrap: 'break-word'
    };
    const text = getObjectPropSafely(() => data.values.text);
    const href = getObjectPropSafely(() => data.values.href.values.href);
    const target = getObjectPropSafely(() => data.values.href.values.target);

    return (
        <div
            id={id}
            className={styles[classTitle]}
            style={style}
        >
            <div>
                <div 
                    className="v-text-align" 
                    style={styleExtra}
                >
                    <a
                        href={href}
                        target={target}
                        className={'v-size-width v-line-height v-padding v-button-colors v-border v-border-radius'}
                        style={styleInner}
                        dangerouslySetInnerHTML={{
                            __html: text
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Button;