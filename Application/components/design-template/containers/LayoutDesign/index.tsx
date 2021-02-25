import React from 'react';
import classnames from 'classnames';
import SidePanel from 'Components/design-template/components/SidePanel';
import Workspace from 'Components/design-template/components/Workspace';
import ShortcutBar from 'Components/design-template/components/ShortcutBar';
import styles from 'Components/design-template/containers/LayoutDesign/styles.module.scss';
import {StateProvider} from 'Components/design-template/components/ContextStore';

const LayoutDesign = () => {

    return (
        <div className={classnames(styles['grid-container'])}>
            <div className={classnames(styles['grid-workspace'])}>
                <Workspace />
            </div>

            <div className={classnames(styles['grid-sidepanel'])}>
                <SidePanel />
            </div>

            <ShortcutBar />
        </div>
    );
};

const Components = (props) => {
    return (
        <StateProvider>
            <LayoutDesign {...props} />
        </StateProvider>
    );
};

export default Components;