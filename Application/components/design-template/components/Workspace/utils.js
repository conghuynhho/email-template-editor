import {getObjectPropSafely} from 'Utils'
;

export const hierarchyDesignData = (flatData) => {
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
            const rows = getObjectPropSafely(()=>location.rows);

            rows.forEach(element => {
                const data = getObjectPropSafely(()=> baseData[element]);

                result[key].push(data);
            });
            result.values = getObjectPropSafely(()=>location.values);
        }
        if (key === 'columns' || key === 'content') {
            location.forEach(element => {
                const data = getObjectPropSafely(()=>baseData[element]);

                result[key].push(data);
            });
        }
        return result;
    }

    if (flatData) {
        nestedData.schemaVersion = getObjectPropSafely(()=>flatData.design.schemaVersion); 
        nestedData.counters = getObjectPropSafely(()=>flatData.design.idCounters);
        // get flatData for body
        const [body] = Object.values(getObjectPropSafely(()=>flatData.design.bodies));
        const nestedBody = nestData(body, getObjectPropSafely(()=>flatData.design.rows), 'rows');
        const nestedRow = nestedBody.rows.map((rowItem) => {
            const columns = nestData(rowItem.columns ,getObjectPropSafely(()=>flatData.design.columns), 'columns' );
            const nestedColumns = columns.columns.map(column => {
                const content = nestData(column.contents,getObjectPropSafely(()=>flatData.design.contents), 'content');

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
