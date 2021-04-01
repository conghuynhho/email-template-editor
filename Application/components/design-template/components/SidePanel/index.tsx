import React, {useContext} from 'react';

// Component
import Button from 'Components/design-template/components/SidePanel/containers/Button';
import Text from 'Components/design-template/components/SidePanel/containers/Text';
import Line from 'Components/design-template/components/SidePanel/containers/Line';
import Columns from 'Components/design-template/components/SidePanel/containers/Columns';
import General from 'Components/design-template/components/SidePanel/containers/General';
import Menu from 'Components/design-template/components/SidePanel/containers/Menu';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import Image from 'Components/design-template/components/SidePanel/containers/Image';
import Html from 'Components/design-template/components/SidePanel/containers/Html';

// Utils
import {typeElement} from 'Components/design-template/constants';
import sidePanelConfig from 'Components/design-template/components/SidePanel/configs';
import {getObjectPropSafely} from 'Utils';
import {getActiveElement} from 'Components/design-template/components/Workspace/utils';

const SidePanel = props => {
    const {state: store = {activeElement: {}, bodies: {}}} = useContext(StoreContext);
    const renderHtml = () => {
        try {
            const activeElementID = store.activeElement;
            const element = getActiveElement(store, activeElementID);
            const config = sidePanelConfig.find(item => getObjectPropSafely(()=> item.type) === getObjectPropSafely(()=> element.type));
            let type = (getObjectPropSafely(()=> element.type));

            if (type) {type = type.toUpperCase()}
            switch (type) {
                case typeElement.TEXT: {
                    return <Text config={config} content={element.content} />;
                }
                case typeElement.LINE: {
                    return <Line config={config} content={element.content} />;
                }
                case typeElement.COLUMNS: {
                    return <Columns config={config} />;
                }
                case typeElement.GENERAL: {
                    return <General config={config} content={getObjectPropSafely(()=>store.bodies[2])} />;
                }
                case typeElement.BUTTON: {
                    return <Button config={config} activeElementValues={element} />;
                }
                default: {
                    return <General config={config} />;
                }
                case typeElement.MENU: {
                    return <Menu config={config} />;
                }
                case typeElement.IMAGE: {
                    return <Image config={config} activeElementValues={element} />;
                }
                case typeElement.HTML: {
                    return <Html config={config} />;
                }
            }
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

export default SidePanel;