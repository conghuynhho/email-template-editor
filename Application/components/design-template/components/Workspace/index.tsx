import React, {Fragment, useContext, useState} from 'react';
import classnames from 'classnames';
import styles from 'Components/design-template/components/Workspace/styles.module.scss';
import {StoreContext} from 'Components/design-template/components/ContextStore';
// import {nestedData as NSData, designData} from 'Components/design-template/components/Workspace/constants';
import {getObjectPropSafely} from 'Utils';
import Row from 'Components/design-template/components/Workspace/components/Row';
import {CONSTANTS} from 'Components/design-template/constants';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {hierarchyDesignData, reorder} from 'Components/design-template/components/Workspace/utils';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const Workspace = () => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {viewMode, bodies = {}, columns = {}, draggingColumnId = -1, coordinate} = store;
    const nestedData = hierarchyDesignData(store);

    console.log('store', store);
    // console.log('nestedData', nestedData);

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
                <Draggable key={index} draggableId={`draggable-row-${index}`} index={index}>
                    {(provided, snapshot) => {

                        return (
                            <div 
                                ref={provided.innerRef} 
                                {...provided.draggableProps} 
                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            >
                                <Row 
                                    data={row} 
                                    generalStyle={generalStyle}
                                    rowIndex={index}
                                    provided={provided}
                                />
                            </div>
                        );
                    }}
                </Draggable>
            );
        }); 
    };

    const onClickWorkspace = () => {
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {activeElement: 'u_body'}
        });
    };

    const onMouseOverRow = (e) => {
    };

    const onDragStart = (provided) => {
        // document.addEventListener('mousemove', onMouseOverRow);

    };

    // const onDragUpdate = (result) => {
    //     console.log(result, 'update');
    //     const element = getObjectPropSafely(() => document.getElementById(result.draggableId))
    // };

    const onDragEnd = (result) => {
        // document.removeEventListener('mousemove', onMouseOverRow);
        if (!result.destination) {
            return;
        }

        const {source, destination} = result;
        
        if (result.type === 'rows') {
            
            const keyList = Object.keys(bodies);
            const firstValue = keyList[0];
            const rowsClone = bodies[firstValue].rows;
            
            const newRows = reorder(rowsClone, source.index, destination.index);

            bodies[firstValue].rows = newRows;

            dispatchStore({
                type: actionType.UPDATE_BODY,
                payload: {
                    bodies: bodies
                }
            });

        } else {
            
            if (destination.droppableId === source.droppableId) {

                for (const key in columns) {
                    if (columns[key].contents.length > 1 && key === draggingColumnId) {
                        
                        const newContent = reorder(columns[key].contents, source.index, destination.index);
    
                        columns[key].contents = newContent;
                    }
                }
                
                dispatchStore({
                    type: actionType.UPDATE_COLUMN,
                    payload: {
                        id: id,
                        values: columns
                    }
                });

            } else {
                const sourceCharacterArray = source.droppableId.split('-');
                const sourceColumnId = sourceCharacterArray[sourceCharacterArray.length - 1];

                const destinationCharacterArray = destination.droppableId.split('-');
                const destinationColumnId = destinationCharacterArray[destinationCharacterArray.length - 1];

                const sourceContents = [...columns[sourceColumnId].contents];
                const destinationContents = [...columns[destinationColumnId].contents];

                const [removed] = sourceContents.splice(source.index, 1);

                destinationContents.splice(destination.index, 0, removed);

                columns[sourceColumnId].contents = [...sourceContents]; 
                columns[destinationColumnId].contents = [...destinationContents];

                dispatchStore({
                    type: actionType.UPDATE_COLUMN,
                    payload: {
                        id: id,
                        values: columns
                    }
                });
                
            }
        }

    };

    const getItemStyle = (isDragging, draggableStyle) => {
        return {
            background: isDragging ? '#D7AEB5' : styleBody.backgroundColor,       
            ...draggableStyle
        };
    };

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <div 
                className={classnames(styles['outer-content'])}
                onClick={onClickWorkspace}
            >
                <Droppable droppableId='droppable-rows' type='rows'>
                    {(provided) => (

                        <div 
                            id={id}
                            className={classnames(
                                classTitle, 
                                styles['inner-content'],
                                {[styles['inner-content-layout-mobile']]: viewMode === CONSTANTS.VIEW_MODE.MOBILE}
                            )}
                            style={styleBody}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <div className={'layer-group-row'}>
                                {renderRow()}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default Workspace;