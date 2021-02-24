import React, {Fragment} from 'react';
import {getObjectPropSafely} from 'Utils';
import styles from 'Components/design-template/components/Workspace/components/Row/styles.module.scss';
import Divider from 'Components/design-template/components/Workspace/components/Divider';
import Image from 'Components/design-template/components/Workspace/components/Image';
import Text from 'Components/design-template/components/Workspace/components/Text';

const Row = (props) => {
    const {data, generalStyle} = props;
    const id = getObjectPropSafely(() => data.values._meta.htmlID);
    const classTitle = getObjectPropSafely(() => data.values._meta.htmlClassNames);
    const styleRow = {
        padding: getObjectPropSafely(() => data.values.padding),
        backgroundColor: getObjectPropSafely(() => data.values.backgroundColor)
    };
    const styleContainer = {
        maxWidth: getObjectPropSafely(() => generalStyle.contentWidth),
        backgroundColor: getObjectPropSafely(() => data.values.columnsBackgroundColor),
        margin: '0px auto'
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
            }
        };

        return (
            <div className={'layer-group-content'}>
                {
                    contents.length ? contents.map((content, index) => {
                        return (
                            <Fragment key={index}>
                                <div className={'layer-selectable'}>
                                    <div className={'layer-selector'} />
                                    {getContent(content)}
                                </div>
                                <div className="blockbuilder-placeholder" data-name="Drag it here" />
                            </Fragment>
                        );
                    }) : (
                        <div className="blockbuilder-placeholder" data-name="Drag it here">
                            <div className={styles['empty_column']}>
                                <div 
                                    style={{
                                        zIndex: 112
                                    }}
                                >
                                    <div>
                                        No content here. Drag content from right.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
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

    return (
        <div className={'row-layer'}>
            <div className={'row-selector'} />
            <div
                id={id}
                className={classTitle}
                style={styleRow}
            >
                <div 
                    className="container"
                    style={styleContainer}
                >
                    <div className={styles[classTitle]}>
                        {renderColumns()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Row;