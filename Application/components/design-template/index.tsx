import React from 'react';
import classnames from 'classnames';
import SidePanel from './components/SidePanel';
import Workspace from './components/Workspace';
import styles from './styles.module.scss';

const DesignTemplate = () => {
    return (
        <div className={classnames(styles['grid-container'])}>
            <div className={classnames(styles['grid-workspace'])}>
                <Workspace />
            </div>

            <div className={classnames(styles['grid-sidepanel'])}>
                <SidePanel />
            </div>
        </div>
    );
};

export default DesignTemplate;