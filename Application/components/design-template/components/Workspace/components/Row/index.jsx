import React, {Fragment, useState, useContext, useEffect} from 'react';
import classnames from 'classnames';
import {getObjectPropSafely, getOffset} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Row/styles.module.scss';
import Divider from 'Components/design-template/components/Workspace/components/Divider';
import Image from 'Components/design-template/components/Workspace/components/Image';
import Text from 'Components/design-template/components/Workspace/components/Text';
import Button from 'Components/design-template/components/Workspace/components/Button';
import Menu from 'Components/design-template/components/Workspace/components/Menu';
import RenderCode from 'Components/design-template/components/Workspace/components/RenderCode';
import {Icon} from '@antscorp/components';
import {CONSTANTS} from 'Components/design-template/constants';
import {StoreContext} from 'Components/design-template/components/ContextStore';
import {actionType} from 'Components/design-template/components/ContextStore/constants';
import {Droppable, Draggable} from 'react-beautiful-dnd'; 
import produce from 'immer';
// import {designData} from 'Components/design-template/components/Workspace/constants';
import {
    getRowId, 
    getColumnId, 
    getLastUsingId, 
    getRowsFromBodies, 
    getRowIDFromHtmlID, 
    getRowIndexFromId, 
    getContentIDFromHtmlID,
    getContentIndexFromID,
    getColumnIndexFromID,
    getContentId,
    updateUsageCounters
} from 'Components/design-template/components/Workspace/utils';

