export const hierarchyDesignData = (data) => {
    let bodyValues = {};
    const rows = [];
    let rowPositions = [];

    for (const key in data.bodies) {
        bodyValues = data.bodies[key].values;
        rowPositions = data.bodies[key].rows;

    }

    // for (const key in data.rows) { // 1
    rowPositions.forEach(row => {

        const columnKeys = data.rows[row].columns; // 2
    
        const columns = columnKeys.map(columnKey => {
            
            for (const key in data.columns) {
                if (key === columnKey) {

                    const contentKeys = data.columns[key].contents;
    
                    const contents = contentKeys.map(contentKey => {
    
                        for (const key in data.contents) {
                            if (key === contentKey) {
    
                                return {
                                    type: data.contents[key].type,
                                    slug: undefined,
                                    values: data.contents[key].values
                                };
                            }
                        }
                    });
    
                    return {
                        contents: contents,
                        values: data.columns[key].values
                    };
                }
            }
        });
    
        rows.push({
            cells: data.rows[row].cells, // 3
            values: data.rows[row].values, // 4
            columns: columns 
        });
    });

    // }

    const saveDesignData = {
        body: {
            rows: rows,
            values: bodyValues
        },
        counters: data.idCounters,
        schemaVersion: data.schemaVersion
    };

    return saveDesignData;
};

export const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
};

export const getRowId = (designData, rowIndex) => {
    const bodyKeyList = [];

    for (const key in designData.bodies) {
        bodyKeyList.push(key);
    }

    const rows = designData.bodies[bodyKeyList[0]].rows;
    const rowId = rows[rowIndex];

    return rowId;
};

export const getColumnId = (designData, rowId, columnIndex) => {
    const columns = designData.rows[rowId].columns;
    const columnId = columns[columnIndex];

    return columnId;
};