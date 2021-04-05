// Libraries
import React, {useContext} from 'react';
import classnames from 'classnames';

// Utils
import Style from 'Components/design-template/components/SidePanel/Style';
import {getObjectPropSafely} from 'Utils/index.ts';
import styles from 'Components/design-template/components/SidePanel/styles.module.scss';

// Context
import {StoreContext} from 'Components/design-template/components/ContextStore';

// utils
import {
    getRowIDFromHtmlID
} from 'Components/design-template/components/Workspace/utils';

const Columns = props => {
    const {
        config = {},
        translate = (lal) => lal
    } = props;
    const {state: store = {}} = useContext(StoreContext);
    const {
        activeElement,  
        rows
    } = store;

    const rowId = activeElement.includes('row') ? getRowIDFromHtmlID(store, activeElement) : '';
    const values = getObjectPropSafely(() => rows[rowId].values);

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

export default Columns;