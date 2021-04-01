import React, {Fragment, useContext} from 'react';
import classnames from 'classnames';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import Row from 'Components/design-template/components/Workspace/components/Row';
import styles from 'Components/design-template/components/Workspace/styles.module.scss';
import {CONSTANTS} from 'Components/design-template/constants';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {
    hierarchyDesignData
} from 'Components/design-template/components/Workspace/utils';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import {Icon} from '@antscorp/components';

const Workspace = (props) => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {viewMode, activeElement} = store;
    const nestedData = hierarchyDesignData(store);
    const {
        typeOfIsDragging,
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
        activeRowIndex
    } = props;

    console.log('store', store);

    const id = getObjectPropSafely(() => nestedData.body.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => nestedData.body.values._meta.htmlClassNames);
    const styleBody = {
        minHeight: 'max-content',
        backgroundColor: getObjectPropSafely(() => nestedData.body.values.backgroundColor),
        fontFamily: getObjectPropSafely(() => nestedData.body.values.fontFamily.value)
    };

    // const [activeRowIndex, setActiveRowIndex] = useState(-1);
    // const [rowDragItHereIndex, setDragItHereIndex] = useState(-1);
    
    // const [rowAreaPosition, setRowAreaPosition] = useState('');
    // const [destinationRowIdx, setDestinationRowIdx] = useState(-1);

    // const [rowContentDragItHereIndex, setRowContentDragItHereIndex] = useState(-1);
    // const [columnContentDragItHereIndex, setColumnContentDragItHereIndex] = useState(-1);
    // const [contentDragItHereIndex, setContentDragItHereIndex] = useState(-1);
    // const [contentDragItHereArea, setContentDragItHereArea] = useState('');

    // const [sourceIndexes, setSourceIndexes] = useState({
    //     rowIdx: -1,
    //     columnIdx: -1,
    //     contentIdx: -1
    // });

    // const [noContentRowIndex, setNoContentRowIndex] = useState(-1);
    // const [noContentColumnIndex, setNoContentColumnIndex] = useState(-1);
    // const [noContentClassName, setNoContentClassName] = useState('');

    // const [typeOfIsDragging, setTypeOfIsDragging] = useState('');

    // const getActiveRowIndex = (index) => {
    //     setActiveRowIndex(index);
    // };

    // const getDragItHereRowIndexes = (rowIndex, destinationRowIdx, rowArea) => {
    //     setDragItHereIndex(rowIndex); 
    //     setRowAreaPosition(rowArea);
    //     setDestinationRowIdx(destinationRowIdx);
    // };

    // const getDragItHereContentIndexes = (rowIndex, columnIndex, contentIndex, contentArea) => {
    //     if (rowIndex) {
    //         setRowContentDragItHereIndex(rowIndex);
    //         setColumnContentDragItHereIndex(columnIndex);
    //         setContentDragItHereIndex(contentIndex);
    //         setContentDragItHereArea(contentArea);
    //     }
    // };

    // const getSourceIndexes = ({rowIdx, columnIdx, contentIdx}) => {
    //     if (rowIdx !== -1) {
    //         setSourceIndexes({
    //             rowIdx,
    //             columnIdx,
    //             contentIdx
    //         });
    //     }
    // };

    // const getNoContentIndexes = (rowIdx, columnIdx, classNameCompare) => {
    //     if (rowIdx && columnIdx) {
    //         setNoContentRowIndex(rowIdx);
    //         setNoContentColumnIndex(columnIdx);
    //         setNoContentClassName(classNameCompare);
    //     } 
    // }; 

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
                                typeOfIsDragging={typeOfIsDragging}
                                getSourceIndexes={getSourceIndexes}
                                getNoContentIndexes={getNoContentIndexes}
                                getDragItHereRowIndexes={getDragItHereRowIndexes}
                                getDragItHereContentIndexes={getDragItHereContentIndexes}
                                getActiveRowIndex={getActiveRowIndex}
                                activeRowIndex={activeRowIndex}
                                noContentClassName={noContentClassName}
                                rowDraggingIndex={rowDraggingIndex}
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
                                                typeOfIsDragging={typeOfIsDragging}
                                                getSourceIndexes={getSourceIndexes}
                                                getNoContentIndexes={getNoContentIndexes}
                                                getDragItHereRowIndexes={getDragItHereRowIndexes}
                                                getDragItHereContentIndexes={getDragItHereContentIndexes}
                                                getActiveRowIndex={getActiveRowIndex}
                                                noContentClassName={noContentClassName}
                                                activeRowIndex={activeRowIndex}
                                                rowDraggingIndex={rowDraggingIndex}
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

    // const findEndIndex = (sourceIndex, destinationIndex, area) => {
    //     let endIndex = -1;

    //     if (sourceIndex > destinationIndex) {
    //         switch (area) {
    //             case 'above': endIndex = destinationIndex; break;
    //             case 'below': endIndex = destinationIndex + 1; break;
    //             default: break;
    //         }
    //     } else if (sourceIndex === destinationIndex) {
    //         switch (area) {
    //             case 'above': endIndex = destinationIndex; break;
    //             case 'below': endIndex = destinationIndex; break;
    //             default: break;
    //         }
    //     } else {
    //         switch (area) {
    //             case 'above': endIndex = destinationIndex - 1; break;
    //             case 'below': endIndex = destinationIndex; break;
    //             default: break;
    //         } 
    //     }
    //     return endIndex;
    // };

    // const setNewRowList = (data, destinationRowIdx, currentRowIdx, areaPosition) => {
    //     const bodies = {...data.bodies};
    //     const rows = getRowsFromBodies(bodies);

    //     if (destinationRowIdx) {
    //         const endIndex = findEndIndex(currentRowIdx, destinationRowIdx, areaPosition);
    
    //         const newRows = reorder(rows, currentRowIdx, endIndex);
    //         const bodyId = Object.keys(bodies)[0];
    
    //         const newBodies = produce(bodies, draft => {
    //             draft[bodyId].rows = [...newRows];
    //         });
    
    //         dispatchStore({
    //             type: actionType.UPDATE_BODY,
    //             payload: {
    //                 bodies: newBodies
    //             }
    //         });
    //     }
    // };

    // const setNewContentListInColumn = (data, sourceIndexes, destinationContentIndex, area) => {
    //     const {rowIdx, columnIdx, contentIdx} = sourceIndexes;
    //     const sourceRowID = getRowId(data, rowIdx);
    //     const sourceColumnId = getColumnId(store, sourceRowID, columnIdx);
        
    //     const endIndex = findEndIndex(contentIdx, destinationContentIndex, area);

    //     const contents = getObjectPropSafely(() => data.columns[sourceColumnId].contents); 
    //     const newContents = reorder(contents, contentIdx, endIndex);

    //     const columns = getObjectPropSafely(() => data.columns);
    //     const newColumns = produce(columns, draft => {
    //         draft[sourceColumnId].contents =  newContents;
    //     });

    //     dispatchStore({
    //         type: actionType.UPDATE_COLUMN,
    //         payload: {
    //             id: id,
    //             values: newColumns
    //         }
    //     });
    // };

    // const setNewContentListInBody = (data, source, destination) => {
    //     const {rowIdx, columnIdx, contentIdx} = source;
    //     const {destinationRowIndex, destinationColumnIndex, destinationContentIndex, destinationContentArea} = destination;
        
    //     const sourceRowID = getRowId(data, rowIdx);
    //     const destinationRowID = getRowId(data, destinationRowIndex);
    //     const sourceColumnId = getColumnId(data, sourceRowID, columnIdx);
    //     const destinationColumnId = getColumnId(data, destinationRowID, destinationColumnIndex);
    //     const sourceContentId = getContentId(data, sourceColumnId, contentIdx);

    //     const sourceContents = getObjectPropSafely(() => data.columns[sourceColumnId].contents);
    //     const destinationContents = getObjectPropSafely(() => data.columns[destinationColumnId].contents);

    //     let endIndex = -1;
    
    //     switch (destinationContentArea) {
    //         case 'above': endIndex = destinationContentIndex; break;
    //         case 'below': endIndex = destinationContentIndex + 1; break;
    //         default: break;
    //     }

    //     const newSourceContents = produce(sourceContents, draft => {
    //         draft.splice(contentIdx, 1);
    //     });

    //     if (endIndex !== -1) {
    //         const newDestinationContents = produce(destinationContents, draft => {
    //             draft.splice(endIndex, 0, sourceContentId );
    //         });

    //         const columns = getObjectPropSafely(() => data.columns);

    //         const newColumns = produce(columns, draft => {
    //             draft[sourceColumnId].contents = newSourceContents;
    //             draft[destinationColumnId].contents = newDestinationContents;
    //         });

    //         dispatchStore({
    //             type: actionType.UPDATE_COLUMN,
    //             payload: {
    //                 id: id,
    //                 values: newColumns
    //             }
    //         });
    //     }

    // };

    // const setNewContentListWhileNoContent = (data, source, destination) => {
    //     const {rowIdx, columnIdx, contentIdx} = source;
    //     const {desRowIndex, desColumnIndex, desContentIndex} = destination;

    //     const sourceRowID = getRowId(data, rowIdx);
    //     const sourceColumnId = getColumnId(data, sourceRowID, columnIdx);
    //     const columns = getObjectPropSafely(() => data.columns);

    //     const destinationRowID = getRowId(data, desRowIndex);
    //     const destinationColumnId = getColumnId(data, destinationRowID, desColumnIndex);

    //     const newColumns = produce(columns, draft => {
    //         const [removed] = draft[sourceColumnId].contents.splice(contentIdx, 1);

    //         draft[destinationColumnId].contents.push(removed);
    //     });

    //     dispatchStore({
    //         type: actionType.UPDATE_COLUMN,
    //         payload: {
    //             id: id,
    //             values: newColumns
    //         }
    //     });
        
    // };

    // const onDragEnd = () => {

    //     switch (typeOfIsDragging) {
    //         case 'rows': setNewRowList(store, destinationRowIdx, sourceIndexes.rowIdx, rowAreaPosition);
    //             break;
    //         case 'contents': 
    //             const {rowIdx, columnIdx} = sourceIndexes;

    //             if (noContentClassName) {
    //                 setNewContentListWhileNoContent(store, sourceIndexes, {desRowIndex: noContentRowIndex, desColumnIndex: noContentColumnIndex, desContentIndex: 0});
    //             } else {
    //                 if (columnIdx === columnContentDragItHereIndex && rowIdx === rowContentDragItHereIndex) {               
    //                     setNewContentListInColumn(store, sourceIndexes, contentDragItHereIndex, contentDragItHereArea);
    //                 } else {
    //                     if (rowContentDragItHereIndex !== -1) {
    //                         setNewContentListInBody(store, sourceIndexes, {
    //                             destinationRowIndex: rowContentDragItHereIndex, 
    //                             destinationColumnIndex: columnContentDragItHereIndex, 
    //                             destinationContentIndex: contentDragItHereIndex,
    //                             destinationContentArea: contentDragItHereArea
    //                         });
    //                     }
    //                 }
    //             }
    //             break;
    //         default: break;
    //     }

    //     setTypeOfIsDragging('');
    //     setDragItHereIndex(-1);
    //     setRowContentDragItHereIndex(-1);
    //     setColumnContentDragItHereIndex(-1);
    //     setContentDragItHereIndex(-1);
    //     setContentDragItHereArea('');
    //     setNoContentClassName('');
    // };

    // const onDragStart = (provided) => {
    //     if (provided.draggableId) {
    //         if (provided.type === 'rows') {
    //             setTypeOfIsDragging('rows');
    //         } else {
    //             setTypeOfIsDragging('contents');
    //         }

    //     }
    // };

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

    return (
        // <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div 
            className={classnames(styles['outer-content'])}
            // onClick={onClickWorkspace}
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
        // </DragDropContext>
    );
};

export default Workspace;