export const defaultStyleGeneral = {
    backgroundColor: '#e8d4bb',
    backgroundImage: {
        url: '',
        fullWidth: true,
        repeat: false,
        center: true,
        cover: false
    },
    contentWidth: '600px',
    contentAlign: 'center',
    fontFamily: {
        label: 'Montserrat',
        value: '\'Montserrat\',sans-serif',
        url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
        defaultFont: true
    },
    preheaderText: '',
    linkStyle: {
        body: true,
        linkColor: '#0000ee',
        linkHoverColor: '#0000ee',
        linkUnderline: true,
        linkHoverUnderline: true
    },
    _meta: {
        htmlID: 'u_body',
        htmlClassNames: 'u_body'
    }
};

export const defaultStyleRow = {
    displayCondition: null,
    columns: false,
    backgroundColor: '#ffffff',
    columnsBackgroundColor: '#ffffff',
    backgroundImage: {
        url: '',
        fullWidth: true,
        repeat: false,
        center: true,
        cover: false
    },
    padding: '3px 4px 6px 5px', // build và parse từ dạng này để đọc luôn
    hideDesktop: false,
    hideMobile: false,
    noStackMobile: false,
    _meta: {
        htmlID: 'u_row_13',
        htmlClassNames: 'u_row'
    },
    selectable: true,
    draggable: true,
    duplicatable: true,
    deletable: true
};

export const defaultStyleColumn = {
    backgroundColor: '#fc8585',
    border: {
        borderBottomColor: '#CCC',
        borderBottomStyle: 'solid',
        borderBottomWidth: '4px',
        borderLeftColor: '#CCC',
        borderLeftStyle: 'solid',
        borderLeftWidth: '4px',
        borderRightColor: '#CCC',
        borderRightStyle: 'solid',
        borderRightWidth: '4px',
        borderTopColor: '#CCC',
        borderTopStyle: 'solid',
        borderTopWidth: '4px'
    },
    padding: '3px 4px 6px 5px',
    _meta: {
        htmlID: 'u_column_16',
        htmlClassNames: 'u_column'
    }
};

export const defaultStyleContent = {
    divider: {
        containerPadding: '5px',
        selectable: true,
        draggable: true,
        duplicatable: true,
        deletable: true,
        width: '100%',
        border: {
            borderTopWidth: '0px',
            borderTopStyle: 'solid',
            borderTopColor: '#BBBBBB'
        },
        textAlign: 'center',
        hideDesktop: false,
        hideMobile: false,
        _meta: {
            'htmlID': 'u_content_divider_6',
            'htmlClassNames': 'u_content_divider'
        }
    }
};

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
            rows: ['3', '6', '13', '18', '22', '33', '36', '41', '44', '48'],
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
            type: 'divider',
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
        u_row: 10,
        u_column: 13,
        u_content_divider: 4,
        u_content_button: 4,
        u_content_image: 3,
        u_content_menu: 2,
        u_content_text: 11,
        u_content_html: 11,
        u_content_social: 1
    },
    schemaVersion: 5
};