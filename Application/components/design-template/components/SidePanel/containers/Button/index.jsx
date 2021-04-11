// Libraries
import React, {useState} from 'react';
import {Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import {removePercentPattern, convertShortHandCSS, getActionType, getTarget} from 'Components/design-template/components/Workspace/utils';
import {DATA_TYPE} from 'Components/design-template/components/SidePanel/constants';

// Styles
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import produce from 'immer';
import {getUnitAndValue} from '../../../Workspace/utils';

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
        const general = getObjectPropSafely(()=>config.resource.general);
        const style = getObjectPropSafely(()=>config.resource.style);
        const newGeneral = produce(general, draft => {
            draft.forEach(generalChild => {
                if (generalChild.id === 'action') {
                    generalChild.elements.forEach(element => {
                        switch (element.id) {
                            case DATA_TYPE.ACTION_TYPE:
                                element.defaultValue = getActionType(getObjectPropSafely(()=>data.values.href.name));
                                break;
                            case DATA_TYPE.URL: 
                                element.defaultValue = getObjectPropSafely(() => data.values.href.values.href);
                                break;
                            case DATA_TYPE.TARGET: 
                                element.defaultValue = getTarget(getObjectPropSafely(() => data.values.href.values.target));
                                break;
                            default:
                                break;
                        }
                    });
                }
            });
        });
        const newStyle = produce(style, draft => {
            draft.forEach(styleChild => {
                if (styleChild.id === DATA_TYPE.BUTTON) {
                    styleChild.elements.forEach(element => {
                        switch (element.id) {
                            case DATA_TYPE.BACKGROUND_COLOR_BUTTON:
                                element.defaultValue =  getObjectPropSafely(() => data.values.buttonColors.backgroundColor);
                                break;
                            case DATA_TYPE.TEXT_COLOR_BUTTON: 
                                element.defaultValue = getObjectPropSafely(() => data.values.buttonColors.color);
                                break;
                            case DATA_TYPE.WIDTH: 
                                const unitAndValue = getUnitAndValue(getObjectPropSafely(() => data.values.size.width));

                                element = {
                                    ...element,
                                    ...unitAndValue
                                };                         
                                break;
                            case DATA_TYPE.AUTO_WIDTH:
                                element.defaultValue = getObjectPropSafely(() => data.values.size.autoWidth);
                                break;
                            case DATA_TYPE.ALIGNMENTS:
                                element.defaultValue = getObjectPropSafely(() => data.values.textAlign);
                                break;
                            case DATA_TYPE.LINE_HEIGHT:
                                const unitValueLineHeight = getUnitAndValue(getObjectPropSafely(()=>data.values.lineHeight));

                                element = {
                                    ...element,
                                    ...unitValueLineHeight
                                };
                                break;
                            case DATA_TYPE.MORE_OPTIONS_BUTTON_PADDING:
                                element.defaultValue = ((getObjectPropSafely(() => data.values.padding).split(' ').length) > 1);
                                break;
                            case DATA_TYPE.CHILD_BUTTON_PADDING:
                                const paddingValues = convertShortHandCSS(getObjectPropSafely(()=>data.values.padding));

                                element.elementChild[0] = {...getObjectPropSafely(()=>element.elementChild[0]),...paddingValues.top}; 
                                element.elementChild[1] = {...getObjectPropSafely(()=>element.elementChild[1]),...paddingValues.right}; 
                                element.elementChild[2] = {...getObjectPropSafely(()=>element.elementChild[2]),...paddingValues.bottom}; 
                                element.elementChild[3] = {...getObjectPropSafely(()=>element.elementChild[3]),...paddingValues.left}; 
                                break;
                            case DATA_TYPE.ROUNDED_BORDER:
                                element.defaultValue = getObjectPropSafely(()=> data.values.borderRadius);
                                break;
                                // case DATA_TYPE.ROUNDED_BORDER:
                                //     element.defaultValue = getObjectPropSafely(()=> data.values.borderRadius);
                                //     break;
                                // case DATA_TYPE.MORE_OPTIONS_BORDER:
                                //     element.defaultValue = getObjectPropSafely(()=> data.values.borderRadius);
                                //     break;
                                // case DATA_TYPE.CHILD_BORDER:
                                //     element.defaultValue = getObjectPropSafely(()=> data.values.borderRadius);
                                //     break;
                                // case DATA_TYPE.CONTAINER_PADDING:
                                //     element.defaultValue = getObjectPropSafely(()=> data.values.borderRadius);
                                //     break;
                                // case DATA_TYPE.MORE_OPTIONS_PADDING_CONTAINER:
                                //     element.defaultValue = getObjectPropSafely(()=> data.values.borderRadius);
                                //     break;
                            default:
                                break;
                        }
                    });
                }
                if (styleChild.id === DATA_TYPE.RESPONSIVE_DESIGN) {
                    styleChild.elements.forEach(element => {
                        switch (element.id) {
                            case DATA_TYPE.RESPONSIVE:
                                element.defaultValue = getObjectPropSafely(() => data.values.hideOnDesktop);
                                break;
                        
                            default:
                                break;
                        }
                    });
                }
            });
        });

        const saveData = produce(config, draft => {
            draft.resource.general = newGeneral;
            draft.resource.style = newStyle;
        });

        return saveData;
    };

    const configConverted = mapButtonDataToConfig(activeElementValues, config);

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