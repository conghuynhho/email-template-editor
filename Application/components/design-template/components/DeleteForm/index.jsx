import React, {useContext} from 'react';
import styles from './styles.module.scss';
import classnames from 'classnames';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {actionType} from 'Components/design-template/components/ContextStore/constants';

const DeleteForm = () => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {toggleDeleteForm = {type: '', isDeleteFormOpening: false, id: '', rowID: ''}} = store;
    const onClickCancel = () => {
        dispatchStore({
            type: actionType.TOGGLE_DELETE_FORM,
            payload: {
                toggleDeleteForm: {
                    isDeleteFormOpening: false,
                    type: '',
                    id: '',
                    rowID: ''
                }
            }
        });
    };

    const onClickDelete = () => {
        dispatchStore({
            type: actionType.CONFIRM_DELETE,
            payload: {
                confirmDelete: {
                    type: toggleDeleteForm.type,
                    willBeDelete: true,
                    id: toggleDeleteForm.id, 
                    rowID: toggleDeleteForm.rowID
                }
            }
        });
    };

    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-form']}>

                <div className={styles['form-body']}>
                    <div className={styles['form-header']}>Delete</div>
                    <div className={styles['form-content']}>
                        <p>Are you sure you want to delete this? This action cannot be undone.</p>
                    </div>
                    <div className={styles['form-footer']}>
                        <button 
                            type="button" 
                            className={classnames(styles['btn'], styles['btn-light'])}
                            onClick={onClickCancel}
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            className={classnames(styles['btn'], styles['btn-danger'])}
                            onClick={onClickDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteForm;