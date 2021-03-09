import React, {Fragment, useContext} from 'react';
import classnames from 'classnames';
import styles from 'Components/design-template/components/Workspace/styles.module.scss';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {nestedData, designData} from 'Components/design-template/components/Workspace/constants';
import {getObjectPropSafely} from 'Utils';
import Row from 'Components/design-template/components/Workspace/components/Row';
import {CONSTANTS} from 'Components/design-template/constants';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {hierarchyDesignData} from 'Components/design-template/components/Workspace/utils';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

const Workspace = () => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {viewMode} = store;

    // console.log(nestedData, 'nestedData');
    // console.log(hierarchyDesignData(designData), 'hierarchyDesignData');
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
                <Draggable key={index} draggableId={`draggable-row-${index}`} index={index}>
                    {(provided, snapshot) => (
                        <div 
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                            // {...provided.dragHandleProps}
                        >
                            <Row 
                                data={row} 
                                generalStyle={generalStyle}
                                rowIndex={index}
                                provided={provided}
                            />
                        </div>
                    )}
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

    const onDragEnd = (result) => {
        //
    };

    const getItemStyle = (isDragging, draggableStyle) => {
        return {
            background: isDragging ? '#D7AEB5' : styleBody.backgroundColor,       
            ...draggableStyle
        };
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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