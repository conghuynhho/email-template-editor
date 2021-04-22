import {StoreContext} from 'Components/design-template/components/ContextStore';
import classnames from 'classnames';
import styles from 'Components/design-template/components/PreviewModal/styles.module.scss';
import 'Components/design-template/components/PreviewModal/styles.module.scss';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import React, {useContext, useState} from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {exportHTML} from 'Components/design-template/components/SidePanel/utils.js';
import {hierarchyDesignData} from 'Components/design-template/components/Workspace/utils';
import {previewModeConstants} from 'Components/design-template/components/PreviewModal/constants.js';
// import file from 'Component/design-template/components/PreviewModal/review.html';

const PreviewModal = () => {
    const {state : store, dispatch: dispatchStore} = useContext(StoreContext);
    const [previewMode, setPreviewMode] = useState(previewModeConstants.PREVIEW_DESKTOP);

    const {isOpenPreview} = store;
    const toggle = ()=>{
        dispatchStore({
            type: actionType.UPDATE_MODE,
            payload: {isOpenPreview : !isOpenPreview}
        });
    };
    const updateIsDesktop = (isDesktopState) => {
        if (isDesktopState === previewMode) {return }
        setPreviewMode(isDesktopState);
    };
    const renderHTML = (store) => {
        const nestedData = hierarchyDesignData(store);
        const htmlString = exportHTML(nestedData);

        return htmlString;
    };
    const html = isOpenPreview ? renderHTML(store) : '';

    return (
        <div>
            <Modal isOpen={isOpenPreview} keyboard={true} toggle={toggle} style={{maxWidth: '1550px', maxHeight: ''}} className={classnames(styles['preview-modal-style'])}>
                <ModalHeader toggle={toggle} cssModule={{'modal-title' : 'w-100'}}>
                    <div className={classnames(styles['preview-header'])}>
                        <strong className={classnames(styles['preview-title'])}>Preview</strong>
                        <div className={classnames(styles['preview-button-group'])}>
                            <div className={classnames(styles['preview-desktop'],{[styles['active']] : previewMode === previewModeConstants.PREVIEW_DESKTOP})} onClick={()=>updateIsDesktop(previewModeConstants.PREVIEW_DESKTOP)}>Desktop</div>
                            <div className={classnames(styles['preview-mobile'], {[styles['active']] : previewMode === previewModeConstants.PREVIEW_MOBILE})} onClick={()=>updateIsDesktop(previewModeConstants.PREVIEW_MOBILE)}>Mobile</div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody >
                    <div className={classnames([styles['html-content-styles']])}>
                        {previewMode === previewModeConstants.PREVIEW_DESKTOP && (
                            <div className={classnames(styles['desktop-preview-content-wrapper'])}>
                                <div className={classnames(styles['desktop-status-bar'])} />
                                <iframe className={classnames(styles['html-iframe'])} srcDoc={html} title="Unlayer Preview (Desktop)"  />
                            </div>
                        )} 
                        {previewMode === previewModeConstants.PREVIEW_MOBILE && (
                            <div className={classnames(styles['mobile-preview-content-wrapper'])}>
                                {/* <div className={classnames(styles['mobile-layout'])} /> */}
                                <iframe className={classnames(styles['html-iframe'])} srcDoc={html} title="Unlayer Preview (Mobile)" />
                            </div>
                        )}           
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default PreviewModal;