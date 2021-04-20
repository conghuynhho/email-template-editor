import {StoreContext} from 'Components/design-template/components/ContextStore';
import classnames from 'classnames';
import styles from 'Components/design-template/components/PreviewModal/styles.module.scss';
import 'Components/design-template/components/PreviewModal/styles.module.scss';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import React, {useContext} from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {exportHTML} from 'Components/design-template/components/SidePanel/utils.js';
import {hierarchyDesignData} from 'Components/design-template/components/Workspace/utils';
// import file from 'Component/design-template/components/PreviewModal/review.html';

const PreviewModal = () => {
    const {state : store, dispatch: dispatchStore} = useContext(StoreContext);
    const {isOpenPreview} = store;
    const toggle = ()=>{
        dispatchStore({
            type: actionType.UPDATE_MODE,
            payload: {isOpenPreview : !isOpenPreview}
        });
    };

    const renderHTML = (store) => {
        const nestedData = hierarchyDesignData(store);
        const htmlString = exportHTML(nestedData);

        return htmlString;
    };
    const html = isOpenPreview ? renderHTML(store) : '';

    return (
        <div>
            <Modal isOpen={isOpenPreview} toggle={toggle} style={{maxWidth: '1550px', maxHeight: ''}} className={classnames(styles['preview-modal-style'])}>
                <ModalHeader toggle={toggle}><strong>Preview</strong></ModalHeader>
                <ModalBody>
                    <div id="html-container" className={classnames(styles['html-content-style'])} >
                        <div className={classnames(styles['desktop-status-bar'])} />
                        <iframe className={classnames(styles['html-iframe'])} srcDoc={html} title="Unlayer Preview (Desktop)"  />
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default PreviewModal;