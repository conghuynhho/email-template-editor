import React, {Fragment, useContext} from 'react';
import classnames from 'classnames';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import Row from 'Components/design-template/components/Workspace/components/Row';
import styles from 'Components/design-template/components/Workspace/styles.module.scss';
import {CONSTANTS, typeDnD} from 'Components/design-template/constants';
import {hierarchyDesignData} from 'Components/design-template/components/Workspace/utils';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {Icon} from '@antscorp/components';
import {getObjectPropSafely} from 'Utils';
// import {exportHTML} from 'Components/design-template/components/SidePanel/utils.js';

const Workspace = (props) => {
    const {state: store, dispatch: dispatchStore} = useContext(StoreContext);
    const {viewMode, activeElement} = store;
    const nestedData = hierarchyDesignData(store);
    
    console.log('store', store);
    console.log(nestedData, 'nestedData');
    // console.log(exportHTML(nestedData));
    const {
        typeDraggingWorkspace = '',
        getSourceIndexes,
        getNoContentIndexes,
        getDragItHereRowIndexes,
        getDragItHereContentIndexes,
        rowDragItHereIndex,
        rowContentDragItHereIndex,
        columnContentDragItHereIndex,
        contentDragItHereIndex,
        contentDragItHereArea,
        noContentClassName,
        rowDraggingIndex,
        getActiveRowIndex,
        activeRowIndex,
        typeDragDropSidePanel,
        targetElement
    } = props;

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
            const shouldRenderClone = `draggable-row-${index}` === snapshot.draggingFromThisWith;

            return (
                <Fragment key={index}>
                    {shouldRenderClone ? (
                        <div style={activeElement && activeElement.includes('row') ? {} : {border: '2px solid #13ABD7'}}>
                            <Row 
                                data={row} 
                                generalStyle={generalStyle}
                                rowIndex={index}  
                                rowDragItHereIndex={rowDragItHereIndex}   
                                rowContentDragItHereIndex={rowContentDragItHereIndex}
                                columnContentDragItHereIndex={columnContentDragItHereIndex}
                                contentDragItHereIndex={contentDragItHereIndex}
                                contentDragItHereArea={contentDragItHereArea}
                                typeDraggingWorkspace={typeDraggingWorkspace}
                                getSourceIndexes={getSourceIndexes}
                                getNoContentIndexes={getNoContentIndexes}
                                getDragItHereRowIndexes={getDragItHereRowIndexes}
                                getDragItHereContentIndexes={getDragItHereContentIndexes}
                                getActiveRowIndex={getActiveRowIndex}
                                activeRowIndex={activeRowIndex}
                                noContentClassName={noContentClassName}
                                rowDraggingIndex={rowDraggingIndex}
                                typeDragDropSidePanel={typeDragDropSidePanel}
                                targetElement={targetElement}
                            />
                        </div>
                    ) : (

                        <Draggable 
                            
                            draggableId={`draggable-row-${index}`} 
                            index={index}>
                            {(provided) => {
                                
                                return (
                                    <>
                                        <div 
                                            ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            style={{
                                                ...getItemStyle(false, getObjectPropSafely(() => provided.draggableProps.style)),
                                                transform: 'none'
                                            }}
                                        >
                                            <Row 
                                                data={row} 
                                                generalStyle={generalStyle}
                                                rowIndex={index}
                                                provided={provided}
                                                rowDragItHereIndex={rowDragItHereIndex}
                                                rowContentDragItHereIndex={rowContentDragItHereIndex}
                                                columnContentDragItHereIndex={columnContentDragItHereIndex}
                                                contentDragItHereIndex={contentDragItHereIndex}
                                                contentDragItHereArea={contentDragItHereArea}
                                                typeDraggingWorkspace={typeDraggingWorkspace}
                                                getSourceIndexes={getSourceIndexes}
                                                getNoContentIndexes={getNoContentIndexes}
                                                getDragItHereRowIndexes={getDragItHereRowIndexes}
                                                getDragItHereContentIndexes={getDragItHereContentIndexes}
                                                getActiveRowIndex={getActiveRowIndex}
                                                noContentClassName={noContentClassName}
                                                activeRowIndex={activeRowIndex}
                                                rowDraggingIndex={rowDraggingIndex}
                                                typeDragDropSidePanel={typeDragDropSidePanel}
                                                targetElement={targetElement}
                                            />
                                            
                                        </div>
                                        
                                    </>
                                );
                            }}
                        </Draggable>
                    )}
                </Fragment>
            );       
        }); 
    };

    const getItemStyle = (isDragging, draggableStyle) => {
        return {      
            ...draggableStyle,
            ...(isDragging && {
                display: 'flex',
                alignItems: 'center',
                width: 18 
            })
        };
    };

    const getItemStyleClone = (snapshot, draggableStyle) => {
        
        return {
            ...draggableStyle,
            width: 20,
            display: 'flex',
            alignItems: 'center',
            ...(snapshot.isDropAnimating && {
                transitionDuration: '0.001s'
            })
        };
    };

    const onClickWorkspace = () => {
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {
                activeElement: 'u_body',
                isEditing: false
            }
        });
    };

    return (
        <div 
            className={classnames(styles['outer-content'])}
            onClick={onClickWorkspace}
        >
            <Droppable 
                droppableId='droppable-rows' 
                type={typeDnD.WORKSPACE.ROW}
                renderClone={(provided, snapshot) => {

                    return (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={getItemStyleClone(snapshot, provided.draggableProps.style)}
                        >   
                            <span style={{backgroundColor: '#13ABD7', padding: '0 6px 4px', borderRadius: '50%'}}>
                                <Icon type='icon-ants-add' style={{color: '#fff'}} /> 
                            </span>
                        </div>
                    );
                }}
            >
                {(provided, snapshot) => {
                    return (
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
                                {renderRow(snapshot)}
                                {provided.placeholder}
                            </div>
                        </div>
                    );}}
            </Droppable>
        </div>
    );
};

export default Workspace;