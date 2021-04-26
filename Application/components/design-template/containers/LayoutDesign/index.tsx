import React, {useContext, useEffect, useState} from 'react';
import classnames from 'classnames';
import SidePanel from 'Components/design-template/components/SidePanel';
import Workspace from 'Components/design-template/components/Workspace';
import ShortcutBar from 'Components/design-template/components/ShortcutBar';
import DeleteForm from 'Components/design-template/components/DeleteForm';
import styles from 'Components/design-template/containers/LayoutDesign/styles.module.scss';
import {StateProvider} from 'Components/design-template/components/ContextStore';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {CONSTANTS, typeDnD} from 'Components/design-template/constants';
import {defaultStyleContent} from 'Components/design-template/components/ContextStore/defaultProps';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {DragDropContext} from 'react-beautiful-dnd';
import {
    reorder, 
    getRowsFromBodies, 
    getRowId, 
    getColumnId, 
    getContentId,
    getRowIDFromHtmlID,
    getRowIndexFromId,
    getLastUsingId,
    updateUsageCounters,
    getContentIDFromHtmlID,
    getContentIndexFromID,
    getColumnIndexFromID
} from 'Components/design-template/components/Workspace/utils';
import {getObjectPropSafely, getOffset} from 'Utils';
import produce from 'immer';
import PreviewModal from 'Components/design-template/components/PreviewModal';
import axios from 'axios';
import {buildDesignData} from 'Components/design-template/components/Workspace/utils';
import Spinner from 'Components/design-template/components/UI/Spinner';

