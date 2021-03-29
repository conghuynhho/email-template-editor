import React, {useContext} from 'react';
import {StoreContext} from 'Components/design-template/components/ContextStore';

// Component
import Button from 'Components/design-template/components/SidePanel/containers/Button';
import Text from 'Components/design-template/components/SidePanel/containers/Text';
import Line from 'Components/design-template/components/SidePanel/containers/Line';
import Columns from 'Components/design-template/components/SidePanel/containers/Columns';
import General from 'Components/design-template/components/SidePanel/containers/General';

// Utils
import {typeElement} from 'Components/design-template/constants';
import sidePanelConfig from 'Components/design-template/components/SidePanel/configs';
import {getActiveElement} from 'Components/design-template/components/Workspace/utils.js';
import {getObjectPropSafely} from 'Utils';

const SidePanel = props => {
    const {state: store = {}} = useContext(StoreContext);
    const renderHtml = () => {
        try {
            const activeElement = getActiveElement(store);
            let type = getObjectPropSafely(() => activeElement.type);

            if (type) {type = type.toUpperCase()}
            const config = sidePanelConfig.find(item => item.type === type);

            // console.log(sidePanelConfig, 'config');
            switch (type) {
                case typeElement.TEXT: {
                    return <Text config={config} />;
                }
                case typeElement.LINE: {
                    return <Line config={config} />;
                }
                case typeElement.COLUMNS: {
                    return <Columns config={config} />;
                }
                case typeElement.GENERAL: {
                    return <General config={config} />;
                }
                case typeElement.BUTTON: {
                    return <Button configure={config} activeElementValues={activeElement} />;
                }
                default: {
                    return <General config={config} />;
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