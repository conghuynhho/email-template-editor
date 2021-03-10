import {
    defaultStyleGeneral,
    defaultStyleRow,
    defaultStyleColumn,
    defaultStyleContent
} from 'Components/design-template/components/ContextStore/defaultProps';
import {CONSTANTS} from 'Components/design-template/constants';
import {designData} from 'Components/design-template/components/Workspace/constants';

export const initialState = {
    pages: {
        '1': {
            body: ['2'],
            location: {collection: 'pages', id: '1'},
            schemaVersion: 5
        }
    },
    bodies: {
        '2': {
            location: {collection: 'bodies', id: '2'},
            rows: ['3'],
            values: defaultStyleGeneral
        }
    },
    rows: {
        '3': {
            location: {'collection': 'rows', 'id': '3'},
            cells: [1],
            columns: ['4'],
            values: defaultStyleRow
        }
    },
    columns: {
        '4': {
            location: {collection: 'columns', id: '4'},
            contents: ['5'],
            values: defaultStyleColumn
        } 
    },
    contents: {
        '5': {
            location: {'collection': 'contents','id': '5'},
            type: CONSTANTS.TYPE_CONTENT.DIVIDER,
            values: defaultStyleContent.divider
        }
    },
    idCounters: {
        u_row: 13,
        u_column: 16,
        u_content_divider: 6,
        u_content_button: 4,
        u_content_image: 3,
        u_content_menu: 3,
        u_content_text: 11,
        u_content_html: 11,
        u_content_social: 1
    },
    usageCounters: {  
        u_page: 1,
        u_body: 1,
        u_row: 1,
        u_column: 1,
        u_content_divider: 1,
        u_content_button: 0,
        u_content_image: 0,
        u_content_menu: 0,
        u_content_text: 0,
        u_content_html: 0,
        u_content_social: 0
    },
    ...designData.design,
    schemaVersion: 5,
    viewMode: CONSTANTS.VIEW_MODE.DESKTOP,
    sidePanelMode: CONSTANTS.SIDE_PANEL_MODE.RIGHT,
    isOpenPreview: false,
    activeElement: 'u_body' // Example: u_row_13, u_column_16, u_content_divider_6
};