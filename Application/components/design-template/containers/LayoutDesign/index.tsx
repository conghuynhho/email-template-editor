import React, {useContext} from 'react';
import classnames from 'classnames';
import SidePanel from 'Components/design-template/components/SidePanel';
import Workspace from 'Components/design-template/components/Workspace';
import ShortcutBar from 'Components/design-template/components/ShortcutBar';
import styles from 'Components/design-template/containers/LayoutDesign/styles.module.scss';
import {StateProvider} from 'Components/design-template/components/ContextStore';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {CONSTANTS} from 'Components/design-template/constants';

const LayoutDesign = () => {
    const {state: store = {}} = useContext(StoreContext);
    const sidePanelMode = store;

    return (
        <div className={classnames(
            styles['grid-container'],
            {[styles['side-panel-left']] : sidePanelMode === CONSTANTS.SIDE_PANEL_MODE.LEFT}
        )}>
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