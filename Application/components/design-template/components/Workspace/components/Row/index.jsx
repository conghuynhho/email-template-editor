import React, {Fragment, useState, useContext} from 'react';
import classnames from 'classnames';
import {getObjectPropSafely} from 'Utils';
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

const Row = (props) => {
    const {state: store = {}, dispatch: dispatchStore} = useContext(StoreContext);
    const {viewMode, activeElement} = store;
    const [isSelected, setSelected] = useState(false);
    const {data, generalStyle} = props;
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

    const getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    };

    const getItemStyle = (isDragging, draggableStyle) => {
        return {
            background: isDragging ? '#D7AEB5' : '',        
            ...draggableStyle
        };
    };

    const renderContents = (contents) => {
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
            <Droppable droppableId={`droppable-content-${randomId}`} type='contents'>
                {(provided) => (
                    <div className={'layer-group-content'} ref={provided.innerRef} {...provided.droppableProps}>
                        {contents.length ? contents.map((content, index) => {
                            const id = getObjectPropSafely(() => content.values._meta.htmlID);

                            return (

                                <Draggable key={index} draggableId={`draggable-${id}`} index={index}>
                                    {(provided, snapshot) => (
                                        <>
                                            <div 
                                                className={classnames(
                                                    'layer-selectable', 
                                                    styles['layer-content'],
                                                    {[styles['layer-selected']]: activeElement === id}
                                                )}
                                                onClick={(e) => onClickSelectContent(e, id)}
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                            >
                                                {renderSelector({
                                                    isShowAddTop: false, 
                                                    isShowAddBottom: false, 
                                                    isRow: false, 
                                                    isSelected: activeElement === id,
                                                    dragHandleProps: provided.dragHandleProps
                                                })}
                                                {getContent(content)}
                                            </div>
                                            {renderDragItHere()}
                                        </>

                                    )}
                                </Draggable>
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
                        {provided.placeholder}
                    </div>
                )}
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
                        {renderContents(contents)}
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
        dragHandleProps = {}
    } = {}) => {
        return (
            <div className={classnames(
                styles['layer-selector-row'],
                {[styles['active']]: isSelected},
                {[styles['layout-mobile-row']]: viewMode === CONSTANTS.VIEW_MODE.MOBILE && isRow}
            )}>
                {isShowAddTop && (
                    <div className={classnames(
                        styles['layer-add-row'],
                        styles['layer-add-row-top']
                    )}>
                        <Icon className={classnames('icon-ants-add')} />
                    </div>
                )}

                {isShowAddBottom && (
                    <div className={classnames(
                        styles['layer-add-row'],
                        styles['layer-add-row-bottom']
                    )}>
                        <Icon className={classnames('icon-ants-add')} />
                    </div>
                )}
                
                <div className={classnames(
                    styles['layer-action-row']
                )}>
                    <div className={classnames(styles['duplicate-row'])}>
                        <Icon className={classnames('icon-ants-copy-report')} />
                    </div>
                    <div className={classnames(styles['delete-row'])}>
                        <Icon className={classnames('icon-ants-delete')} />
                    </div>
                </div>
                <div className={classnames(styles['layer-drag-row'])} >
                    <span {...dragHandleProps}>
                        <Icon className={classnames('icon-ants-double-three-dots', styles['drag-row'])} />  
                    </span>
                </div>
            </div>
        );
    };

    const renderDragItHere = () => {
        return (
            <div 
                className={classnames(
                    styles['drag-it-here'],
                    {[styles['active']] : false}
                )} 
                data-name="Drag it here" 
            />
        );
    };

    const onClickSelectContent = (e, id) => {
        e.stopPropagation();
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {activeElement: id}
        });
    };

    const onClickSelectRow = (e) => {
        e.stopPropagation();
        dispatchStore({
            type: actionType.ACTIVE_ELEMENT,
            payload: {activeElement: id}
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
                {renderSelector({isSelected: activeElement === id, dragHandleProps: props.provided.dragHandleProps})}
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
            {renderDragItHere()}
        </>
    );
};

export default Row;