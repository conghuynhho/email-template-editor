// Libraries
import React, {useState} from 'react';
import {Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import {removePercentPattern, convertShortHandCSS} from 'Components/design-template/components/Workspace/utils';

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

const Button = props => {
    const {
        config = {},
        activeElementValues,
        translate = (lal) => lal
    } = props;
    const [activeTab, setActiveTab] = useState('side-panel-general-tab');

    const mapButtonDataToConfig = (data, config) => {
        const configClone = {...config};
    
        // set background color
        if (configClone.resource.style[0].elements[0].defaultValue) {
            configClone.resource.style[0].elements[0].defaultValue = getObjectPropSafely(() => data.values.buttonColors.backgroundColor);
        }
        // set textColorButton
        if (configClone.resource.style[0].elements[1].defaultValue) {
            configClone.resource.style[0].elements[1].defaultValue = getObjectPropSafely(() => data.values.buttonColors.color);
        }
        // set text-input width
        if (configClone.resource.style[0].elements[2].defaultValue) {
            configClone.resource.style[0].elements[2].defaultValue = removePercentPattern(getObjectPropSafely(() => data.values.size.width));
        }
        // set width to auto 
        if (configClone.resource.style[0].elements[3].defaultValue) {
            configClone.resource.style[0].elements[3].defaultValue = (getObjectPropSafely(() => data.values.size.autoWidth));
        }
        // set alignment
        if (configClone.resource.style[0].elements[4].defaultValue) {
            configClone.resource.style[0].elements[4].defaultValue = (getObjectPropSafely(() => data.values.textAlign));
        }
        // set lineHeight
        if (configClone.resource.style[0].elements[5].defaultValue) {
            configClone.resource.style[0].elements[5].defaultValue = removePercentPattern(getObjectPropSafely(() => data.values.lineHeight));
        }
        // switch more option for button padding
        // 
        // set padding when is on moreOptions
        if (configClone.resource.style[0].elements[8].elementChild) {
            const elementChild = configClone.resource.style[0].elements[8].elementChild;
            const paddingArray = (getObjectPropSafely(()=>data.values.padding)).split(' ');

            if (paddingArray.length === 1) {
                if (configClone.resource.style[0].elements[7].defaultValue) {
                    configClone.resource.style[0].elements[7].defaultValue = false;
                }
            }
            else {
                if (configClone.resource.style[0].elements[7].defaultValue) {
                    configClone.resource.style[0].elements[7].defaultValue = true;
                }
            }
            const values = convertShortHandCSS((getObjectPropSafely(()=> data.values.padding)));

            configClone.resource.style[0].elements[8].elementChild[0] = {
                ...elementChild[0],
                ...getObjectPropSafely(() =>values.top)
            };
            configClone.resource.style[0].elements[8].elementChild[1] = {
                ...elementChild[1],
                ...getObjectPropSafely(() =>values.right)
            };
            configClone.resource.style[0].elements[8].elementChild[2] = {
                ...elementChild[2],
                ...getObjectPropSafely(() =>values.bottom)
            };
            configClone.resource.style[0].elements[8].elementChild[3] = {
                ...elementChild[3],
                ...getObjectPropSafely(() =>values.left)
            };
        }
        // set roundBorder
        if (configClone.resource.style[0].elements[9].defaultValue) {
            configClone.resource.style[0].elements[9].defaultValue = getObjectPropSafely(()=> data.values.borderRadius);
        }
        // switch true/false moreOptions Border

        // set border when is on moreOption border mode
        // getObjectPropSafely(() => config.resource.style[0].elements[9]);
        // TODO: DO IT LATER

        // set container padding
        if (configClone.resource.style[0].elements[13].defaultValue) {
            const values = convertShortHandCSS((getObjectPropSafely(()=> data.values.containerPadding)));

            configClone.resource.style[0].elements[13].defaultValue = getObjectPropSafely(()=> (values.top.defaultValue));
        }
        // switch more option for container padding
        // getObjectPropSafely(() => config.resource.style[0].elements[11]);

        // switch mode hide on destop
        if (configClone.resource.style[1].elements[0].defaultValue) {
            configClone.resource.style[1].elements[0].defaultValue = getObjectPropSafely(() => data.values.hideOnDesktop);
        }
        // GENERAL  *** setLink of button
        if (configClone.resource.general[0].elements[1].defaultValue) {
            configClone.resource.general[0].elements[0].defaultValue = getObjectPropSafely(() => data.values.href.values.href);
        }   
        return configClone;
    };

    // console.log(configure, 'configSamples');
    // console.log(activeElementValues, 'activeElement');
    const configConverted = mapButtonDataToConfig(activeElementValues.content, config);

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const renderHtml = () => {
        try {
            const style = getObjectPropSafely(() => configConverted.resource.style) || [];
            const general = getObjectPropSafely(() => configConverted.resource.general) || [];

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

export default Button; 