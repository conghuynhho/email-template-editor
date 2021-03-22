
export const hierarchyDesignData = (data) => {
    let nestedData = {
        body: {},
        counters:{},
        schemaVersion: 0      
    };

    function nestData(location, baseData, key) {
        // location đay là mảng chứa các địa chỉ cần trỏ đến [array]
        // baseData chứa các data chính để trỏ đến lấy [object]
        if (!location) {return}
        if (!baseData) {return}
        const result = {};

        result[key] = [];
        if (key === 'rows') {
            location.rows.forEach(element => {
                result[key].push(baseData[element]);
            });
            result.values = location.values;
        }
        if (key === 'columns' || key === 'content') {
            location.forEach(element => {
                result[key].push(baseData[element]);
            });
        }
        return result;
    }

    if (data) {
        nestedData.schemaVersion = data.design.schemaVersion; 
        nestedData.counters = data.design.idCounters;
        
        // get data for body
        const [body] = Object.values(data.design.bodies);
        const nestedBody = nestData(body, data.design.rows, 'rows');

        const nestedRow = nestedBody.rows.map((rowItem) => {
            const columns = nestData(rowItem.columns ,data.design.columns, 'columns' );

            const nestedColumns = columns.columns.map(column => {
                const content = nestData(column.contents, data.design.contents, 'content');

                delete column.location;
                return {
                    ...column,
                    contents: content.content
                };
            });
            
            columns.columns = [...nestedColumns];
            delete rowItem.location;
            return {
                ...rowItem,
                columns: columns.columns
            };
        });

        nestedBody.rows = [...nestedRow];
        nestedData.body = {...nestedBody};
        return nestedData;
    }
}
;
