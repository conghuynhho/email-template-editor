import React from 'react';

// Component
import Button from 'Components/design-template/components/SidePanel/containers/Button';
import Text from 'Components/design-template/components/SidePanel/containers/Text';
import Line from 'Components/design-template/components/SidePanel/containers/Line';
import Columns from 'Components/design-template/components/SidePanel/containers/Columns';
import General from 'Components/design-template/components/SidePanel/containers/General';
import Menu from 'Components/design-template/components/SidePanel/containers/Menu';

// Utils
import {typeElement} from 'Components/design-template/constants';
import sidePanelConfig from 'Components/design-template/components/SidePanel/configs';

const SidePanel = props => {
    const renderHtml = () => {
        try {
            const type = 'MENU';
            const config = sidePanelConfig.find(item => item.type === type);

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
                    return <Button config={config} />;
                }
                case typeElement.MENU: {
                    return <Menu config={config} />;
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