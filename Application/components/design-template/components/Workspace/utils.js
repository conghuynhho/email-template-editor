import {getObjectPropSafely} from 'Utils'
;

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
        nestedData.schemaVersion = getObjectPropSafely(()=>data.design.schemaVersion); 
        nestedData.counters = getObjectPropSafely(()=>data.design.idCounters);
        // get data for body
        const [body] = Object.values(getObjectPropSafely(()=>data.design.bodies));
        const nestedBody = nestData(body, getObjectPropSafely(()=>data.design.rows), 'rows');
        const nestedRow = nestedBody.rows.map((rowItem) => {
            const columns = nestData(rowItem.columns ,getObjectPropSafely(()=>data.design.columns), 'columns' );
            const nestedColumns = columns.columns.map(column => {
                const content = nestData(column.contents,getObjectPropSafely(()=>data.design.contents), 'content');

                return {
                    ...column,
                    contents: content.content
                };
            });

            columns.columns = [...nestedColumns];
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
