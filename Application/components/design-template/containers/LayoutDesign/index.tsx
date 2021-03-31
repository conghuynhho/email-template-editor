import React, {useContext, useState, useEffect} from 'react';
import classnames from 'classnames';
import SidePanel from 'Components/design-template/components/SidePanel';
import Workspace from 'Components/design-template/components/Workspace';
import ShortcutBar from 'Components/design-template/components/ShortcutBar';
import DeleteForm from 'Components/design-template/components/DeleteForm';
import styles from 'Components/design-template/containers/LayoutDesign/styles.module.scss';
import {StateProvider} from 'Components/design-template/components/ContextStore';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {CONSTANTS} from 'Components/design-template/constants';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {DragDropContext} from 'react-beautiful-dnd';
import {
    reorder, 
    getRowsFromBodies, 
    getRowId, 
    getColumnId, 
    getContentId
} from 'Components/design-template/components/Workspace/utils';
import {getObjectPropSafely} from 'Utils';
import produce from 'immer';

const LayoutDesign = () => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {sidePanelMode, toggleDeleteForm = {isDeleteFormOpening: false, type: ''}} = store;

    const [typeOfIsDragging, setTypeOfIsDragging] = useState('');
    const [sourceIndexes, setSourceIndexes] = useState({
        rowIdx: -1,
        columnIdx: -1,
        contentIdx: -1
    });
    const [rowDragItHereIndex, setDragItHereIndex] = useState(-1);
    
    const [rowAreaPosition, setRowAreaPosition] = useState('');
    const [destinationRowIdx, setDestinationRowIdx] = useState(-1);

    const [rowContentDragItHereIndex, setRowContentDragItHereIndex] = useState(-1);
    const [columnContentDragItHereIndex, setColumnContentDragItHereIndex] = useState(-1);
    const [contentDragItHereIndex, setContentDragItHereIndex] = useState(-1);
    const [contentDragItHereArea, setContentDragItHereArea] = useState('');
    const [noContentRowIndex, setNoContentRowIndex] = useState(-1);
    const [noContentColumnIndex, setNoContentColumnIndex] = useState(-1);
    const [noContentClassName, setNoContentClassName] = useState('');
    const [activeRowIndex, setActiveRowIndex] = useState(-1);
    const [isDraggingSidePanel, setIsDraggingSidePanel] = useState(false);
    const [element, setElement] = useState('');

    useEffect(() => {
        // if (!isDraggingSidePanel) {
        //     return () => window.removeEventListener('mousemove', onMouseMoveItem);
        // }
    });

    const getDragItHereRowIndexes = (rowIndex, destinationRowIdx, rowArea) => {
        setDragItHereIndex(rowIndex); 
        setRowAreaPosition(rowArea);
        setDestinationRowIdx(destinationRowIdx);
    };

    const getDragItHereContentIndexes = (rowIndex, columnIndex, contentIndex, contentArea) => {
        if (rowIndex) {
            setRowContentDragItHereIndex(rowIndex);
            setColumnContentDragItHereIndex(columnIndex);
            setContentDragItHereIndex(contentIndex);
            setContentDragItHereArea(contentArea);
        }
    };

    const getSourceIndexes = ({rowIdx, columnIdx, contentIdx}) => {
        if (rowIdx !== -1) {
            setSourceIndexes({
                rowIdx,
                columnIdx,
                contentIdx
            });
        }
    };

    const getNoContentIndexes = (rowIdx, columnIdx, classNameCompare) => {
        if (rowIdx && columnIdx) {
            setNoContentRowIndex(rowIdx);
            setNoContentColumnIndex(columnIdx);
            setNoContentClassName(classNameCompare);
        } 
    }; 

    const getActiveRowIndex = (index) => {
        setActiveRowIndex(index);
    };

    const findEndIndex = (sourceIndex, destinationIndex, area) => {
        let endIndex = -1;

        if (sourceIndex > destinationIndex) {
            switch (area) {
                case 'above': endIndex = destinationIndex; break;
                case 'below': endIndex = destinationIndex + 1; break;
                default: break;
            }
        } else if (sourceIndex === destinationIndex) {
            switch (area) {
                case 'above': endIndex = destinationIndex; break;
                case 'below': endIndex = destinationIndex; break;
                default: break;
            }
        } else {
            switch (area) {
                case 'above': endIndex = destinationIndex - 1; break;
                case 'below': endIndex = destinationIndex; break;
                default: break;
            } 
        }
        return endIndex;
    };

    const setNewRowList = (data, destinationRowIdx, currentRowIdx, areaPosition) => {
        const bodies = {...data.bodies};
        const rows = getRowsFromBodies(bodies);

        if (destinationRowIdx) {
            const endIndex = findEndIndex(currentRowIdx, destinationRowIdx, areaPosition);
    
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

    const setNewContentListInColumn = (data, sourceIndexes, destinationContentIndex, area) => {
        const {rowIdx, columnIdx, contentIdx} = sourceIndexes;
        const sourceRowID = getRowId(data, rowIdx);
        const sourceColumnId = getColumnId(store, sourceRowID, columnIdx);
        
        const endIndex = findEndIndex(contentIdx, destinationContentIndex, area);

        const contents = getObjectPropSafely(() => data.columns[sourceColumnId].contents); 
        const newContents = reorder(contents, contentIdx, endIndex);

        const columns = getObjectPropSafely(() => data.columns);
        const newColumns = produce(columns, draft => {
            draft[sourceColumnId].contents =  newContents;
        });

        dispatchStore({
            type: actionType.UPDATE_COLUMN,
            payload: {
                id: 'u_body',
                values: newColumns
            }
        });
    };

    const setNewContentListInBody = (data, source, destination) => {
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
                    id: 'u_body',
                    values: newColumns
                }
            });
        }

    };

    const setNewContentListWhileNoContent = (data, source, destination) => {
        const {rowIdx, columnIdx, contentIdx} = source;
        const {desRowIndex, desColumnIndex} = destination;

        const sourceRowID = getRowId(data, rowIdx);
        const sourceColumnId = getColumnId(data, sourceRowID, columnIdx);
        const columns = getObjectPropSafely(() => data.columns);

        const destinationRowID = getRowId(data, desRowIndex);
        const destinationColumnId = getColumnId(data, destinationRowID, desColumnIndex);

        const newColumns = produce(columns, draft => {
            const [removed] = draft[sourceColumnId].contents.splice(contentIdx, 1);

            draft[destinationColumnId].contents.push(removed);
        });

        dispatchStore({
            type: actionType.UPDATE_COLUMN,
            payload: {
                id: 'u_body',
                values: newColumns
            }
        });
        
    };

    const onClickWorkspace = () => {
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {activeElement: 'u_body'}
        });
    };

    const onMouseMoveItem = (e) => {
        if (isDraggingSidePanel) {
            
            if (e.target.id.includes('row') || e.target.id.includes('content')) {
                setElement(e.target.id);
            }
        }
    };

    console.log('element', element);

    const onDragStart = (provided) => {

        if (provided.draggableId) {
            switch (provided.type) {
                case 'rows': setTypeOfIsDragging('rows'); 
                    break;
                case 'contents': setTypeOfIsDragging('contents'); 
                    break;
                case 'side-panel': 
                    setIsDraggingSidePanel(true);           
                    break;
                default: break;
            }
    
        }
    };
  
    const onDragEnd = (result) => {
        // console.log('result', result);

        switch (typeOfIsDragging) {
            case 'rows': setNewRowList(store, destinationRowIdx, sourceIndexes.rowIdx, rowAreaPosition);
                break;
            case 'contents': 
                const {rowIdx, columnIdx} = sourceIndexes;

                if (noContentClassName) {
                    setNewContentListWhileNoContent(store, sourceIndexes, {desRowIndex: noContentRowIndex, desColumnIndex: noContentColumnIndex, desContentIndex: 0});
                } else {
                    if (columnIdx === columnContentDragItHereIndex && rowIdx === rowContentDragItHereIndex) {               
                        setNewContentListInColumn(store, sourceIndexes, contentDragItHereIndex, contentDragItHereArea);
                    } else {
                        if (rowContentDragItHereIndex !== -1) {
                            setNewContentListInBody(store, sourceIndexes, {
                                destinationRowIndex: rowContentDragItHereIndex, 
                                destinationColumnIndex: columnContentDragItHereIndex, 
                                destinationContentIndex: contentDragItHereIndex,
                                destinationContentArea: contentDragItHereArea
                            });
                        }
                    }
                }
                break;
            default:
                break;
        }

        if (isDraggingSidePanel) {
            switch (element) {
                case 'selector_u_row_1': console.log('check row 1'); break;
                case 'selector_u_content_menu_3': console.log('check menu 3'); break;
                case 'selector_u_content_menu_2': console.log('check menu 2'); break;
                case 'selector_u_content_image_1': console.log('check image 1'); break;
                default: break;
            }
            
        }

        setTypeOfIsDragging('');
        setDragItHereIndex(-1);
        setRowContentDragItHereIndex(-1);
        setColumnContentDragItHereIndex(-1);
        setContentDragItHereIndex(-1);
        setContentDragItHereArea('');
        setNoContentClassName('');
        setIsDraggingSidePanel(false);

    };

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>

            <div className={classnames(
                styles['grid-container'],
                {[styles['side-panel-left']] : sidePanelMode === CONSTANTS.SIDE_PANEL_MODE.LEFT}
               
            )}
            onMouseMove={onMouseMoveItem}
            >
                <div className={classnames(styles['grid-workspace'])} onClick={onClickWorkspace}>
                    <Workspace 
                        typeOfIsDragging={typeOfIsDragging} 
                        getSourceIndexes={getSourceIndexes}
                        getNoContentIndexes={getNoContentIndexes}
                        getDragItHereRowIndexes={getDragItHereRowIndexes}
                        getDragItHereContentIndexes={getDragItHereContentIndexes}
                        rowDragItHereIndex={rowDragItHereIndex}   
                        rowContentDragItHereIndex={rowContentDragItHereIndex}
                        columnContentDragItHereIndex={columnContentDragItHereIndex}
                        contentDragItHereIndex={contentDragItHereIndex}
                        contentDragItHereArea={contentDragItHereArea}
                        noContentClassName={noContentClassName}
                        rowDraggingIndex={sourceIndexes.rowIdx}
                        getActiveRowIndex={getActiveRowIndex}
                        activeRowIndex={activeRowIndex}
                    />
                </div>

                <div key={'abc'} className={classnames(styles['grid-sidepanel'])} >
                    <SidePanel />
                </div>

                <ShortcutBar />

                {toggleDeleteForm.isDeleteFormOpening && <DeleteForm />}

            </div>
        </DragDropContext>
    );
};

const Components = (props) => {
    return (
        <StateProvider>
            <LayoutDesign {...props} />
        </StateProvider>
    );
};

export default Components;