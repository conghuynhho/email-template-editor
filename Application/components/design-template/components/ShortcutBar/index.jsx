import React from 'react';
import {Icon} from '@antscorp/components';
import classnames from 'classnames';
import styles from 'Components/design-template/components/ShortcutBar/styles.module.scss';

const ShortcutBar = () => {
    const renderShortcut = () => {
        return (
            <div className={classnames(styles['shortcut-bar'])}>
                <div className={classnames(styles['group-shortcut'])}>
                    <div className={classnames(styles['element-shortcut'], styles['undo'])}>
                        <Icon type='icon-ants-undo' />                
                    </div>
                    <div className={classnames(styles['element-shortcut'], styles['redo'])}>
                        <Icon type='icon-ants-undo' />                
                    </div>
                </div>
                <div className={classnames(styles['group-shortcut'])}>
                    <div className={classnames(styles['element-shortcut'], styles['view'])}>           
                        <Icon type='icon-ants-view' />                
                    </div>
                </div>
                <div className={classnames(styles['group-shortcut'])}>
                    <div className={classnames(styles['element-shortcut'], styles['desktop'])}>           
                        <Icon type='icon-ants-desktop' />
                    </div>
                    <div className={classnames(styles['element-shortcut'], styles['smart-phone'])}>           
                        <Icon type='icon-ants-smart-phone' />
                    </div>
                </div>
                <div className={classnames(styles['group-shortcut'])}>
                    <div className={classnames(styles['element-shortcut'], styles['left-side-panel'])}>           
                        <Icon type='icon-ants-switch-side-panel' />
                    </div>
                    <div className={classnames(styles['element-shortcut'], styles['right-side-panel'])}>           
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