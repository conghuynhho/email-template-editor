import React, {Fragment, useContext} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import classnames from 'classnames';
import styles from 'Components/design-template/components/Workspace/styles.module.scss';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {designData} from 'Components/design-template/components/Workspace/constants';
import {getObjectPropSafely} from 'Utils';
import Row from 'Components/design-template/components/Workspace/components/Row';
import {CONSTANTS} from 'Components/design-template/constants';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {hierarchyDesignData} from 'Components/design-template/components/Workspace/utils';
import {Icon} from '@antscorp/components';

const Workspace = () => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const viewMode = store;
    const nestedData = hierarchyDesignData(designData);

    // console.log(nestedData, 'nestedData');
    // console.log(hierarchyDesignData(designData), 'hierarchyDesignData');
    // console.log(designData, 'designData');
    // console.log(store, 'store');

    const id = getObjectPropSafely(() => nestedData.body.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => nestedData.body.values._meta.htmlClassNames);
    const styleBody = {
        minHeight: 'max-content',
        backgroundColor: getObjectPropSafely(() => nestedData.body.values.backgroundColor),
        fontFamily: getObjectPropSafely(() => nestedData.body.values.fontFamily.value)
    };

    const renderRow = (snapshot) => {
        const rows = getObjectPropSafely(() => nestedData.body.rows);
        const generalStyle = getObjectPropSafely(() => nestedData.body.values);

        return rows.map((row, index) => {
            const shouldRenderClone = row.values._meta.htmlID === snapshot.draggingFromThisWith;

            return (
                <Fragment key={index}>
                    {shouldRenderClone ? (
                        <div className={classnames(styles['transform-none'])}><Row data={row} generalStyle={generalStyle} /></div>
                    ) : (
                        <Draggable draggableId={row.values._meta.htmlID} index={index} >
                            {(provided) => (
                                <React.Fragment>
                                    <div
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <Row
                        
                                            dragHandleProps={provided.dragHandleProps}
                                            index={index}
                                            data={row}
                                            generalStyle={generalStyle}
                                        />
                                    </div>
                                </React.Fragment>
                            )}
                        </Draggable>
                    )}
                </Fragment>
            );
        });
    };

    const onClickWorkspace = () => {
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {activeElement: 'u_body'}
        });
    };

    const handleDragEnd = ({source, destination}, provided) => {
        console.log('source', source);
        console.log('destination', destination);
        console.log(provided);
    };

    return (
        <div
            className={classnames(styles['outer-content'])}
            onClick={onClickWorkspace}
        >
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
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="workspace" 
                            renderClone={(provided) => (
                                <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                >
                                    <div
                                        className={classnames(styles['layer-drag-row'])} >
                                        <Icon className={classnames('icon-ants-double-three-dots', styles['drag-row'])} />
                                    </div>
                                </div>
                            )}
                        >
                            {(provided, snapshot) => (
                                <div className={classnames(styles['child-transform-none'])} ref={provided.innerRef} {...provided.droppableProps}>
                                    {renderRow(snapshot)}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
};

export default Workspace;