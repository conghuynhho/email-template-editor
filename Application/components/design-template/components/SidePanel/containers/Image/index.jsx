// Libraries
import React, {useState} from 'react';
import {Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import _ from 'lodash';

// Styles
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import {convertShortHandCSS, getActionType, getTarget, getTypeOfImage} from '../../../Workspace/utils';
import produce from 'immer';

// Components
const TabStyle = Loadable({
    loader: () => import('Components/design-template/components/SidePanel/Style'),
    loading: () => { return null }
});

const TabGeneral = Loadable({
    loader: () => import('Components/design-template/components/SidePanel/General'),
    loading: () => { return null }
});

const Image = props => {
    const {
        config = {},
        activeElementValues,
        translate = (lal) => lal
    } = props;
    const [activeTab, setActiveTab] = useState('side-panel-general-tab');
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    const mapMenuDataToSidePanel = (data, config) => {
        const general = getObjectPropSafely(()=> config.resource.general);
        const style = getObjectPropSafely(()=> config.resource.style);
        // general
        const newGeneral = produce(general, draft => {
            draft.forEach(generalChild => {
                if (generalChild.id === 'uploadImage') {
                    generalChild.elements.forEach(element => {
                        if (element.id === 'selectRadioImage') {
                            element.defaultValue = getTypeOfImage(getObjectPropSafely(()=>data.values.src.url));
                        }
                        if (element.id === 'alternalText') {
                            element.defaultValue = getObjectPropSafely(()=>data.values.altText);
                        }
                    });
                }
                if (generalChild.id === 'action') {
                    generalChild.elements.forEach(element => {
                        if (element.id === 'actionType') {
                            element.defaultValue = getActionType(getObjectPropSafely(()=>data.values.action.name));
                        }
                        if (element.id.indexOf('urlImage') >= 0) {
                            element.defaultValue = getObjectPropSafely(()=>data.values.action.values.href);
                        }
                        if (element.id === 'target') {
                            element.defaultValue =  getTarget(getObjectPropSafely(()=>data.values.action.values.target));
                        }
                    });
                }
            });
        });
        const newStyle = produce(style, draft => {
            draft.forEach(styleChild => {
                if (styleChild.id === 'image') {
                    styleChild.elements.forEach(element => {
                        if (element.id === 'width') {
                            element.defaultValue = getObjectPropSafely(()=>data.values.src.width);
                            element.unit = 'px';
                        }
                        if (element.id === 'autoWidth') {
                            element.defaultValue = getObjectPropSafely(()=>data.values.src.autoWidth);
                        }
                        if (element.id === 'alignments') {
                            element.defaultValue = getObjectPropSafely(()=>data.values.textAlign);
                        }
                        if (element.id === 'imageMoreOptions') {
                            element.defaultValue = ((getObjectPropSafely(()=>data.values.containerPadding)).split(' ').length > 1);
                        }
                        if (element.id === 'childImagePadding') {
                            const paddingValues = convertShortHandCSS(getObjectPropSafely(()=>data.values.containerPadding));

                            element.elementChild[0] = {...getObjectPropSafely(()=>element.elementChild[0]),...paddingValues.top}; 
                            element.elementChild[1] = {...getObjectPropSafely(()=>element.elementChild[1]),...paddingValues.right}; 
                            element.elementChild[2] = {...getObjectPropSafely(()=>element.elementChild[2]),...paddingValues.bottom}; 
                            element.elementChild[3] = {...getObjectPropSafely(()=>element.elementChild[3]),...paddingValues.left}; 
                        }
                    });
                }
                if (styleChild.id === 'responsiveDesign') {
                    styleChild.elements.forEach(element => {
                        if (element.id === 'responsive') {
                            element.defaultValue = getObjectPropSafely(()=>data.values.hideDesktop);
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
    const convertedConfig = mapMenuDataToSidePanel(activeElementValues,config);

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
                                    <TabGeneral general={general} content={activeElementValues} values={activeElementValues.values} />
                                </TabPane>
                                <TabPane tabId="side-panel-style-tab" className="h-100">
                                    <TabStyle style={style} content={activeElementValues} values={activeElementValues.values} />
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

export default Image;