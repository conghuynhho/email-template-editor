// Libraries
import React, {useState} from 'react';
import {Nav, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import Loadable from 'react-loadable';
import _ from 'lodash';

// Styles
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import {convertShortHandCSS, validURL, getUnitAndValue} from '../../../Workspace/utils';

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
    // convert action string to action code
    const getActionType = (actionName) =>{
        switch (actionName) {
            case 'web':
                return 1;
        
            default: 
                return 1;
        }
    };
    // convert target string to target code
    const getTarget = (target) => {
        switch (target) {
            case '_blank':
                return 1;
            default:
                return 1;
        }
    };
    const getTypeOfImage = (imageLink) => {
        if (validURL(imageLink)) {return 'imageUrl'}
        return 'uploadImage';
    };
    const mapMenuDataToSidePanel = (data, config) => {
        let general = getObjectPropSafely(()=>config.resource.general);
        let style = getObjectPropSafely(()=>config.resource.style);
        // general
        let uploadImage = {};
        let action = {};

        general.forEach((gen) => {
            switch (getObjectPropSafely(()=>gen.id)) {
                case 'uploadImage': {
                    const selectRadioImage = {
                        ...getObjectPropSafely(()=>gen.elements[0]),
                        defaultValue: getTypeOfImage(getObjectPropSafely(()=>data.content.values.src.url))
                    };
                    const imageUpload = {
                        ...getObjectPropSafely(()=>gen.elements[1])
                    };
                    const alternalText = {
                        ... getObjectPropSafely(()=>gen.elements[2]),
                        defaultValue: getObjectPropSafely(()=>data.content.values.altText)
                    };

                    uploadImage = {
                        ...gen,
                        elements: [
                            selectRadioImage,
                            imageUpload,
                            alternalText
                        ]
                    };
                }
                    break;
                case 'action': {
                    const actionType = {
                        ...getObjectPropSafely(()=>gen.elements[0]),
                        defaultValue: getActionType(getObjectPropSafely(()=>data.content.values.action.name))
                    };
                    const urlImage3d = {
                        ...getObjectPropSafely(()=>gen.elements[1]),
                        defaultValue: getObjectPropSafely(()=>data.content.values.action.values.href)
                    };
                    const target = {
                        ...getObjectPropSafely(()=>gen.elements[2]),
                        defaultValue: getTarget(getObjectPropSafely(()=>data.content.values.action.values.target))
                    };

                    action = {
                        ...gen,
                        elements: [
                            actionType,
                            urlImage3d,
                            target
                        ]
                    };
                }
                    break;
                default:
                    break;
            }
        });
        if (!_.isEmpty(uploadImage) && !_.isEmpty(action))
        {general = [
            uploadImage,
            action
        ];}

        // styles
        let image = {};
        let responsiveDesign = {};

        style.forEach(sty => {
            switch (getObjectPropSafely(()=>sty.id)) {
                case 'image': {
                    let maxWidth = '100%';

                    if (getObjectPropSafely(()=>data.content.values.src.maxWidth)) {
                        maxWidth = getObjectPropSafely(()=> data.content.values.src.maxWidth);
                    }
                    const width = {
                        ...getObjectPropSafely(()=>sty.elements[0]),
                        ...getUnitAndValue(maxWidth)
                    };
                    const autoWidth = {
                        ...getObjectPropSafely(()=>sty.elements[1]),
                        defaultValue: getObjectPropSafely(()=>data.content.values.src.autoWidth)
                    };
                    const alignment = {
                        ...getObjectPropSafely(()=>sty.elements[2]),
                        defaultValue: getObjectPropSafely(()=>data.content.values.textAlign)
                    };
                    const label = {
                        ...getObjectPropSafely(()=>sty.elements[3])
                    };
                    // padding:
                    // check is moreOption on
                    const paddingArray = (getObjectPropSafely(()=>data.content.values.containerPadding).split(' '));
                    let switchValue = false;

                    if (paddingArray.length > 1) {
                        switchValue = true;
                    }
                    const imageMoreOptions = {
                        ...getObjectPropSafely(()=>sty.elements[4]),
                        default: switchValue
                    };
                    const paddingValues = convertShortHandCSS(getObjectPropSafely(()=>data.content.values.containerPadding));
                    const top = {
                        ...getObjectPropSafely(()=>sty.elements[5].elementChild[0]),
                        ...paddingValues.top
                    };
                    const right = {
                        ...getObjectPropSafely(()=>sty.elements[5].elementChild[1]),
                        ...paddingValues.right
                    };
                    const bottom = {
                        ...getObjectPropSafely(()=>sty.elements[5].elementChild[2]),
                        ...paddingValues.bottom
                    };
                    const left = {
                        ...getObjectPropSafely(()=>sty.elements[5].elementChild[3]),
                        ...paddingValues.left
                    };
                    const elementChild = [
                        top,right,bottom,left
                    ];
                    const padding = {
                        ...getObjectPropSafely(()=>sty.elements[5]),
                        elementChild: elementChild
                    };

                    // combine data to image
                    image = {
                        ...sty,
                        elements: [
                            width,autoWidth,alignment,label,imageMoreOptions,padding
                        ]
                    };
                }
                    break;
                case 'responsiveDesign': {
                    const responsive = {
                        ...getObjectPropSafely(()=>sty.elements[0]),
                        defaultValue: getObjectPropSafely(()=>data.values.hideDesktop)
                    };

                    responsiveDesign = {
                        ...sty,
                        elements: [responsive]
                    };
                }
                    break;
                default:
                    break;
            }
        });
        if (!_.isEmpty(image) && !_.isEmpty(responsiveDesign)) {
            style = [image, responsiveDesign];
        }
        const saveData = {
            ...config,
            resource: {
                general: general,
                style: style
            }
        };

        return saveData;
    };
    const convertedConfig = mapMenuDataToSidePanel(activeElementValues,config);
    const renderHtml = () => {
        try {
            const style = getObjectPropSafely(() => convertedConfig.resource.style) || [];
            const general = getObjectPropSafely(() => convertedConfig.resource.general) || [];

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

export default Image;