import React, {Fragment, useContext} from 'react';
import classnames from 'classnames';
import styles from 'Components/design-template/components/Workspace/styles.module.scss';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {nestedData} from 'Components/design-template/components/Workspace/constants';
import {getObjectPropSafely} from 'Utils';
import Row from 'Components/design-template/components/Workspace/components/Row';

const Workspace = () => {
    const {state: store, dispatch: dispatchStore} = useContext(StoreContext);

    console.log(nestedData, 'nestedData');

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
                    <div className="blockbuilder-placeholder" data-name="Drag it here" />
                </Fragment>
            );
        }); 
    };

    return (
        <div>
            <div 
                id={id}
                className={classnames(classTitle, styles['inner-content'])}
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