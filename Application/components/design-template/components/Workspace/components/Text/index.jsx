import React, {useContext, useState, useEffect} from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Text/styles.module.scss';
import {Editor} from '@tinymce/tinymce-react';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import './styles.scss';

const Text = (props) => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {isEditing = false, activeElement} = store;
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

    const handleEditorChange = (content, editor) => {
        const newContent = {};

        newContent.id = store.columns[store.draggingColumnId].contents[store.draggingContentIndex];
        newContent.values = content;
        dispatchStore({
            type: actionType.UPDATE_CONTENT,
            payload: newContent

        });
    };
    
    return (<>
        <div
            id={id}
            className={styles[classTitle]}
            style={style}
        >           
            
            {isEditing && activeElement === id ? (
                <Editor
                    apiKey={'pj3be4r7csm282qh8gsssq1cywkvjh2j7iic281901rof8aw'}
                    initialValue={text}
                    id={`tiny-${id}`}
                    cloudChannel='5-stable'
                    inline={true}
                    onEditorChange={handleEditorChange}
                    init={{
                        auto_focus: isEditing && activeElement === id ? isEditing : false,
                        menubar: false,
                        branding: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen emoticons textcolor',
                            'insertdatetime media paste code help wordcount directionality'
                        ],
                        toolbar1: 'fontselect fontsizeselect | bold italic underline strikethrough superscript subscript | emoticons ',
                        toolbar2: 'alignleft aligncenter alignright | bullist numlist | forecolor backcolor | ltr rtl | link unlink',
                        fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 32px 34px 36px 38px 40px 44px 48px 72px',
                        content_style: `#tiny-${id} {
                            text-align: ${styleExtra.textAlign}; 
                            line-height: ${styleExtra.lineHeight};
                            color: ${styleExtra.color};
                            overflow-wrap: ${styleExtra.overflowWrap};
                        }`
                    }}
                />   

            ) : (<div 
                className="editable" 
                style={styleExtra}
                dangerouslySetInnerHTML={{
                    __html: text
                }}
            />)}
        </div>
    </>);
};

export default Text;