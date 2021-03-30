// Libraries
import React, {useState} from 'react';
import {Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import {getPaddingChild} from '../../utils';

// Styles
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

const Menu = (props) => {
    const {
        config = {},
        content,
        translate = (lal) => lal
    } = props;
    const [activeTab, setActiveTab] = useState('side-panel-general-tab');

    console.log('config', config);
    console.log('content', content);
    // Lấy data style của Menu đổ vào sidePanel
    config.resource.style[0].elements.forEach((element) => {
        switch (element.id) {
            case 'fontFamily': 
                element.defaultValue = (getObjectPropSafely(() => content.values.fontFamily.label.toLowerCase()));
                break;
            case 'fontSize': 
                element.defaultValue = (getObjectPropSafely(() => content.values.fontSize));
                break;
            case 'textColorMenu': 
                element.defaultValue = (getObjectPropSafely(() => content.values.textColor));
                break;
            case 'textColorButton': 
                element.defaultValue = (getObjectPropSafely(() => content.values.linkColor));
                break;
            case 'alignments': 
                element.defaultValue = (getObjectPropSafely(() =>content.values.align));
                break;
            case 'layout': 
                element.defaultValue = ((getObjectPropSafely(() => content.values.layout == 'Vertical' ? 1 : 2)));
                break;
            case 'moreOptionsMenuPadding': 
                element.defaultValue = (getObjectPropSafely(() => content.values.padding.split(' '))).length > 1 ? true : false;
                break;
            case 'childMenuPadding': 
                const padding = getPaddingChild((getObjectPropSafely(() => content.values.padding.replace(/px/g,'').split(' '))));

                element.elementChild.forEach((index) => {
                    switch (index.id) {
                        case 'top':
                            index.defaultValue = padding.top;
                            break;
                        case 'bottom':
                            index.defaultValue = padding.bottom;
                            break;
                        case 'right':
                            index.defaultValue = padding.right;
                            break;
                        default:
                            index.defaultValue = padding.left;
                    }
                });
                break;
            case 'containerPadding': 
                element.defaultValue = (getObjectPropSafely(() => content.values.containerPadding.replace(/px/g,'')));
                break;
            case 'moreOptionsPaddingMenu': 
                element.defaultValue = getObjectPropSafely(() => content.values.padding.split(' ')).length > 1 ? true : false;
                break;
            default:
                break;
        }
    });

    // General
    content.values.menu.items.forEach((value, index) => {
        config.resource.general[index].elements[0].defaultValue = value.text;
    });

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
                                    <TabGeneral general={general} />
                                </TabPane>
                                <TabPane tabId="side-panel-style-tab" className="h-100">
                                    <TabStyle style={style} />
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