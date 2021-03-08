import React, {useEffect} from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Text/styles.module.scss';
import {Editor, tinyMCE} from '@tinymce/tinymce-react';
import './styles.scss';

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

    const handleEditorChange = (content, editor) => {
        console.log('Content was updated:', content, editor);
    };
    
    return (<>
        <div
            id={id}
            className={styles[classTitle]}
            style={style}
        >           
            {/* <div 
                className="editable" 
                style={styleExtra}
                dangerouslySetInnerHTML={{
                    __html: text
                }}
                // onClick={onClickText}
            /> */}
            {/* <div className="editable"> */}
            <Editor
                apiKey={'pj3be4r7csm282qh8gsssq1cywkvjh2j7iic281901rof8aw'}
                initialValue={text}
                id={`tiny-${id}`}
                cloudChannel='5-stable'
                inline={true}
                onEditorChange={handleEditorChange}
                init={{
                    auto_focus: `tiny-${id}` === 'tiny-u_content_text_' ? 'tiny-u_content_text_1' : '',
                    menubar: false,
                    branding: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen emoticons textcolor',
                        'insertdatetime media paste code help wordcount directionality'
                    ],
                    toolbar_mode: 'sliding',
                    toolbar1:
                            'fontselect fontsizeselect | bold italic underline strikethrough superscript subscript | emoticons ',
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
        </div>
    </>);
};

export default Text;

