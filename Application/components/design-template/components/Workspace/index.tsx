import React, {Fragment, useContext} from 'react';
import classnames from 'classnames';
import styles from 'Components/design-template/components/Workspace/styles.module.scss';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {nestedData} from 'Components/design-template/components/Workspace/constants';
import {getObjectPropSafely} from 'Utils';
import Row from 'Components/design-template/components/Workspace/components/Row';
import {CONSTANTS} from 'Components/design-template/constants';

const Workspace = () => {
    const {state: store = {}} = useContext(StoreContext);
    const {viewMode} = store;

    // console.log(nestedData, 'nestedData');
    // console.log(store, 'store');

    const id = getObjectPropSafely(() => nestedData.body.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => nestedData.body.values._meta.htmlClassNames);
    const styleBody = {
        minHeight: 'max-content',
        backgroundColor: getObjectPropSafely(() => nestedData.body.values.backgroundColor),
        fontFamily: getObjectPropSafely(() => nestedData.body.values.fontFamily.value)
    };

    const renderRow = () => {
        const rows = getObjectPropSafely(() => nestedData.body.rows);
        const generalStyle = getObjectPropSafely(() => nestedData.body.values);

        return rows.map((row, index) => {        
            return (
                <Fragment key={index}>
                    <Row 
                        data={row} 
                        generalStyle={generalStyle}
                    />
                </Fragment>
            );
        }); 
    };

    return (
        <div>
            <div 
                id={id}
                className={classnames(
                    classTitle, 
                    styles['inner-content'],
                    {[styles['inner-content-layout-mobile']]: viewMode === CONSTANTS.VIEW_MODE.MOBILE}
                )}
                style={styleBody}
            >
                <div className={'layer-group-row'}>
                    {renderRow()}
                </div>
            </div>
        </div>
    );
};

export default Workspace;