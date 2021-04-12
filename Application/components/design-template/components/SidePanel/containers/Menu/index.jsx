// Libraries
import React, {useState, useContext} from 'react';
import {Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import {getPaddingChild} from '../../utils';

// Styles
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import {getContentIDFromHtmlID} from '../../../Workspace/utils';

// Components
const TabStyle = Loadable({
    loader: () => import('Components/design-template/components/SidePanel/Style'),
    loading: () => { return null }
});

// Context
import {StoreContext} from 'Components/design-template/components/ContextStore';

// utils
import {
    getContentIDFromHtmlID
} from 'Components/design-template/components/Workspace/utils';

const TabGeneral = Loadable({
    loader: () => import('Components/design-template/components/SidePanel/General'),
    loading: () => { return null }
});

const Menu = (props) => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {
        activeElement,
        rows
    } = store;
    const {
        config = {},
        content,
        translate = (lal) => lal
    } = props;

    const menuId = activeElement.includes('menu') ? getContentIDFromHtmlID(store, activeElement) : '';
    const values = getObjectPropSafely(() => store.contents[menuId].values);
    const [activeTab, setActiveTab] = useState('side-panel-general-tab');

    // const {state: store = {}} = useContext(StoreContext);
    // const {
    //     activeElement,  
    //     contents
    // } = store;

    // const contentId = activeElement.includes('content') ? getContentIDFromHtmlID(store, activeElement) : '';
    // const values = getObjectPropSafely(() => contents[contentId].values);

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
                <>
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
                                        {translate('Style', 'Style')}
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab} >
                                <TabPane tabId="side-panel-general-tab">
                                    <TabGeneral general={general} values={values} />
                                </TabPane>
                                <TabPane tabId="side-panel-style-tab" className="h-100">
                                    <TabStyle style={style} values={values} />
                                </TabPane>
                            </TabContent>
                        </div>
                    </div>
                </>
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

export default Menu;