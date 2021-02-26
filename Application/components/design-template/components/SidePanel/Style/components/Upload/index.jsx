// Libraries
import React, {useRef} from 'react';
import classnames from 'classnames';

// Components
import {Icon} from '@antscorp/components';

// Styles
import styles from './styles.module.scss';

// Utils
// import {handleError} from 'Src/handleError';

const PATH = 'Components/Upload';

const Upload = props => {
    const inputRef = useRef();

    const {
        messageError = '',
        isShowError = false,
        isShowMessage = false,
        labelButton = 'Upload file',
        fileName = '',
        callback,
        extensions,
        maxFileSize,
        translate
    } = props;

    const handleUploadFile = (event) => {
        try {
            const files = event.target.files || event.dataTransfer.files;

            if (files && files[0]) {
                const file = files[0];

                // clear file input
                if (inputRef.current) {
                    inputRef.current.value = null;
                }

                if (typeof callback === 'function') {
                    const [isExtensionValid, isFileSizeValid] = validateFile(file);

                    callback({file, isExtensionValid, isFileSizeValid});
                }
            }
        } catch (error) {
            // handleError(error, {
            //     path: PATH,
            //     action: 'handleUploadFile',
            //     args: {
            //         event
            //     }
            // });
        }
    };

    const validateFile = (file) => {
        try {
            const fileExtension = file.name.split('.').pop();

            const isFileSizeValid = maxFileSize ? file.size < maxFileSize * 1024 * 1024 : true; // in MB

            const isExtensionValid = extensions.length ? extensions.includes(fileExtension) : true;

            return [isExtensionValid, isFileSizeValid];
        } catch (e) {
            // handleError(e, {
            //     component: PATH,
            //     action: 'validateFile',
            //     args: {
            //         file
            //     }
            // });
        }
    };

    return (
        <div>
            <div className={classnames(styles['upload-success'])}>
                <Icon type="icon-ants-upload-cloud" style={{fontSize: 18, marginBottom: 7}} />
                <div className={classnames(styles['upload-text'])}>{translate('Drag & Drop file here')}</div>
                <label className={classnames(styles['btn-upload'])}>{translate(labelButton)}</label>
                <input
                    ref={inputRef}
                    type="file"
                    id="fileInput"
                    name="fileInput"
                    style={{opacity: 0, position: 'absolute', zIndex: 3, cursor: 'pointer'}}
                    onChange={handleUploadFile}
                />
            </div>
            <div className={classnames(styles['link-upload'])}>{fileName}</div>
            {
                isShowMessage ? (
                    <div>
                        <span style={{fontSize: 12}}>{translate('File type')}: </span>
                        <span style={{fontSize: 12}}>.jpg, .gif, .png</span>
                        <span style={{fontSize: 12}}>and under 3MB.</span>
                    </div>
                ) : null
            }
            {
                isShowError ? (
                    <div style={{display: 'block'}}>
                        <div style={{color: '#f44336', fontWeight: 500, fontFamily: 'Roboto', marginTop: 7}}>
                            {translate(messageError)}
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
};

export default Upload;