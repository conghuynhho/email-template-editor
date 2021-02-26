import {typeContent} from 'Components/design-template/constants';

const defaultStyleGeneral = {
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

const defaultStyleRow = {
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
    padding: '3px 4px 6px 5px',
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

const defaultStyleColumn = {
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

const defaultStyleContent = {
    [typeContent.divider]: {
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

export {
    defaultStyleGeneral,
    defaultStyleRow,
    defaultStyleColumn,
    defaultStyleContent
};