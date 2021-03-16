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
// import {designData} from 'Components/design-template/components/Workspace/constants';
import {getRowId, getColumnId, getLastUsingId, getRowsFromBodies} from 'Components/design-template/components/Workspace/utils';
import * as _ from 'lodash';

const Row = (props) => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {viewMode, activeElement, isEditing = false, bodies = {}, columns, rows, usageCounters, contents, draggingItem = ''} = store;
    const [isSelected, setSelected] = useState(false);
    const {data, generalStyle, rowIndex} = props;
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
    const [indexContentWhenHover, setIndexContentWhenHover] = useState({
        contentIdx: -1,
        columnIdx: -1,
        rowIdx: -1
    });
    
    useEffect(() => {
        if (activeElement === id) {
            setCurrentRowIndex(rowIndex);
        }
    });

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    };

    const getItemStyle = (isDragging, draggableStyle) => {
        return {
            background: isDragging ? '#D7AEB5' : '',        
            ...draggableStyle
        };
    };

    const onMouseDownDragIcon = (e, id) => {
        window.addEventListener('mouseup', onMouseUpWhenDragging);
        window.addEventListener('mousemove', onMouseMoveDraggingItem);
        dispatchStore({
            type: actionType.DRAGGING_ITEM,
            payload: {
                draggingItem: id
            }
        });
    };

    const onMouseMoveDraggingItem = (e) => {
        
    };

    const onMouseUpWhenDragging = () => {
        dispatchStore({
            type: actionType.DRAGGING_ITEM,
            payload: {
                draggingItem: ''
            }
        });

        window.removeEventListener('mousemove', onMouseMoveDraggingItem);
        window.removeEventListener('mouseup', onMouseUpWhenDragging);
    };

    const getItemStylePseudo = (isDragging, draggableStyle) => {
        return {
            ...draggableStyle,
            background: isDragging ? '#D7AEB5' : '',
            display: 'flex',
            alignItems: 'center',
            width: 20            
        };
    };

    const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
        const item = items[rubric.source.index];

        return (
            <span
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={{
                    ...getItemStylePseudo(snapshot.isDragging, provided.draggableProps.style)
                }}
            >
                <Icon className={classnames('icon-ants-double-three-dots', styles['drag-row'])} /> 
            </span>
        );
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

        const randomId = getRndInteger(1,100000);

        return (
            <Droppable isDropDisabled={true} droppableId={`droppable-content-${randomId}-${columnId}`} type='contents' renderClone={getRenderItem(contents, 'abc')}>
                {(provided, snapshot) => {

                    return (
                        <div className={'layer-group-content'} ref={provided.innerRef} {...provided.droppableProps}>
                            {contents.length ? contents.map((content, index) => {
                                const id = getObjectPropSafely(() => content.values._meta.htmlID);

                                const shouldRenderClone = `draggable-${id}` === snapshot.draggingFromThisWith;
                                
                                return (
                                    <Fragment key={`draggable-${id}`}>
                                        {shouldRenderClone ? (
                                            <Fragment>
                                                <div
                                                    className={classnames(
                                                        'layer-selectable', 
                                                        styles['layer-content'],
                                                        styles['react-beautiful-dnd-copy']
                                                    )}
                                                    onMouseOver={(e) => onMouseOverItem(e, id, index, columnIndex, rowIndex)}
                                                    onMouseOut={onMouseOutContent}
                                                >
                                                    {renderSelector({
                                                        isShowAddTop: false, 
                                                        isShowAddBottom: false, 
                                                        isRow: false, 
                                                        isSelected: activeElement === id,
                                                        dragHandleProps: {...provided.dragHandleProps}
                                                    })}
                                                    {getContent(content)}
                                                </div>
                                                {renderDragItHere('content', index)}
                                            </Fragment>
                                        ) : (
                                            <Draggable draggableId={`draggable-${id}`} index={index}>
                                                {(provided, snapshot) => {
                                                    let isInsideRow = false;
    
                                                    if (currentRowIndex === rowIndex) {
                                                        isInsideRow = true;
                                                    } else {
                                                        isInsideRow = false;
                                                    }

                                                    return (
                                                        <>
                                                            <div
                                                                id={id}
                                                                className={classnames(
                                                                    'layer-selectable', 
                                                                    styles['layer-content'],
                                                                    {[styles['layer-selected']]: activeElement === id}
                                                                )}
                                                                onClick={(e) => onClickSelectContent(e, id)}
                                                                onMouseDown={(e) => onMouseDownContent(e, rowIndex, columnIndex, index)}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                style={{
                                                                    ...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
                                                                    ...(snapshot.isDragging && {width: 0, height: 0})
                                                                }}
                                                                onMouseOver={(e) => onMouseOverItem(e, id, index, columnIndex, rowIndex)}
                                                                onMouseOut={onMouseOutContent}
                                                                
                                                            >
                                                                {renderSelector({
                                                                    isShowAddTop: false, 
                                                                    isShowAddBottom: false, 
                                                                    isRow: false, 
                                                                    isSelected: activeElement === id,
                                                                    isInsideRow,
                                                                    dragHandleProps: {...provided.dragHandleProps},
                                                                    id
                                                                })}
                                                                {getContent(content)}
                                                            </div>
                                                            {renderDragItHere('content', index, columnIndex, rowIndex)}
                                                        </>           
                                                    );
                                                }}
                                            </Draggable>
                                        )}
                                    </Fragment>
                                );
                            }) : (
                                <div className="blockbuilder-placeholder" data-name="Drag it here">
                                    <div className={styles['empty-column']}>
                                        <div 
                                            style={{
                                                zIndex: 112
                                            }}
                                        >
                                            <div>
                                                    No content here. Drag content from right.
                                            </div>
                                            {
                                                false && (
                                                    <div>
                                                        <button className={classnames('btn', styles['add-content'])}>
                                                        Add Content
                                                        </button>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* {provided.placeholder} */}
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
        const newBodies = _.cloneDeep(bodies);

        const newBodyId = Object.keys(newBodies)[0];

        newBodies[newBodyId].rows = [...rowPositions];
        
        // update usage counters
        const newUsageCounters = {...usageCounters};

        newUsageCounters.u_column++;
        newUsageCounters.u_row++;

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

    const onClickDeleteRow = (e) => {
        e.stopPropagation();

        // update at usageCounters
        const newUsageCounters = {...usageCounters};
        
        // delete at bodies 
        const rowPositions = [...getRowsFromBodies(bodies)];
        const deleteRowId = rowPositions.splice(currentRowIndex, 1);

        const newBodies = _.cloneDeep(bodies);

        const newBodyId = Object.keys(newBodies)[0];

        newBodies[newBodyId].rows = [...rowPositions];

        // delete at rows
        const newRows = {...rows};
        const deleteColumnIdList = [...newRows[deleteRowId].columns];

        newUsageCounters.u_row--;

        delete newRows[deleteRowId];

        // delete at columns
        const newColumns = {...columns};
        let deleteContentIdList = [];

        deleteColumnIdList.length && deleteColumnIdList.forEach(id => {
            deleteContentIdList = deleteContentIdList.concat(newColumns[id].contents);
            
            newUsageCounters.u_column--;
            delete newColumns[id];
        });

        // delete at contents
        const newContents = {...contents};

        deleteContentIdList.length && deleteContentIdList.forEach(id => {
            
            switch (newContents[id].type) {
                case 'button': newUsageCounters.u_content_button--;
                    break;
                case 'divider': newUsageCounters.u_content_divider--;
                    break;
                case 'image': newUsageCounters.u_content_image--;
                    break;
                case 'menu': newUsageCounters.u_content_menu--;
                    break;
                case 'social': newUsageCounters.u_content_social--;
                    break;
                default: newUsageCounters.u_content_text--;
                    break;
            }

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
    
    };

    const onClickDuplicateRow = (e) => {
        e.stopPropagation();
        const data = {...store};
        const newRowId = (parseInt(getLastUsingId(data), 0) + 1) + '';
        const currentRowId = getRowId(store,rowIndex);
        const columnIdList = [...rows[currentRowId].columns];
        let newColumnId = (parseInt(newRowId, 0) + 1) + '';
        let newContentId = 0;

        const rowPositions = [...getRowsFromBodies(bodies)];

        rowPositions.splice(currentRowIndex + 1, 0, newRowId);

        // update usageCounters
        const newUsageCounters = {...usageCounters};

        // update bodies
        const newBodies = _.cloneDeep(bodies);

        const newBodyId = Object.keys(newBodies)[0];

        newBodies[newBodyId].rows = [...rowPositions];

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
        newUsageCounters.u_row++;

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
            newUsageCounters.u_column++;

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
                switch (newContents[newContentId].type) {
                    case 'button': newUsageCounters.u_content_button++;
                        break;
                    case 'divider': newUsageCounters.u_content_divider++;
                        break;
                    case 'image': newUsageCounters.u_content_image++;
                        break;
                    case 'menu': newUsageCounters.u_content_menu++;
                        break;
                    case 'social': newUsageCounters.u_content_social++;
                        break;
                    default: newUsageCounters.u_content_text++;
                        break;
                }

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
    };

    const renderSelector = ({
        isShowAddTop = true, 
        isShowAddBottom = true, 
        isRow = true, 
        isSelected = false,
        isInsideRow = false,
        dragHandleProps = {}, 
        id = ''
    } = {}) => {

        const selectorIndex = () => {

            if (isRow === true && isSelected === true) {
                return {
                    zIndex: 100
                };
            }
            if (isRow === true && isSelected === false) {
                return {
                    zIndex: 0
                };
            }

            if (isRow === false && isInsideRow === true) {
                return {
                    zIndex: 101
                };
            }

            if (isEditing === false) {
                return {
                    zIndex: 99
                };
            }

            return {};
        };

        return (
            <div className={classnames(
                styles['layer-selector-row'],
                {[styles['active']]: isSelected},
                {[styles['layout-mobile-row']]: viewMode === CONSTANTS.VIEW_MODE.MOBILE && isRow}
            )}
            style={selectorIndex()}>
                {isShowAddTop && (
                    <div className={classnames(
                        styles['layer-add-row'],
                        styles['layer-add-row-top']
                    )}
                    onClick={(e) => onClickAddRow(e, 'top', currentRowIndex)}
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
                    >
                        <Icon className={classnames('icon-ants-add')} />
                    </div>
                )}
                
                <div className={classnames(
                    styles['layer-action-row']
                )}>
                    <div className={classnames(styles['duplicate-row'])} onClick={onClickDuplicateRow}>
                        <Icon className={classnames('icon-ants-copy-report')} />
                    </div>
                    <div className={classnames(styles['delete-row'])} onClick={onClickDeleteRow}>
                        <Icon className={classnames('icon-ants-delete')} />
                    </div>
                </div>
                <div className={classnames(styles['layer-drag-row'])} >
                    <span {...dragHandleProps} onMouseDown={(e) => onMouseDownDragIcon(e, id)}>
                        <Icon className={classnames('icon-ants-double-three-dots', styles['drag-row'])} />  
                    </span>
                </div>
            </div>
        );
    };

    const onMouseOverItem = (event, id, index, columnIndex, rowIndex) => {
        const elm = document.querySelector(`#${id}`);

        const height = document.getElementById(id).offsetHeight;
        const top = getOffset(elm).top;
        const bottom = top + height;

        // console.log('index', index, columnIndex, rowIndex);
        setIndexContentWhenHover({
            contentIdx: index,
            columnIdx: columnIndex,
            rowIdx: rowIndex
        });
    };

    const onMouseOutContent = () => {
        setIndexContentWhenHover({
            contentIdx: -1,
            columnIdx: -1,
            rowIdx: -1
        });
    };

    const renderDragItHere = (type, index, columnIndex, rowIndex) => {
        switch (type) {
            case 'content':
                let isHover = false;

                if (index === indexContentWhenHover.contentIdx && columnIndex === indexContentWhenHover.columnIdx && rowIndex === indexContentWhenHover.rowIdx) {
                    isHover = true;
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
                return (
                    <div 
                        className={classnames(
                            styles['drag-it-here'],
                            {[styles['active']] : false}
                        )} 
                        data-name="Drag it here" 
                    />
                );
        }
        
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

    const onMouseDownContent = (e, rowIndex, columnIndex, contentIndex) => {
        e.stopPropagation();
        const rowId = getRowId(store, rowIndex);

        const columnId = getColumnId(store, rowId, columnIndex);

        dispatchStore({
            type: actionType.DRAGGING_COLUMN_ID,
            payload: {
                columnId,
                contentIndex
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

    return (
        <>
            <div   
                className={classnames(
                    'layer-selectable', 
                    styles['layer-row'],
                    {[styles['layer-selected']]: activeElement === id}
                )}
                onClick={onClickSelectRow}
            >
                {renderSelector({isSelected: activeElement === id, dragHandleProps: props.provided.dragHandleProps, isRow: true})}
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
            {renderDragItHere('row', rowIndex)}
        </>
    );
};

export default Row;