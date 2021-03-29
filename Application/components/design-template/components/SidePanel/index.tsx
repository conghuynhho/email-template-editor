import React, {useContext} from 'react';

// Component
import Button from 'Components/design-template/components/SidePanel/containers/Button';
import Text from 'Components/design-template/components/SidePanel/containers/Text';
import Line from 'Components/design-template/components/SidePanel/containers/Line';
import Columns from 'Components/design-template/components/SidePanel/containers/Columns';
import General from 'Components/design-template/components/SidePanel/containers/General';
import {StoreContext} from 'Components/design-template/components/ContextStore';

// Utils
import {typeElement} from 'Components/design-template/constants';
import sidePanelConfig from 'Components/design-template/components/SidePanel/configs';
import {getObjectPropSafely} from 'Utils';
import {getActiveElement} from 'Components/design-template/components/Workspace/utils';

const SidePanel = () => {
    const {state: store = {activeElement : {}}} = useContext(StoreContext);
    const renderHtml = () => {
        try {
            const activeElement = getObjectPropSafely(() => store.activeElement);
            const element = getActiveElement(store, activeElement);
            const config = sidePanelConfig.find(item => item.type === element.type);

            switch (element.type) {
                case typeElement.TEXT: {
                    return <Text config={config} element={element.values} />;
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
                    return <Button config={config} />;
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