const Row = (props) => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {
        viewMode, 
        activeElement, 
        isEditing = false, 
        bodies = {}, 
        columns, 
        rows, 
        usageCounters, 
        contents, 
        confirmDelete = {type: '', willBeDelete: false, id: ''}
    } = store;
    const {
        data, 
        generalStyle, 
        rowIndex, 
        getDragItHereIndex, 
        rowDragItHereIndex, 
        rowContentDragItHereIndex, 
        columnContentDragItHereIndex, 
        contentDragItHereIndex, 
        contentDragItHereArea,
        typeOfIsDragging = '',
        noContentClassName = ''
    } = props;
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => data.values._meta.htmlClassNames);
    const styleBackgroundImage = {
        backgroundImage: `url(${getObjectPropSafely(() => {
            return data.values.backgroundImage.url;
        })})`,
        backgroundRepeat: getObjectPropSafely(() => {
            return data.values.backgroundImage.repeat ? 'repeat' : 'no-repeat';
        }),
        backgroundPosition: getObjectPropSafely(() => {
            return data.values.backgroundImage.center ? 'center top' : 'left top';
        })
    };
    const fullWidth = getObjectPropSafely(() => data.values.backgroundImage.fullWidth);
    const styleRow = {
        padding: getObjectPropSafely(() => data.values.padding),
        backgroundColor: getObjectPropSafely(() => data.values.backgroundColor),
        ...(fullWidth ? styleBackgroundImage : {})
    };
    const styleContainer = {
        maxWidth: getObjectPropSafely(() => generalStyle.contentWidth),
        backgroundColor: getObjectPropSafely(() => data.values.columnsBackgroundColor),
        margin: '0px auto',
        ...(!fullWidth ? styleBackgroundImage : {})
    };

    const [currentRowIndex, setCurrentRowIndex] = useState(-1);
    const [isShowAddContent, setIsShowAddContent] = useState(false);
    const [isOverSelectorHtmlID, setIsOverSelectorHtmlID] = useState('');

    let tempSpecs = {};
    
    useEffect(() => {
        if (activeElement === id) {
            setCurrentRowIndex(rowIndex);
        }
    });

    useEffect(() => {
        switch (confirmDelete.type) {
            case 'content':
                if (confirmDelete.rowID === id) {                                      
                    // delete at columns
                    const columns = getObjectPropSafely(() => store.columns);
                    const contentID = getContentIDFromHtmlID(store, confirmDelete.id);
                    const {columnID, contentIndex} = getContentIndexFromID(store, contentID);
                    const contents = getObjectPropSafely(() => columns[columnID].contents);
                    let currentContentIndex = -1;

                    contents.length && contents.forEach((ID, index) => {
                        if (ID === contentID) {
                            currentContentIndex = index;
                        }
                    });

                    const newContents = [...contents];
                    let deletedContentID = '';

                    if (currentContentIndex !== -1) {
                        [deletedContentID] = newContents.splice(currentContentIndex, 1);
                    }

                    const newColumns = produce(columns, draft => {
                        draft[columnID].contents = newContents;
                    });

                    const contentStore = getObjectPropSafely(() => store.contents);

                    // update at usageCounters
                    const deletedContentType = getObjectPropSafely(() => contentStore[deletedContentID].type);
                    const newUsageCounters = updateUsageCounters(usageCounters, deletedContentType, 'subtract');

                    const newContentStore = produce(contentStore, draft => {
                        delete draft[deletedContentID];
                    });
                    
                    dispatchStore({
                        type: actionType.TOGGLE_DELETE_FORM,
                        payload: {
                            toggleDeleteForm: {
                                isDeleteFormOpening: false,
                                type: '',
                                id: '',
                                rowID: ''
                            }
                        }
                    });

                    dispatchStore({
                        type: actionType.HANDLE_ROW,
                        payload: {
                            columns: newColumns,
                            contents: newContentStore,
                            usageCounters: newUsageCounters                
                        }
                    });

                    dispatchStore({
                        type: actionType.CONFIRM_DELETE,
                        payload: {
                            confirmDelete: {
                                type: '',
                                willBeDelete: false,
                                id: ''
                            }
                        }
                    });
                }
                break;
            default:
                if (confirmDelete.willBeDelete && activeElement === id) {
                            
                    // delete at bodies 
                    const rowPositions = [...getRowsFromBodies(bodies)];
                    const deleteRowId = rowPositions.splice(currentRowIndex, 1);
        
                    const newBodyId = Object.keys(bodies)[0];

                    const newBodies = produce(bodies, draft => {
                        draft[newBodyId].rows = [...rowPositions];
                    });
         
                    // delete at rows
                    const newRows = {...rows};
                    const deleteColumnIdList = [...newRows[deleteRowId].columns];
        
                    // update at usageCounters
                    let newUsageCounters = updateUsageCounters(usageCounters, 'row', 'subtract');
        
                    delete newRows[deleteRowId];
        
                    // delete at columns
                    const newColumns = {...columns};
                    let deleteContentIdList = [];
        
                    deleteColumnIdList.length && deleteColumnIdList.forEach(id => {
                        deleteContentIdList = deleteContentIdList.concat(newColumns[id].contents);
                    
                        newUsageCounters = updateUsageCounters(newUsageCounters, 'column', 'subtract');
                        delete newColumns[id];
                    });
        
                    // delete at contents
                    const newContents = {...contents};
        
                    deleteContentIdList.length && deleteContentIdList.forEach(id => {
                    
                        newUsageCounters = updateUsageCounters(newUsageCounters, newContents[id].type, 'subtract');
        
                        delete newContents[id];
                    }); 
        
                    dispatchStore({
                        type: actionType.HANDLE_ROW,
                        payload: {
                            bodies: newBodies,
                            rows: newRows,
                            columns: newColumns,
                            contents: newContents,
                            usageCounters: newUsageCounters
                        }
                    });

                    dispatchStore({
                        type: actionType.TOGGLE_DELETE_FORM,
                        payload: {
                            toggleDeleteForm: {
                                isDeleteFormOpening: false,
                                type: '',
                                id: '',
                                rowID: ''
                            }
                        }
                    });

                    dispatchStore({
                        type: actionType.CONFIRM_DELETE,
                        payload: {
                            confirmDelete: {
                                type: '',
                                willBeDelete: false,
                                id: ''
                            }
                        }
                    });
                }
                break;
        }
    },[confirmDelete]);

    const getItemStyle = (isDragging, draggableStyle) => {

        return {
            ...draggableStyle,
            display: isDragging ? 'flex' : '',
            alignItems: isDragging ? 'center' : '',
            width: isDragging ? 18 : draggableStyle.width            
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

    const onClickEmptyColumn = (e) => {
        e.stopPropagation();
        setIsShowAddContent(true);
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {
                activeElement: id,
                isEditing: false
            }
        });
    };

    const onClickAddContent = (e) => {
        e.stopPropagation();
        setIsShowAddContent(false);
    };

    const onClickAddRow = (e, position, currentRowIdx) => {
        e.stopPropagation();
        const data = {...store};
        const newId = (parseInt(getLastUsingId(data), 0) + 1) + '';
        const newColumnId = (parseInt(newId, 0) + 1) + '';

        const rowPositions = [...getRowsFromBodies(bodies)];

        const newRowIndex = position === 'top' ? currentRowIdx : currentRowIdx + 1;

        rowPositions.splice(newRowIndex, 0, newId);

        // update row
        const newRows = {...rows};

        newRows[newId] = {
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

        // update column
        const newColumns = {...columns};

        newColumns[newColumnId] = {
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

        // update body
        const newBodyId = Object.keys(bodies)[0];
        const newBodies = produce(bodies, draft => {
            draft[newBodyId].rows = [...rowPositions];
        });
     
        // update usage counters
        let newUsageCounters = updateUsageCounters(usageCounters, 'row', 'add');

        newUsageCounters = updateUsageCounters(newUsageCounters, 'column', 'add');

        dispatchStore({
            type: actionType.HANDLE_ROW,
            payload: {
                bodies: newBodies,
                rows: newRows,
                columns: newColumns,
                usageCounters: newUsageCounters                
            }
        });
    };

    const onClickDelete = (e, isRow, id, rowID) => {
        e.stopPropagation();

        dispatchStore({
            type: actionType.TOGGLE_DELETE_FORM,
            payload: {
                toggleDeleteForm : {
                    isDeleteFormOpening: true,
                    type: isRow ? 'row' : 'content',
                    id,
                    rowID
                }
                
            }
        });
    };

    const onClickDuplicate = (e, isRow, columnIndex = -1, contentIndex = -1) => {
        e.stopPropagation();
        if (isRow) {
            const newRowId = (parseInt(getLastUsingId(store), 0) + 1) + '';
            const currentRowId = getRowId(store,rowIndex);
            const columnIdList = [...rows[currentRowId].columns];
            let newColumnId = (parseInt(newRowId, 0) + 1) + '';
            let newContentId = 0;
    
            const rowPositions = [...getRowsFromBodies(bodies)];
    
            rowPositions.splice(currentRowIndex + 1, 0, newRowId);
    
            // update bodies
            const newBodyId = Object.keys(bodies)[0];
    
            const newBodies = produce(bodies, draft => {
                draft[newBodyId].rows = [...rowPositions];
            });
    
            // update row
            const newRows = {...rows};
    
            newRows[newRowId] = {
                cells: [...newRows[currentRowId].cells],
                columns: [],
                location: {
                    colection: 'rows',
                    id: newRowId
                },
                values: {
                    ...newRows[currentRowId].values,
                    _meta: {
                        ...newRows[currentRowId].values._meta,
                        htmlID: `${newRows[currentRowId].values._meta.htmlClassNames}_${newRowId}`
                    }
                }
            };

            // update usageCounters
            let newUsageCounters = updateUsageCounters(usageCounters, 'row', 'add');
    
            // update columns
            const newColumns = {...columns};
            const newContents = {...contents};
    
            columnIdList.length && columnIdList.forEach(id => {
                newRows[newRowId].columns.push(newColumnId);
                
                newColumns[newColumnId] = {
                    contents: [],
                    location: {
                        collection: 'columns',
                        id: newColumnId
                    },
                    values: {
                        ...newColumns[id].values,
                        _meta: {
                            ...newColumns[id].values._meta,
                            htmlID: `${newColumns[id].values._meta.htmlClassNames}_${newColumnId}`
                        }
                    }
                };

                newUsageCounters = updateUsageCounters(newUsageCounters, 'column', 'add');
    
                newColumns[id].contents.length && newColumns[id].contents.forEach((contentId, index) => {
    
                    // update content
                    if (index === 0) {
                        newContentId = (parseInt(newColumnId, 0) + 1) + '';
                    } else {
                        newContentId = (parseInt(newContentId, 0) + 1) + '';
                    }
    
                    newColumns[newColumnId].contents.push(newContentId);
    
                    newContents[newContentId] = {
                        type: newContents[contentId].type,
                        location: {
                            collection: 'contents',
                            id: newContentId
                        },
                        values: {
                            ...newContents[contentId].values, 
                            _meta: {
                                ...newContents[contentId].values._meta, 
                                htmlID: `${newContents[contentId].values._meta.htmlClassNames}_${newContentId}`
                            }
                        }
                    };

                    newUsageCounters = updateUsageCounters(newUsageCounters, newContents[newContentId].type, 'add');
    
                });
    
                newColumnId = (parseInt(newContentId, 0) + 1) + '';
               
            });
    
            dispatchStore({
                type: actionType.HANDLE_ROW,
                payload: {
                    bodies: newBodies,
                    rows: newRows,
                    columns: newColumns,
                    contents: newContents,
                    usageCounters: newUsageCounters
                }
            });

        } else {
            const rowId = getRowId(store, rowIndex);
            const columnId = getColumnId(store, rowId, columnIndex);
            const contentID = getContentId(store, columnId, contentIndex);
            const newContentId = (parseInt(getLastUsingId(store), 0) + 1) + '';
            let contentType = '';

            const columns = getObjectPropSafely(() => store.columns);
            const contents = getObjectPropSafely(() => store.contents);

            const contentsOfColumn = getObjectPropSafely(() => columns[columnId].contents);

            const newContentsOfColumn = [...contentsOfColumn];
            
            if (contentIndex !== -1) {
                newContentsOfColumn.splice(contentIndex + 1, 0, newContentId);
            }

            // update columns
            const newColumns = produce(columns, draft => {
                draft[columnId].contents = newContentsOfColumn;
            });

            // update contents
            const newContents = produce(contents, draft => {
                draft[newContentId] = {
                    ...draft[contentID],
                    location: {
                        collection: 'contents',
                        id: newContentId
                    },
                    values: {
                        ...draft[contentID].values,
                        _meta: {
                            ...draft[contentID].values._meta,
                            htmlID: getObjectPropSafely(() => draft[contentID].values._meta.htmlClassNames) + '_' + newContentId
                        }
                    }
                }; 
                contentType = draft[contentID].type;
            });

            // update usagecounters
            const newUsageCounters = updateUsageCounters(usageCounters, contentType, 'add');

            dispatchStore({
                type: actionType.HANDLE_ROW,
                payload: {
                    columns: newColumns,
                    contents: newContents,
                    usageCounters: newUsageCounters              
                }
            });

        }
    };

    const onMouseDownSelector = (e, columnIndex, contentIndex) => {
        e.stopPropagation();

        typeof props.getSourceIndexes === 'function' && props.getSourceIndexes({
            rowIdx: rowIndex, 
            columnIdx: columnIndex,
            contentIdx: contentIndex
        });
    };

    const onClickSelectContent = (e, id) => {
        e.stopPropagation();
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {
                activeElement: id,
                isEditing: true
            }
        });
    };

    const onClickSelectRow = (e) => {
        e.stopPropagation();
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {
                activeElement: id,
                isEditing: false
            }
        });
    };

    const onMouseMoveDragIcon = (e, isRow) => {
        if (typeOfIsDragging) {
            const currentPosition = e.pageY;

            const targetElement = e.target.id.slice(9);

            if (e.target.className.includes('no_content')) {
                const classNameCompare = e.target.className.split(' ')[0];

                const noContentRowIndex = classNameCompare.split('_')[2];
                const noContentColumnIndex = classNameCompare.split('_')[3];

                typeof props.getNoContentIndexes === 'function' && props.getNoContentIndexes(noContentRowIndex, noContentColumnIndex, classNameCompare);
            } else {

                typeof props.getNoContentIndexes === 'function' && props.getNoContentIndexes(-1, -1, '');
            }

            if (targetElement.includes('u_row') || targetElement.includes('u_content')) {
    
                const elm = document.querySelector(`#${targetElement}`);

                const height = targetElement && document.getElementById(targetElement).offsetHeight;
                const top = getOffset(elm).top;

                const bottom = top + height;
                
                const middlePoint = top + (height / 2);

                const visiblePosition = {
                    type: typeOfIsDragging === 'rows' ? 'row' : 'content',
                    id: '',
                    areaPosition: ''
                };

                switch (true) {
                    case currentPosition > top && currentPosition < middlePoint:
                        visiblePosition.id = targetElement;
                        visiblePosition.areaPosition = 'above';
                        break;
                    case currentPosition >= middlePoint && currentPosition < bottom:
                        visiblePosition.id = targetElement;
                        visiblePosition.areaPosition = 'below'; 
                        break;  
                    default: break;
                }

                tempSpecs = visiblePosition;
                
                if (typeOfIsDragging === 'rows') {
                
                    const rowNumberId = getRowIDFromHtmlID(store, visiblePosition.id);
                    const rowDragItHereIndex = tempSpecs.areaPosition === 'below' ? getRowIndexFromId(store, rowNumberId) : getRowIndexFromId(store, rowNumberId) - 1;
                    
                    if (targetElement.includes('u_row')) {
                        typeof getDragItHereIndex === 'function' && getDragItHereIndex('draggingRow', rowDragItHereIndex, -1, -1, '', getRowIndexFromId(store, rowNumberId), visiblePosition.areaPosition);
                    }

                } 
                else {
                    const contentNumberID = getContentIDFromHtmlID(store, visiblePosition.id);

                    const {columnID, contentIndex} = getContentIndexFromID(store, contentNumberID);

                    const {rowID, columnIndex} = getColumnIndexFromID(store, columnID);

                    const rowIndex = getRowIndexFromId(store, rowID);

                    if (targetElement.includes('u_content')) {
                        typeof getDragItHereIndex === 'function' && getDragItHereIndex('draggingContent', rowIndex, columnIndex, contentIndex, visiblePosition.areaPosition);
                    }
                }
            }    
        }
    };

    const onMouseOverSelector = (e) => {
        e.stopPropagation();
        const targetElement = e.target.id.slice(9);

        setIsOverSelectorHtmlID(targetElement);
    };

    const onMouseOutSelector = (e) => {
        e.stopPropagation();
        setIsOverSelectorHtmlID('');
    };

    const renderContents = (contents, columnIndex) => {
        const rowId = getRowId(store, rowIndex);

        const columnId = getColumnId(store, rowId, columnIndex);

        const getContent = (content) => {
            const type = getObjectPropSafely(() => content.type);

            switch (type) {
                case 'divider': {
                    return (
                        <Divider data={content} />
                    );
                }
                case 'image': {
                    return (
                        <Image data={content} />
                    );
                }
                case 'text': {
                    return (
                        <Text data={content} />
                    );
                }
                case 'button': {
                    return (
                        <Button data={content} />
                    );
                }
                case 'menu': {
                    return (
                        <Menu data={content} />
                    );
                }
                case 'html': {
                    return (
                        <RenderCode data={content} />
                    );
                }
            }
        };

        return (
            <Droppable
                droppableId={`droppable-content-${id}-${columnId}`} 
                type='contents' 
                renderClone={(provided, snapshot) => {
                    return (
                        <span
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={getItemStyleClone(snapshot, provided.draggableProps.style)}
                        >
                            <span style={{backgroundColor: '#13ABD7', padding: '0 6px 4px', borderRadius: '50%'}}>
                                <Icon type='icon-ants-add' style={{color: '#fff'}} /> 
                            </span>
                        </span>
                    );
                }}
            >
                {(provided, snapshot) => {
                    const isVisibleNoContent = noContentClassName === `no_content_${rowIndex}_${columnIndex}`;

                    return (
                        <div className={'layer-group-content'} ref={provided.innerRef} {...provided.droppableProps}>
                            {contents.length ? contents.map((content, index) => {
                                const contentID = getObjectPropSafely(() => content.values._meta.htmlID);
                                const shouldRenderClone = `draggable-${contentID}` === snapshot.draggingFromThisWith;

                                return (
                                    <Fragment key={`draggable-${contentID}`}>
                                        {shouldRenderClone ? (
                                            <>
                                                {index === 0 && renderDragItHere('content', {rowIndex, columnIndex, index}, true)}
                                                <div className={classnames(styles['react-beautiful-dnd-copy'])}>
                                                    
                                                    <div
                                                        id={contentID}                                                    
                                                    >
                                                        {renderSelector({
                                                            isShowAddTop: false, 
                                                            isShowAddBottom: false, 
                                                            isRow: false, 
                                                            isSelected: activeElement === contentID,
                                                            dragHandleProps: {...provided.dragHandleProps},
                                                            currentID: contentID,
                                                            columnIndex: columnIndex,
                                                            contentIndex: index
                                                        })}
                                                        {getContent(content)}
                                                    </div>                                               
                                                </div>
                                                {renderDragItHere('content', {rowIndex, columnIndex, index}, false)}
                                            </>
                                        ) : (
                                            <Draggable draggableId={`draggable-${contentID}`} index={index}>
                                                {(provided, snapshot) => {
                                                    let isInsideRow = false;
        
                                                    if (currentRowIndex === rowIndex) {
                                                        isInsideRow = true;
                                                    } else {
                                                        isInsideRow = false;
                                                    }
    
                                                    return (
                                                        <>
                                                            {index === 0 && renderDragItHere('content', {rowIndex, columnIndex, index}, true)}
                                                            <div
                                                                id={contentID}
                                                                className={classnames(
                                                                    'layer-selectable', 
                                                                    styles['layer-content'],
                                                                    {[styles['layer-selected']]: activeElement === contentID}
                                                                    
                                                                )}
                                                                onClick={(e) => onClickSelectContent(e, contentID)}
                                                                onMouseMove={(e) => onMouseMoveDragIcon(e, false)}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{
                                                                    ...getItemStyle(false, provided.draggableProps.style),
                                                                    ...(true && {transform: 'none'})
                                                                }}
                                                            >
                                                                {renderSelector({
                                                                    isShowAddTop: false, 
                                                                    isShowAddBottom: false, 
                                                                    isRow: false, 
                                                                    isSelected: activeElement === contentID,
                                                                    isInsideRow,
                                                                    dragHandleProps: {...provided.dragHandleProps},
                                                                    currentID: contentID,
                                                                    columnIndex: columnIndex,
                                                                    contentIndex: index
                                                                })}
                                                                {getContent(content)}
                                                            </div>
                                                            {renderDragItHere('content', {rowIndex, columnIndex, index}, false)}
                                                        </>           
                                                    );
                                                }}
                                            </Draggable>

                                        )}
                                    </Fragment>
                                );
                            }) : (
                                <div 
                                    className={classnames(styles['blockbuilder-placeholder'], {[styles['active']] : isVisibleNoContent})} 
                                    data-name="Drag it here"
                                >
                                    <div className={classnames(`no_content_${rowIndex}_${columnIndex}`, styles['empty-column'])} onClick={onClickEmptyColumn}>
                                        <div 
                                            style={{
                                                zIndex: 112
                                            }}
                                        >
                                            <div className={`no_content_${rowIndex}_${columnIndex}`}>
                                                    No content here. Drag content from right.
                                            </div>
                                            {
                                                isShowAddContent && (
                                                    <div>
                                                        <button className={classnames(`no_content_${rowIndex}_${columnIndex}`, 'btn', styles['add-content'])} onClick={onClickAddContent}>
                                                        Add Content
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                }}
            </Droppable>
        );
    }; 

    const renderColumns = () => {
        const columns = getObjectPropSafely(() => data.columns);

        return columns.map((column, index) => {
            const contents = getObjectPropSafely(() => column.contents);
            const id = getObjectPropSafely(() => column.values._meta.htmlID);
            const classTitle = getObjectPropSafely(() => column.values._meta.htmlClassNames);
            const styleColumn = {
                width: `${(1 / columns.length) * 100}%`
            };
            const styleExtraColumn = {
                padding: getObjectPropSafely(() => column.values.padding),
                backgroundColor: getObjectPropSafely(() => column.values.backgroundColor),
                borderWidth: `
                    ${getObjectPropSafely(() => column.values.border.borderTopWidth)} 
                    ${getObjectPropSafely(() => column.values.border.borderRightWidth)} 
                    ${getObjectPropSafely(() => column.values.border.borderBottomWidth)}
                    ${getObjectPropSafely(() => column.values.border.borderLeftWidth)}
                `,
                borderStyle: `
                    ${getObjectPropSafely(() => column.values.border.borderTopStyle)} 
                    ${getObjectPropSafely(() => column.values.border.borderRightStyle)} 
                    ${getObjectPropSafely(() => column.values.border.borderBottomStyle)}
                    ${getObjectPropSafely(() => column.values.border.borderLeftStyle)}
                `,
                borderColor: `
                    ${getObjectPropSafely(() => column.values.border.borderTopColor)} 
                    ${getObjectPropSafely(() => column.values.border.borderRightColor)} 
                    ${getObjectPropSafely(() => column.values.border.borderBottomColor)}
                    ${getObjectPropSafely(() => column.values.border.borderLeftColor)}
                `
                
            };
        
            return (
                <div 
                    key={index}
                    id={id}
                    className={styles[classTitle]}
                    style={styleColumn}
                >
                    <div
                        style={styleExtraColumn}
                    >
                        {renderContents(contents, index)}
                    </div>
                </div>
            );
        });
    };

    const renderSelector = ({
        isShowAddTop = true, 
        isShowAddBottom = true, 
        isRow = true, 
        isSelected = false,
        isInsideRow = false,
        dragHandleProps = {}, 
        currentID = '',
        columnIndex = -1,
        contentIndex = -1
    } = {}) => {

        // const selectorIndex = () => {

        //     if (isRow === true && isSelected === true) {
        //         return {
        //             zIndex: 100
        //         };
        //     }
        //     if (isRow === true && isSelected === false) {
        //         return {
        //             zIndex: 0
        //         };
        //     }

        //     if (isRow === false && isInsideRow === true) {
        //         return {
        //             zIndex: 101
        //         };
        //     }

        //     if (isEditing === false) {
        //         return {
        //             zIndex: 99
        //         };
        //     }

        //     return {};
        // };

        let styleSelector = {zIndex: 100};

        if (isEditing) {
            styleSelector = {zIndex: 0};
        }

        switch (typeOfIsDragging) {
            case 'rows': 
                if (currentID.includes('u_content')) {
                    styleSelector['zIndex'] = 0;
                }
                break;
            case 'contents':
                if (currentID.includes('u_row')) {
                    styleSelector = {
                        zIndex: 0,
                        opacity: 0
                    };
                }
                break;
            default: break;
        }
        // if (typeOfIsDragging === 'rows') {
        //     if (currentID.includes('u_content')) {
        //         styleSelector['zIndex'] = 0;
        //     }
        // }

        return (
            <div className={classnames(
                `${currentID}`,
                styles['layer-selector-row'],
                {[styles['active']]: isSelected},
                {[styles['layout-mobile-row']]: viewMode === CONSTANTS.VIEW_MODE.MOBILE && isRow}
            )}
            id={`selector_${currentID}`}
            style={{...styleSelector}}
            // onMouseOver={onMouseOverSelector}
            // onMouseOut={onMouseOutSelector}
            >
                {isShowAddTop && (
                    <div className={classnames(
                        styles['layer-add-row'],
                        styles['layer-add-row-top']
                    )}
                    onClick={(e) => onClickAddRow(e, 'top', currentRowIndex)}
                    // style={isOverSelectorHtmlID === currentID ? {opacity: 1, display: 'inline-block'} : {}}
                    >
                        <Icon className={classnames('icon-ants-add')} />
                    </div>
                )}
    
                {isShowAddBottom && (
                    <div className={classnames(
                        styles['layer-add-row'],
                        styles['layer-add-row-bottom']
                    )}
                    onClick={(e) => onClickAddRow(e, 'bottom', currentRowIndex)}
                    // style={isOverSelectorHtmlID === currentID ? {opacity: 1, display: 'inline-block'} : {}}
                    >
                        <Icon className={classnames('icon-ants-add')} />
                    </div>
                )}
                    
                <div className={classnames(
                    styles['layer-action-row']
                )}>
                    <div className={classnames(styles['duplicate-row'])} onClick={(e) => onClickDuplicate(e, isRow, columnIndex, contentIndex)}>
                        <Icon className={classnames('icon-ants-copy-report')} />
                    </div>
                    <div className={classnames(styles['delete-row'])} onClick={(e) => onClickDelete(e, isRow, currentID, id)}>
                        <Icon className={classnames('icon-ants-delete')} />
                    </div>
                </div>
                <div 
                    className={classnames(styles['layer-drag-row'])} 
                    // style={isOverSelectorHtmlID === currentID ? {display: 'flex'} : {}}
                >
                    <span 
                        {...dragHandleProps} 
                        onMouseDown={(e) => onMouseDownSelector(e,columnIndex, contentIndex)}                     
                    >
                        <Icon className={classnames('icon-ants-double-three-dots', styles['drag-row'])} />  
                    </span>
                </div>
            </div>
        );
    };

    const renderDragItHere = (type, dragIndexes = {}, isAddition = false) => {
        switch (type) {
            case 'content':
                let isHover = false;

                const contentVisibleIndex = contentDragItHereIndex - 1 !== 0 && contentDragItHereIndex - 1;

                if (dragIndexes.rowIndex === rowContentDragItHereIndex && dragIndexes.columnIndex === columnContentDragItHereIndex) {

                    if (contentDragItHereIndex === 0 && dragIndexes.index === 0) {
                        if (contentDragItHereArea === 'above' && isAddition) {
                            isHover = true;
                        }
                        if (contentDragItHereArea === 'below' && !isAddition ) {
                            isHover = true;
                        }

                    } else {
                        if (contentVisibleIndex === dragIndexes.index && contentDragItHereArea === 'above') {
                            isHover = true;
                        } 
                        if (contentDragItHereIndex === dragIndexes.index && contentDragItHereArea === 'below') {
                            isHover = true;
                        } 
                        if (contentDragItHereIndex === 1 && contentDragItHereArea === 'above' && dragIndexes.index === 0 && !isAddition) {
                            isHover = true;
                        }                       
                    }
                } 

                return (
                    <div 
                        className={classnames(
                            styles['drag-it-here'],
                            {[styles['active']] : isHover}
                        )} 
                        data-name="Drag it here" 
                    />                  
                );
            default: 
                const isHoverRow = rowDragItHereIndex === rowIndex ? true : false;
                
                return (
                    <div 
                        className={classnames(
                            styles['drag-it-here'],
                            {[styles['active']] : isHoverRow}
                        )} 
                        data-name="Drag it here" 
                    />
                );
        }
        
    };

    return (
        <>
            <div
                id={id}   
                className={classnames(
                    'layer-selectable', 
                    styles['layer-row'],
                    {[styles['layer-selected']]: activeElement === id}
                )}
                onClick={onClickSelectRow}
                onMouseMove={(e) => onMouseMoveDragIcon(e, true)}
            >
                {renderSelector({isSelected: activeElement === id, dragHandleProps: getObjectPropSafely(() => props.provided.dragHandleProps), isRow: true, currentID: id})}
                <div
                    id={id}
                    className={classnames('u_row', classTitle)}
                    style={styleRow}
                >
                    <div 
                        className={classnames(styles['container'])}
                        style={styleContainer}
                    >
                        <div className={classnames(
                            styles[classTitle],
                            styles['u_row'],
                            {[styles['layout-mobile']]: viewMode === CONSTANTS.VIEW_MODE.MOBILE}
                        )}>
                            {renderColumns()}
                        </div>
                    </div>
                </div>
            </div>
            {renderDragItHere('row')}
        </>
    );
};

export default Row;