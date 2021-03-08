import React, {useState} from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Button/styles.module.scss';
import {Editor} from '@tinymce/tinymce-react';

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

    const [isEditing, setIsEditing] = useState(false);

    const onClickButton = (e) => {
        e.stopPropagation();
        setIsEditing(!isEditing);
    };

    return (
        <div
            id={id}
            className={styles[classTitle]}
            style={style}
        >
            <div 
                className="v-text-align" 
                style={styleExtra}
                onClick={onClickButton}
            >
                {isEditing ? (

                    <Editor
                        id={`tiny-${id}`}
                        initialValue={text}
                        tagName='span'
                        inline={true}
                        init={{
                            menubar: false,
                            auto_focus: isEditing && id === 'u_content_button_1' ? `tiny-${id}` : '',
                            content_style: `#tiny-${id} {
                            text-align: ${styleInner.textAlign};
                            padding: ${styleInner.padding};
                            background-color: ${styleInner.backgroundColor};
                            border-radius: ${styleInner.borderRadius};
                            color: ${styleInner.color};
                            display: ${styleInner.display};
                            line-height: ${styleInner.lineHeight};
                            max-width: ${styleInner.maxWidth};
                            text-decoration: ${styleInner.textDecoration};
                            width: ${styleInner.width};
                            word-wrap: ${styleInner.wordWrap};
                        }`
                        }}
                    />
                ) : (
                    <a
                        href={href}
                        target={target}
                        className={'v-size-width v-line-height v-padding v-button-colors v-border v-border-radius'}
                        style={styleInner}
                        dangerouslySetInnerHTML={{
                            __html: text
                        }}
                    />
                )}

            </div>

            {/* <div 
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
            </div> */}
        </div>
    );
};

export default Button;