const LayoutDesign = () => {
    const {state: store, dispatch: dispatchStore} = useContext(StoreContext);
    const {
        sidePanelMode, 
        toggleDeleteForm = {isDeleteFormOpening: false, type: ''}, 
        bodies, 
        rows, 
        columns, 
        usageCounters, 
        contents,
        isEditing = false
        // isOpenPreview = false
    } = store;

    const [typeDraggingWorkspace, setTypeDraggingWorkspace] = useState('');
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
    const [typeDragDropSidePanel, setTypeDragDropSidePanel] = useState('');
    const [targetElement, setTargetElement] = useState('');
    const [isFetchAPI, setIsFetchAPI] = useState(true);

    const getDragItHereRowIndexes = (rowIndex, destinationRowIdx, rowArea) => {
        setDragItHereIndex(rowIndex); 
        setRowAreaPosition(rowArea);
        setDestinationRowIdx(destinationRowIdx);
    };

    const getDragItHereContentIndexes = (rowIndex, columnIndex, contentIndex, contentArea) => {
        if (rowIndex !== -1) {
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
        if (rowIdx !== -1 && columnIdx !== -1) {
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
                case typeDnD.DROP_AREA.ABOVE: endIndex = destinationIndex; break;
                case typeDnD.DROP_AREA.BELOW: endIndex = destinationIndex + 1; break;
                default: break;
            }
        } else if (sourceIndex === destinationIndex) {
            switch (area) {
                case typeDnD.DROP_AREA.ABOVE: endIndex = destinationIndex; break;
                case typeDnD.DROP_AREA.BELOW: endIndex = destinationIndex; break;
                default: break;
            }
        } else {
            switch (area) {
                case typeDnD.DROP_AREA.ABOVE: endIndex = destinationIndex - 1; break;
                case typeDnD.DROP_AREA.BELOW: endIndex = destinationIndex; break;
                default: break;
            } 
        }
        return endIndex;
    };

    const setNewRowList = (data, destinationRowIdx, currentRowIdx, areaPosition) => {
        const bodies = {...data.bodies};
        const rows = getRowsFromBodies(bodies);

        if (destinationRowIdx !== -1) {
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
            type: actionType.UPDATE_COLUMNS,
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
            case typeDnD.DROP_AREA.ABOVE: endIndex = destinationContentIndex; break;
            case typeDnD.DROP_AREA.BELOW: endIndex = destinationContentIndex + 1; break;
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
                type: actionType.UPDATE_COLUMNS,
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

        if (desRowIndex !== -1 && desColumnIndex !== -1) {

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
                type: actionType.UPDATE_COLUMNS,
                payload: {
                    id: 'u_body',
                    values: newColumns
                }
            });
        }
        
    };

    const getNewContentIndex = (index, area) => {
        // if (area === 'BELOW') {
        //     return index + 1;
        // } 
        // if (area === 'ABOVE') {
        //     return index;
        // }
        // return -1;

        return area ? (area === 'BELOW' ? index + 1 : index) : -1; 
    };

    const onMouseMoveItem = (e) => {
        if (typeDragDropSidePanel) {
            const currentPosition = e.pageY;
            
            const targetElement = e.target.id.slice(9);

            if (targetElement.includes('row') || targetElement.includes('content')) {
                const elm = document.querySelector(`#${targetElement}`);
                const height = targetElement && document.getElementById(targetElement)?.offsetHeight;
                const top = getOffset(elm).top;
                const bottom = top + height;
                const middlePoint = top + (height / 2);

                const visiblePosition = {
                    type: typeDragDropSidePanel === typeDnD.SIDE_PANEL.COLUMN ? 'row' : 'content',
                    id: '',
                    areaPosition: ''
                };

                switch (true) {
                    case currentPosition > top && currentPosition < middlePoint:
                        visiblePosition.id = targetElement;
                        visiblePosition.areaPosition = typeDnD.DROP_AREA.ABOVE;
                        break;
                    case currentPosition >= middlePoint && currentPosition < bottom:
                        visiblePosition.id = targetElement;
                        visiblePosition.areaPosition = typeDnD.DROP_AREA.BELOW; 
                        break;  
                    default: break;
                }

                switch (true) {
                    case typeDragDropSidePanel === typeDnD.SIDE_PANEL.COLUMN && targetElement.includes('row'): {
                        const rowNumberId = getRowIDFromHtmlID(store, visiblePosition.id);
                        const rowDragItHereIdx = visiblePosition.areaPosition === typeDnD.DROP_AREA.BELOW ? getRowIndexFromId(store, rowNumberId) : getRowIndexFromId(store, rowNumberId) - 1;
    
                        setDragItHereIndex(rowDragItHereIdx);
                        break;
                    }
                    case typeDragDropSidePanel !== typeDnD.SIDE_PANEL.COLUMN && targetElement.includes('content'): {
                        const contentNumberID = getContentIDFromHtmlID(store, visiblePosition.id);
                        const {columnID, contentIndex} = getContentIndexFromID(store, contentNumberID);
                        const {rowID, columnIndex} = getColumnIndexFromID(store, columnID);
                        const rowIndex = getRowIndexFromId(store, rowID);
    
                        setRowContentDragItHereIndex(rowIndex);
                        setColumnContentDragItHereIndex(columnIndex);
                        setContentDragItHereIndex(contentIndex);
                        setContentDragItHereArea(visiblePosition.areaPosition);

                        break;
                    }
                    case typeDragDropSidePanel === typeDnD.SIDE_PANEL.COLUMN && targetElement.includes('content'): {
                        setDragItHereIndex(-1);
                        break;
                    }
                    default: break;
                }

                setTargetElement(targetElement);
            } else {
                setDragItHereIndex(-1);              
            }

            if (!targetElement.includes('content')) {
                setRowContentDragItHereIndex(-1);
                setColumnContentDragItHereIndex(-1);
                setContentDragItHereIndex(-1);
                setContentDragItHereArea('');
            }

            if (e.target.className.includes('no_content')) {
                if (typeDragDropSidePanel !== typeDnD.SIDE_PANEL.COLUMN) {
                    const classNameCompare = e.target.className.split(' ')[0];
    
                    const noContentRowIndex = classNameCompare.split('_')[2];
                    const noContentColumnIndex = classNameCompare.split('_')[3];
    
                    if (noContentRowIndex !== -1 && noContentColumnIndex !== -1) {
                        setNoContentRowIndex(noContentRowIndex);
                        setNoContentColumnIndex(noContentColumnIndex);
                        setNoContentClassName(classNameCompare);
    
                        setTargetElement(e.target.className);
                    } 
                }
            } else {
                setNoContentRowIndex(-1);
                setNoContentColumnIndex(-1);
                setNoContentClassName('');
            }

            if (!e.target.id.slice(9).includes('row') && !e.target.id.slice(9).includes('content') && !e.target.className.includes('no_content')) {
                setTargetElement('');
            }
        }
    };

    const onDragStart = (provided) => {

        if (provided.draggableId) {
            switch (provided.type) {
                case typeDnD.WORKSPACE.ROW: 
                    setTypeDraggingWorkspace(typeDnD.WORKSPACE.ROW); 
                    break;
                case typeDnD.WORKSPACE.CONTENT: 
                    setTypeDraggingWorkspace(typeDnD.WORKSPACE.CONTENT); 
                    break;
                case 'side-panel':
                    const dragId = provided.draggableId.toUpperCase();
                    let dndType = '';

                    switch (true) {
                        case dragId.includes(typeDnD.SIDE_PANEL.COLUMN): 
                            dndType = typeDnD.SIDE_PANEL.COLUMN;
                            break;
                        case dragId.includes(typeDnD.SIDE_PANEL.TEXT): 
                            dndType = typeDnD.SIDE_PANEL.TEXT;
                            break;
                        case dragId.includes(typeDnD.SIDE_PANEL.IMAGE): 
                            dndType = typeDnD.SIDE_PANEL.IMAGE;
                            break;
                        case dragId.includes(typeDnD.SIDE_PANEL.MENU): 
                            dndType = typeDnD.SIDE_PANEL.MENU;
                            break;
                        case dragId.includes(typeDnD.SIDE_PANEL.DIVIDER): 
                            dndType = typeDnD.SIDE_PANEL.DIVIDER;
                            break;
                        case dragId.includes(typeDnD.SIDE_PANEL.HTML): 
                            dndType = typeDnD.SIDE_PANEL.HTML;
                            break;
                        case dragId.includes(typeDnD.SIDE_PANEL.BUTTON):
                            dndType = typeDnD.SIDE_PANEL.BUTTON;
                            break;
                        default: 
                            break;
                    }
                    setTypeDragDropSidePanel(dndType);
                    break;
                default: break;
            }
            
        }
    };
  
    const onDragEnd = (result) => {

        switch (typeDraggingWorkspace) {
            case typeDnD.WORKSPACE.ROW: setNewRowList(store, destinationRowIdx, sourceIndexes.rowIdx, rowAreaPosition);
                break;
            case typeDnD.WORKSPACE.CONTENT: 
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

        if (typeDragDropSidePanel) {
            if (typeDragDropSidePanel === typeDnD.SIDE_PANEL.COLUMN) {

                if (targetElement.includes('row')) {
                    const newId = (parseInt(getLastUsingId(store), 0) + 1) + '';
                    const newColumnId = (parseInt(newId, 0) + 1) + '';
    
                    const rowOrderList = [...getRowsFromBodies(bodies)];
    
                    const newRowIndex = rowDragItHereIndex + 1;
    
                    rowOrderList.splice(newRowIndex, 0, newId);
    
                    // update row
                    const newRows = produce(rows, draft => {
    
                        draft[newId] = {
                            cells: [1],
                            columns: [newColumnId],
                            location: {
                                colection: 'rows',
                                id: newId
                            },
                            values: {
                                'displayCondition': null,
                                'columns': false,
                                'backgroundColor': '',
                                'columnsBackgroundColor': '',
                                'backgroundImage': {
                                    'url': '',
                                    'fullWidth': true,
                                    'repeat': false,
                                    'center': true,
                                    'cover': false
                                },
                                'padding': '0px',
                                'hideDesktop': false,
                                'hideMobile': false,
                                'noStackMobile': false,
                                '_meta': {
                                    'htmlID': `u_row_${newId}`,
                                    'htmlClassNames': 'u_row'
                                },
                                'selectable': true,
                                'draggable': true,
                                'duplicatable': true,
                                'deletable': true
                            }
                        };
                    });
    
                    // update column
                    const newColumnsInRow = produce(columns, draft => {
    
                        draft[newColumnId] = {
                            contents: [],
                            location: {
                                colection: 'columns',
                                id: newColumnId
                            },
                            values: {
                                '_meta': {
                                    'htmlID': `u_column_${newColumnId}`,
                                    'htmlClassNames': 'u_column'
                                },
                                'border': {},
                                'padding': '0px',
                                'backgroundColor': ''
                            }
                        };
                    });
    
                    // update body
                    const bodyId = Object.keys(bodies)[0];
    
                    const newBodies = produce(bodies, draft => {
                        draft[bodyId].rows = [...rowOrderList];
                    });
    
                    // update usage counters
                    let newUsageCounters = updateUsageCounters(usageCounters, 'row', 'add');
    
                    newUsageCounters = updateUsageCounters(newUsageCounters, 'column', 'add');
    
                    dispatchStore({
                        type: actionType.HANDLE_ROW,
                        payload: {
                            bodies: newBodies,
                            rows: newRows,
                            columns: newColumnsInRow,
                            usageCounters: newUsageCounters                
                        }
                    });
                } 
            } else {
                let newContentIndex = -1;
                let rowId = -1;
                let columnId = -1;
                const newContentId = (parseInt(getLastUsingId(store), 0) + 1) + '';

                if (targetElement.includes('content')) {
                    newContentIndex = getNewContentIndex(contentDragItHereIndex, contentDragItHereArea);
                    rowId = getRowId(store, rowContentDragItHereIndex);
                    columnId = getColumnId(store, rowId, columnContentDragItHereIndex);
                }

                if (targetElement.includes('no_content')) {
                    newContentIndex = 0;
                    rowId = getRowId(store, noContentRowIndex);
                    columnId = getColumnId(store, rowId, noContentColumnIndex);
                }

                if (newContentIndex !== -1) {
                    const newColumns = produce(columns, draft => {
                        draft[columnId].contents.splice(newContentIndex, 0, newContentId);
                    });            
    
                    const stringArray = result.draggableId.split('-');
                    const typeElement = stringArray.length && stringArray[stringArray.length - 1];

                    // update usagecounters
                    const newUsageCounters = updateUsageCounters(usageCounters, typeElement, 'add');
    
                    let newContents = {};
    
                    switch (typeDragDropSidePanel) {
            
                        case typeDnD.SIDE_PANEL.TEXT: {          
                            newContents = produce(contents, draft => {
                                draft[newContentId] = {
                                    type: 'text',
                                    location: {
                                        colection: 'contents',
                                        id: newContentId
                                    },
                                    values: {
                                        ...defaultStyleContent[CONSTANTS.TYPE_CONTENT.TEXT],
                                        color: '#333',
                                        textAlign: 'left',
                                        text: '<p style="font-size: 14px; line-height: 140%;">This is a new text block. Change the text</p>',
                                        _meta: {
                                            htmlID: `u_content_text_${usageCounters.u_content_text + 1}`,
                                            htmlClassNames: 'u_content_text'
                                        }
                                    }
                                };
                            });           
                            break;
                        }
                        case typeDnD.SIDE_PANEL.IMAGE: {                       
                            newContents = produce(contents, draft => {
                                draft[newContentId] = {
                                    type: 'image',
                                    location: {
                                        colection: 'contents',
                                        id: newContentId
                                    },
                                    values: {
                                        ...defaultStyleContent[CONSTANTS.TYPE_CONTENT.IMAGE],
                                        src: {
                                            url: 'https://via.placeholder.com/500x100?text=IMAGE',
                                            width: '100%',
                                            maxWidth: 500
                                        },
                                        _meta: {
                                            htmlID: `u_content_image_${usageCounters.u_content_image + 1}`,
                                            htmlClassNames: 'u_content_image'
                                        }
    
                                    }
                                }; 
                            });
                            break;
                        }
                        case typeDnD.SIDE_PANEL.MENU: {

                            newContents = produce(contents, draft => {
                                draft[newContentId] = {
                                    type: 'menu',
                                    location: {
                                        colection: 'contents',
                                        id: newContentId
                                    },
                                    values: {
                                        ...defaultStyleContent[CONSTANTS.TYPE_CONTENT.MENU],
                                        menu: {
                                            items: [
                                                {
                                                    key: '160692397933578678',
                                                    link: {
                                                        name: 'web',
                                                        values: {
                                                            href: '',
                                                            target: '_self'
                                                        }
                                                    },
                                                    text: 'MENU',
                                                    actionType: 'openWebsite'
                                                }
                                            ]
                                        },
                                        _meta: {
                                            htmlID: `u_content_menu_${usageCounters.u_content_menu + 2}`,
                                            htmlClassNames: 'u_content_menu'
                                        }
                                    }
                                };
                            });
                            break;
                        }
                        case typeDnD.SIDE_PANEL.DIVIDER: {
                            newContents = produce(contents, draft => {
                                draft[newContentId] = {
                                    type: 'divider',
                                    location: {
                                        colection: 'contents',
                                        id: newContentId
                                    },
                                    values: {
                                        ...defaultStyleContent[CONSTANTS.TYPE_CONTENT.DIVIDER],
                                        containerPadding: '10px',
                                        border: {
                                            borderTopWidth: '1px',
                                            borderTopStyle: 'solid',
                                            borderTopColor: '#BBBBBB'
                                        },
                                        _meta: {
                                            htmlID: `u_content_divider_${usageCounters.u_content_divider + 3}`,
                                            htmlClassNames: 'u_content_divider'
                                        }
                                    }
                                };
                            });
                            break;
                        }
                        case typeDnD.SIDE_PANEL.HTML: {
                            newContents = produce(contents, draft => {
                                draft[newContentId] = {
                                    type: 'html',
                                    location: {
                                        colection: 'contents',
                                        id: newContentId
                                    },
                                    values: {
                                        containerPadding: '18px',
                                        _meta: {
                                            'htmlID': `u_content_html_${newContentId}`,
                                            'htmlClassNames': 'u_content_html'
                                        },
                                        'selectable': true,
                                        'draggable': true,
                                        'duplicatable': true,
                                        'deletable': true,
                                        'html': '<strong>Hello, world!</strong>',
                                        'hideDesktop': false,
                                        'hideMobile': false
                                    }
                                };
                            });
                            break;
                        }
                        case typeDnD.SIDE_PANEL.BUTTON: {
                            newContents = produce(contents, draft => {
                                draft[newContentId] = {
                                    type: 'button',
                                    location: {
                                        colection: 'contents',
                                        id: newContentId
                                    },
                                    values: {
                                        ...defaultStyleContent[CONSTANTS.TYPE_CONTENT.BUTTON],
                                        containerPadding: '20px 10px 20px',
                                        buttonColors: {
                                            color: '#ffffff',
                                            backgroundColor: '#3AAEE0',
                                            hoverColor: '#3AAEE0',
                                            hoverBackgroundColor: '#3AAEE0'
                                        },
                                        text: 'Button Text',
                                        borderRadius: '6px',
                                        _meta: {
                                            htmlID: `u_content_button_${usageCounters.u_content_button + 1}`,
                                            htmlClassNames: 'u_content_button'
                                        }
                                    }
                                };
                            });
                            break;
                        }
                    }
    
                    dispatchStore({
                        type: actionType.HANDLE_ROW,
                        payload: {
                            columns: newColumns,
                            contents: newContents,
                            usageCounters: newUsageCounters              
                        }
                    });

                }

            }
        } else {
            //
        }

        setTypeDraggingWorkspace('');
        setDragItHereIndex(-1);
        setRowContentDragItHereIndex(-1);
        setColumnContentDragItHereIndex(-1);
        setContentDragItHereIndex(-1);
        setContentDragItHereArea('');
        setNoContentClassName('');
        setTypeDragDropSidePanel('');

    };

    useEffect(() => {
        const api = 'https://sandbox-email.ants.vn/api/gallery/index?page=1&limit=6&_token=5474r2x214r26474z274y4v5r426q2j5t2b4s494u5&_user_id=1600007645&_account_id=1600001262&_lang=en';

        const result = axios.get(api);

        result.then(res => {
            const payload = buildDesignData(getObjectPropSafely(()=>res.data.data.list_gallery[0].design));

            if (res.status >= 200 && res.status <= 299) {
                dispatchStore({
                    type: actionType.INITIAL_DATA,
                    payload: payload.design
                });
                setIsFetchAPI(false);
            }

        });

    }, []);

    return isFetchAPI ? <div className={classnames(styles['spinner-container'])}><Spinner /></div> : (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className={classnames(
                styles['grid-container'],
                {[styles['side-panel-left']] : sidePanelMode === CONSTANTS.SIDE_PANEL_MODE.LEFT}
            )}
            style={!isEditing ? {overflowY: 'scroll', height: '100vh'} : {}}
            onMouseMove={onMouseMoveItem}
            >
                <div className={classnames(styles['grid-workspace'])}>
                    <Workspace 
                        typeDraggingWorkspace={typeDraggingWorkspace} 
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
                        typeDragDropSidePanel={typeDragDropSidePanel}
                        targetElement={targetElement}
                    />
                </div>

                <div key={'abc'} className={classnames(styles['grid-sidepanel'])} >
                    <SidePanel />
                </div>

                <ShortcutBar />
                <PreviewModal />
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