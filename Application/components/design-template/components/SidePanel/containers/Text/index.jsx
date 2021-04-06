// Libraries
import classnames from 'classnames';
// Context
import {StoreContext} from 'Components/design-template/components/ContextStore';
// Utils
import Style from 'Components/design-template/components/SidePanel/Style';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';
import React, {useContext} from 'react';
import {getObjectPropSafely} from 'Utils/index.ts';
import {getContentIDFromHtmlID} from '../../../Workspace/utils';

const Text = props => {
    const {
        config = {},
        content,
        translate = (lal) => lal
    } = props;

    const {state: store = {}} = useContext(StoreContext);
    const {
        activeElement,  
        contents
    } = store;

    const contentId = activeElement.includes('content') ? getContentIDFromHtmlID(store, activeElement) : '';
    const values = getObjectPropSafely(() => contents[contentId].values);

    const renderHtml = () => {
        try {
            const style = getObjectPropSafely(() => config.resource.style) || [];
            const general = getObjectPropSafely(() => config.resource.general) || [];

            return (
                <div className={classnames(styles['block-full'])} style={{width: 'calc(100 % - 6px)'}}>
                    <div className={classnames(styles['section-label-title'])}>{translate(config.name, config.name)}</div>
                    <hr style={{marginTop: 5, marginBottom: 5}} />
                    <Style style={style} values={values} />
                </div>
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

export default Text;