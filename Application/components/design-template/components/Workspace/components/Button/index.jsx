import React, {useContext} from 'react';
import styles from 'Components/design-template/components/Workspace/components/Button/styles.module.scss';
import {Editor} from '@tinymce/tinymce-react';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {getObjectPropSafely} from 'Utils';
import {getContentIDFromHTMLID} from 'Components/design-template/components/Workspace/utils';

const Button = (props) => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {isEditing = false, activeElement} = store;
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
    const target = getObjectPropSafely(() => data.values.href.values.target);
    const handleEditorChange = (content) => {
        const contentID = getContentIDFromHTMLID(store,id);
        const payload = {
            id: contentID,
            values: content
        }
;

        if (contentID) {
            dispatchStore({
                type: actionType.UPDATE_CONTENT,
                payload: {...payload}
            });
        }

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
                
            >
                {isEditing && activeElement === id ? (

                    <Editor
                        apiKey={'pj3be4r7csm282qh8gsssq1cywkvjh2j7iic281901rof8aw'}
                        id={`tiny-${id}`}
                        initialValue={text}
                        tagName='span'
                        inline={true}
                        init={{
                            menubar: false,
                            toolbar: 'fontselect fontsizeselect | bold italic underline strikethrough',
                            auto_focus: isEditing && activeElement === id ? `tiny-${id}` : '',
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
                        onChange={handleEditorChange}
                    />
                ) : (
                    <a
                        target={target}
                        className={'v-size-width v-line-height v-padding v-button-colors v-border v-border-radius'}
                        style={styleInner}
                        dangerouslySetInnerHTML={{
                            __html: text
                        }}
                    />
                )}

            </div>
        </div>
    );
};

export default Button;