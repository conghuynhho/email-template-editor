import React, {useContext} from 'react';
import {Icon} from '@antscorp/components';
import classnames from 'classnames';
import styles from 'Components/design-template/components/ShortcutBar/styles.module.scss';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {CONSTANTS} from 'Components/design-template/constants';
import {actionType} from 'Components/design-template/components/ContextStore/constants';

const ShortcutBar = () => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {viewMode, sidePanelMode, isOpenPreview} = store;

    const onClickPreview = () => {
        dispatchStore({
            type: actionType.UPDATE_MODE,
            payload: {isOpenPreview: !isOpenPreview}
        });
    };

    const onClickViewMode = (mode) => () => {
        if (!mode) {return false}

        dispatchStore({
            type: actionType.UPDATE_MODE,
            payload: {viewMode: mode}
        });
    };

    const onClickSidePanelMode = (mode) => () => {
        if (!mode) {return false}

        dispatchStore({
            type: actionType.UPDATE_MODE,
            payload: {sidePanelMode: mode}
        });
    };

    const renderShortcut = () => {
        return (
            <div className={classnames(
                styles['shortcut-bar'],
                {[styles['on-right']] : sidePanelMode === CONSTANTS.SIDE_PANEL_MODE.LEFT}
            )}>
                <div className={classnames(styles['group-shortcut'])}>
                    <div 
                        className={classnames(
                            styles['element-shortcut'], 
                            styles['undo'],
                            {[styles['active']] : true}
                        )}
                    >
                        <Icon type='icon-ants-undo' />                
                    </div>
                    <div 
                        className={classnames(
                            styles['element-shortcut'], 
                            styles['redo'],
                            {[styles['active']] : true}
                        )}
                    >
                        <Icon type='icon-ants-undo' />                
                    </div>
                </div>
                <div className={classnames(styles['group-shortcut'])}>
                    <div 
                        className={classnames(
                            styles['element-shortcut'], 
                            styles['view'],
                            {[styles['active']] : !isOpenPreview}
                        )}
                        onClick={onClickPreview}
                    >           
                        <Icon type='icon-ants-view' />                
                    </div>
                </div>
                <div className={classnames(styles['group-shortcut'])}>
                    <div 
                        className={classnames(
                            styles['element-shortcut'], 
                            styles['desktop'],
                            {[styles['active']] : viewMode === CONSTANTS.VIEW_MODE.DESKTOP}
                        )}
                        onClick={onClickViewMode(CONSTANTS.VIEW_MODE.DESKTOP)}
                    >           
                        <Icon type='icon-ants-desktop' />
                    </div>
                    <div 
                        className={classnames(
                            styles['element-shortcut'], 
                            styles['smart-phone'],
                            {[styles['active']] : viewMode === CONSTANTS.VIEW_MODE.MOBILE}
                        )}
                        onClick={onClickViewMode(CONSTANTS.VIEW_MODE.MOBILE)}
                    >           
                        <Icon type='icon-ants-smart-phone' />
                    </div>
                </div>
                <div className={classnames(styles['group-shortcut'])}>
                    <div 
                        className={classnames(
                            styles['element-shortcut'], 
                            styles['left-side-panel'],
                            {[styles['active']] : sidePanelMode === CONSTANTS.SIDE_PANEL_MODE.LEFT}
                        )}
                        onClick={onClickSidePanelMode(CONSTANTS.SIDE_PANEL_MODE.LEFT)}
                    >           
                        <Icon type='icon-ants-switch-side-panel' />
                    </div>
                    <div 
                        className={classnames(
                            styles['element-shortcut'], 
                            styles['right-side-panel'],
                            {[styles['active']] : sidePanelMode === CONSTANTS.SIDE_PANEL_MODE.RIGHT}
                        )}
                        onClick={onClickSidePanelMode(CONSTANTS.SIDE_PANEL_MODE.RIGHT)}
                    >           
                        <Icon type='icon-ants-switch-side-panel' />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderShortcut()}   
        </>
    );
};

export default ShortcutBar;