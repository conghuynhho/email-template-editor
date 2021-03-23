import React, {Fragment, useContext, useState} from 'react';
import classnames from 'classnames';
import styles from 'Components/design-template/components/Workspace/styles.module.scss';
import {StoreContext} from 'Components/design-template/components/ContextStore';
// import {nestedData as NSData, designData} from 'Components/design-template/components/Workspace/constants';
import {getObjectPropSafely} from 'Utils';
import Row from 'Components/design-template/components/Workspace/components/Row';
import {CONSTANTS} from 'Components/design-template/constants';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {hierarchyDesignData, reorder, getRowsFromBodies, getRowId, getColumnId, getContentId} from 'Components/design-template/components/Workspace/utils';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {Icon} from '@antscorp/components';
import produce from 'immer';

const Workspace = () => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {viewMode, bodies = {}, columns = {}, draggingColumnId = -1, rowVisiblePosition = {}} = store;
    const nestedData = hierarchyDesignData(store);

    console.log('store', store);

    const id = getObjectPropSafely(() => nestedData.body.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => nestedData.body.values._meta.htmlClassNames);
    const styleBody = {
        minHeight: 'max-content',
        backgroundColor: getObjectPropSafely(() => nestedData.body.values.backgroundColor),
        fontFamily: getObjectPropSafely(() => nestedData.body.values.fontFamily.value)
    };
    const [rowDragItHereIndex, setDragItHereIndex] = useState(-1);
    
    const [rowAreaPosition, setRowAreaPosition] = useState('');
    const [destinationRowIdx, setDestinationRowIdx] = useState(-1);

    const [rowContentDragItHereIndex, setRowContentDragItHereIndex] = useState(-1);
    const [columnContentDragItHereIndex, setColumnContentDragItHereIndex] = useState(-1);
    const [contentDragItHereIndex, setContentDragItHereIndex] = useState(-1);
    const [contentDragItHereArea, setContentDragItHereArea] = useState('');

    // const [sourceRowIndex, setSourceRowIndex] = useState(-1);
    // const [sourceColumnIndex, setSourceColumnIndex] = useState(-1); 
    // const [sourceContentIndex, setSourceContentIndex] = useState(-1);

    const [sourceIndexes, setSourceIndexes] = useState({
        rowIdx: -1,
        columnIdx: -1,
        contentIdx: -1
    });

    const [typeOfIsDragging, setTypeOfIsDragging] = useState('');

    const getDragItHereIndex = (type, rowIndex, columnIndex, contentIndex, area, destinationRowIdx, rowAreaPosition) => {
        
        switch (type) {
            case 'draggingRow':
                setDragItHereIndex(rowIndex); 
                setRowAreaPosition(rowAreaPosition);
                setDestinationRowIdx(destinationRowIdx);
                break;
            case 'draggingContent':
                setRowContentDragItHereIndex(rowIndex);
                setColumnContentDragItHereIndex(columnIndex);
                setContentDragItHereIndex(contentIndex);
                setContentDragItHereArea(area);
                break;
            default: break; 
        }
        
    };

    // const getDraggingRowIndex = (index) => {
    //     setSourceRowIndex(index);
    // };

    // const getSourceDraggingColumn = (index) => {
    //     if (index !== -1) {
    //         setSourceColumnIndex(index);
    //     }
    // };

    // const getSourceDraggingContent = (index) => {
    //     if (index !== -1) {
    //         setSourceContentIndex(index);
    //     }
    // };

    const getSourceIndexes = ({rowIdx, columnIdx, contentIdx}) => {
        if (rowIdx !== -1) {
            setSourceIndexes({
                rowIdx,
                columnIdx,
                contentIdx
            });
        }
    };

    const renderRow = (snapshot) => {
        const rows = getObjectPropSafely(() => nestedData.body.rows);
        const generalStyle = getObjectPropSafely(() => nestedData.body.values);

        return rows.map((row, index) => {
            const shouldRenderClone = `draggable-row-${index}` === snapshot.draggingFromThisWith;

            return (
                <Fragment key={index}>
                    {shouldRenderClone ? (
                        <div>
                            <Row 
                                data={row} 
                                generalStyle={generalStyle}
                                rowIndex={index}  
                                getDragItHereIndex={getDragItHereIndex}
                                rowDragItHereIndex={rowDragItHereIndex}   
                                rowContentDragItHereIndex={rowContentDragItHereIndex}
                                columnContentDragItHereIndex={columnContentDragItHereIndex}
                                contentDragItHereIndex={contentDragItHereIndex}
                                contentDragItHereArea={contentDragItHereArea}
                                typeOfIsDragging={typeOfIsDragging}
                                // getDraggingRowIndex={getDraggingRowIndex}
                                // getSourceDraggingColumn={getSourceDraggingColumn}
                                // getSourceDraggingContent={getSourceDraggingContent}
                                getSourceIndexes={getSourceIndexes}
                            />
                        </div>
                    ) : (

                        <Draggable 
                            
                            draggableId={`draggable-row-${index}`} 
                            index={index}>
                            {(provided, snapshot) => {
                                
                                return (
                                    <>
                                        <div 
                                            ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            style={{
                                                ...getItemStyle(false, getObjectPropSafely(() => provided.draggableProps.style)),
                                                ...(true && {transform: 'none'}),
                                                ...(snapshot.isDropAnimating && {transitionDuration: '0.001s'})
                                            }}
                                        >
                                            <Row 
                                                data={row} 
                                                generalStyle={generalStyle}
                                                rowIndex={index}
                                                provided={provided}
                                                getDragItHereIndex={getDragItHereIndex}
                                                rowDragItHereIndex={rowDragItHereIndex}
                                                rowContentDragItHereIndex={rowContentDragItHereIndex}
                                                columnContentDragItHereIndex={columnContentDragItHereIndex}
                                                contentDragItHereIndex={contentDragItHereIndex}
                                                contentDragItHereArea={contentDragItHereArea}
                                                typeOfIsDragging={typeOfIsDragging}
                                                // getDraggingRowIndex={getDraggingRowIndex}
                                                // getSourceDraggingColumn={getSourceDraggingColumn}
                                                // getSourceDraggingContent={getSourceDraggingContent}
                                                getSourceIndexes={getSourceIndexes}
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

    const onClickWorkspace = () => {
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {activeElement: 'u_body'}
        });
    };

    const setNewRowList = (data, destinationRowIdx, currentRowIdx, areaPosition) => {
        const bodies = {...data.bodies};
        const rows = getRowsFromBodies(bodies);

        if (destinationRowIdx) {
            let endIndex = -1;
    
            if (currentRowIdx > destinationRowIdx) {
                switch (areaPosition) {
                    case 'above': endIndex = destinationRowIdx; break;
                    case 'below': endIndex = destinationRowIdx + 1; break;
                    default: break;
                }
            } else if (currentRowIdx === destinationRowIdx) {
                switch (areaPosition) {
                    case 'above': endIndex = destinationRowIdx; break;
                    case 'below': endIndex = destinationRowIdx; break;
                    default: break;
                }
            } else {
                switch (areaPosition) {
                    case 'above': endIndex = destinationRowIdx - 1; break;
                    case 'below': endIndex = destinationRowIdx; break;
                    default: break;
                } 
            }
    
            const newRows = reorder(rows, currentRowIdx, endIndex);
            const bodyId = Object.keys(bodies)[0];
    
            const newBodies = produce(bodies, draft => {
                draft[bodyId].rows = [...newRows];
            });
    
            dispatchStore({
                type: actionType.UPDATE_BODY,
                payload: {
                    bodies: newBodies
                }
            });
        }
    };

    const setNewContentList = (data, sourceIndexes, destinationContentIndex, area) => {
        const {rowIdx, columnIdx, contentIdx} = sourceIndexes;
        const sourceRowID = getRowId(data, rowIdx);
        const sourceColumnId = getColumnId(store, sourceRowID, columnIdx);
        let endIndex = -1;
    
        if (contentIdx > destinationContentIndex) {
            switch (area) {
                case 'above': endIndex = destinationContentIndex; break;
                case 'below': endIndex = destinationContentIndex + 1; break;
                default: break;
            }
        } else if (contentIdx === destinationContentIndex) {
            switch (area) {
                case 'above': endIndex = destinationContentIndex; break;
                case 'below': endIndex = destinationContentIndex; break;
                default: break;
            }
        } else {
            switch (area) {
                case 'above': endIndex = destinationContentIndex - 1; break;
                case 'below': endIndex = destinationContentIndex; break;
                default: break;
            }
        }

        const contents = getObjectPropSafely(() => data.columns[sourceColumnId].contents); 
        const newContents = reorder(contents, contentIdx, endIndex);

        const columns = getObjectPropSafely(() => data.columns);
        const newColumns = produce(columns, draft => {
            draft[sourceColumnId].contents =  newContents;
        });

        dispatchStore({
            type: actionType.UPDATE_COLUMN,
            payload: {
                id: id,
                values: newColumns
            }
        });
    };

    const setNewContentListCaseDiff = (data, source, destination) => {
        // const {sourceRowIndex, sourceColumnIndex, sourceContentIndex} = source;
        const {rowIdx, columnIdx, contentIdx} = source;
        const {destinationRowIndex, destinationColumnIndex, destinationContentIndex, destinationContentArea} = destination;
        
        const sourceRowID = getRowId(data, rowIdx);
        const destinationRowID = getRowId(data, destinationRowIndex);
        const sourceColumnId = getColumnId(data, sourceRowID, columnIdx);
        const destinationColumnId = getColumnId(data, destinationRowID, destinationColumnIndex);
        const sourceContentId = getContentId(data, sourceColumnId, contentIdx);

        const sourceContents = getObjectPropSafely(() => data.columns[sourceColumnId].contents);
        const destinationContents = getObjectPropSafely(() => data.columns[destinationColumnId].contents);

        let endIndex = -1;
    
        switch (destinationContentArea) {
            case 'above': endIndex = destinationContentIndex; break;
            case 'below': endIndex = destinationContentIndex + 1; break;
            default: break;
        }

        const newSourceContents = produce(sourceContents, draft => {
            draft.splice(contentIdx, 1);
        });

        if (endIndex !== -1) {
            const newDestinationContents = produce(destinationContents, draft => {
                draft.splice(endIndex, 0, sourceContentId );
            });

            const columns = getObjectPropSafely(() => data.columns);

            const newColumns = produce(columns, draft => {
                draft[sourceColumnId].contents = newSourceContents;
                draft[destinationColumnId].contents = newDestinationContents;
            });

            dispatchStore({
                type: actionType.UPDATE_COLUMN,
                payload: {
                    id: id,
                    values: newColumns
                }
            });
        }

    };

    const onDragEnd = (result) => {

        if (typeOfIsDragging === 'rows') {
            setNewRowList(store, destinationRowIdx, sourceIndexes.rowIdx, rowAreaPosition);
        } 
        if (typeOfIsDragging === 'contents') {
            const {rowIdx, columnIdx} = sourceIndexes;

            if (columnIdx === columnContentDragItHereIndex && rowIdx === rowContentDragItHereIndex) {               
                setNewContentList(store, sourceIndexes, contentDragItHereIndex, contentDragItHereArea);
            } else {
                if (rowContentDragItHereIndex !== -1) {
                    setNewContentListCaseDiff(
                        store, 
                        sourceIndexes, 
                        {
                            destinationRowIndex: rowContentDragItHereIndex, 
                            destinationColumnIndex: columnContentDragItHereIndex, 
                            destinationContentIndex: contentDragItHereIndex,
                            destinationContentArea: contentDragItHereArea
                        }
                    );
                }
            }
            
        }

        setTypeOfIsDragging('');
        setDragItHereIndex(-1);
        setRowContentDragItHereIndex(-1);
        setColumnContentDragItHereIndex(-1);
        setContentDragItHereIndex(-1);
        setContentDragItHereArea('');

    };

    const onDragStart = (provided) => {
        if (provided.draggableId) {
            if (provided.type === 'rows') {
                setTypeOfIsDragging('rows');
            } else {
                setTypeOfIsDragging('contents');
            }

        }
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

    const getItemStyleClone = (isDragging, draggableStyle) => {
        return {
            ...draggableStyle,
            width: 20,
            display: 'flex',
            alignItems: 'center',
            animation: 'none'
        };
    };

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div 
                className={classnames(styles['outer-content'])}
                onClick={onClickWorkspace}
            >
                <Droppable 
                    droppableId='droppable-rows' 
                    type='rows'
                    renderClone={(provided, snapshot) => {

                        return (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={getItemStyleClone(snapshot.isDragging, provided.draggableProps.style)}
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
        </DragDropContext>
    );
};

export default Workspace;