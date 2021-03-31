// Libraries
import React, {useState, memo} from 'react';
import classnames from 'classnames';
import {Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import Loadable from 'react-loadable';
import {DragDropContext} from 'react-beautiful-dnd';

// Utils
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';

// Components
const TabStyle = Loadable({
    loader: () => import('Components/design-template/components/SidePanel/Style'),
    loading: () => { return null }
});

const TabGeneral = Loadable({
    loader: () => import('Components/design-template/components/SidePanel/General'),
    loading: () => { return null }
});

const General = props => {
    const {
        config = {},
        translate = (lal) => lal
    } = props;
    const [activeTab, setActiveTab] = useState('side-panel-general-tab');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const renderHtml = () => {
        try {
            const style = getObjectPropSafely(() => config.resource.style) || [];
            const general = getObjectPropSafely(() => config.resource.general) || [];

            return (
                <div className={classnames(styles['block-full'])} style={{width: 'calc(100 % - 6px)'}}>
                    <div className={classnames(styles['section-label-title'])}>{translate(config.name, config.name)}</div>
                    <hr style={{marginTop: 5, marginBottom: 5}} />
                    <div className={classnames(styles['side-panel-tabs'])}>
                        <Nav tabs>
                            <NavItem className={classnames(styles['nav-item'])}>
                                <NavLink
                                    className={classnames(styles['nav-link'], {[styles['active']]: activeTab === 'side-panel-general-tab'})}
                                    onClick={toggleTab.bind(this, 'side-panel-general-tab')}
                                >
                                    {translate('General', 'General')}
                                </NavLink>
                            </NavItem>
                            <NavItem className={classnames(styles['nav-item'])}>
                                <NavLink
                                    className={classnames(styles['nav-link'], {[styles['active']]: activeTab === 'side-panel-style-tab'})}
                                    onClick={toggleTab.bind(this, 'side-panel-style-tab')}
                                >
                                    {translate('List Components', 'List Components')}
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab} >
                            <TabPane tabId="side-panel-general-tab">
                                <TabGeneral general={general} />
                            </TabPane>
                            <TabPane tabId="side-panel-style-tab" className="h-100">
                                <TabStyle style={style} />
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            );
        } catch (error) {
            //
        }
    };

    return (
        <>
            {renderHtml()}
        </>
    );
};

export default memo(General);