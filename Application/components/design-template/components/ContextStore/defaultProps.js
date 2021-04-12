import {CONSTANTS} from 'Components/design-template/constants';

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
    [CONSTANTS.TYPE_CONTENT.DIVIDER]: {
        containerPadding: '5px',
        selectable: true,
        draggable: true,
        duplicatable: true,
        deletable: true,
        width: '100%',
        moreOptions: false,
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
    },
    [CONSTANTS.TYPE_CONTENT.BUTTON]: {
        containerPadding: '10px 10px 50px',
        selectable: true,
        draggable: true,
        duplicatable: true,
        deletable: true,
        href: {
            'name': 'web',
            'values': {
                'href': '',
                'target': '_blank'
            }
        },
        buttonColors: {
            color: '#463a41',
            backgroundColor: '#ffffff',
            hoverColor: '#FFFFFF',
            hoverBackgroundColor: '#3AAEE0'
        },
        size: {
            autoWidth: true,
            width: '100%'
        },
        textAlign: 'center',
        lineHeight: '120%',
        padding: '12px 22px',
        border: {
            borderBottomColor: '#CCC',
            borderBottomStyle: 'solid',
            borderBottomWidth: '8px',
            borderLeftColor: '#CCC',
            borderLeftStyle: 'solid',
            borderLeftWidth: '8px',
            borderRightColor: '#CCC',
            borderRightStyle: 'solid',
            borderRightWidth: '8px',
            borderTopColor: '#CCC',
            borderTopStyle: 'solid',
            borderTopWidth: '8px'
        },
        borderRadius: '0px',
        hideDesktop: false,
        hideMobile: false,
        text: '<strong><span style="font-size: 14px; line-height: 16.8px;">VIEW MORE</span></strong>',
        calculatedWidth: 134,
        calculatedHeight: 40,
        _meta: {
            htmlID: 'u_content_button_1',
            htmlClassNames: 'u_content_button'
        }
    },
    [CONSTANTS.TYPE_CONTENT.IMAGE]: {
        containerPadding: '10px',
        selectable: true,
        draggable: true,
        duplicatable: true,
        deletable: true,
        src: {
            url: 'https://cdn.templates.unlayer.com/assets/1606934810497-02.png',
            width: 626,
            height: 418
        },
        // moreOptionsPaddingImage: false,
        textAlign: 'center',
        altText: 'Image',
        action: {
            name: 'web',
            values: {
                href: '',
                target: '_blank'
            }
        },
        hideDesktop: false,
        hideMobile: false,
        _meta: {
            htmlID: 'u_content_image_3',
            htmlClassNames: 'u_content_image'
        }
    },
    [CONSTANTS.TYPE_CONTENT.MENU]: {
        containerPadding: '25px 10px 10px',
        selectable: true,
        draggable: true,
        duplicatable: true,
        deletable: true,
        menu: {
            items: [
                {
                    key: '1606923979328',
                    link: {
                        name: 'web',
                        values: {
                            href: '',
                            target: '_self'
                        }
                    },
                    text: 'NEWS'
                },
                {
                    key: '1606924033905',
                    link: {
                        name: 'web',
                        values: {
                            href: '',
                            target: '_self'
                        }
                    },
                    text: 'SERVICE'
                }
            ]
        },
        fontFamily: {
            label: 'Montserrat',
            value: '\'Montserrat\',sans-serif',
            url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
            defaultFont: true
        },
        fontSize: '14px',
        textColor: '#444444',
        linkColor: '#0068A5',
        align: 'center',
        layout: 'horizontal',
        separator: '',
        padding: '5px 15px',
        hideDesktop: false,
        hideMobile: false,
        _meta: {
            htmlID: 'u_content_menu_3',
            htmlClassNames: 'u_content_menu'
        }
    },
    [CONSTANTS.TYPE_CONTENT.TEXT]: {
        containerPadding: '10px',
        selectable: true,
        draggable: true,
        duplicatable: true,
        deletable: true,
        color: '#ffffff',
        textAlign: 'center',
        lineHeight: '140%',
        linkStyle: {
            inherit: true,
            linkColor: '#0000ee',
            linkHoverColor: '#0000ee',
            linkUnderline: true,
            linkHoverUnderline: true
        },
        hideDesktop: false,
        hideMobile: false,
        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-family: montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong><span style="font-size: 44px; line-height: 61.6px;">NEW ARRIVAL</span></strong></span></p>',
        _meta: {
            htmlID: 'u_content_text_1',
            htmlClassNames: 'u_content_text'
        }
    },
    [CONSTANTS.TYPE_CONTENT.HTML]: {
        containerPadding: '18px',
        
        selectable: true,
        draggable: true,
        duplicatable: true,
        deletable: true,
        html: '<strong>Hello, world!</strong>',
        hideDesktop: false,
        hideMobile: false,
        _meta: {
            htmlID: 'u_content_html_2',
            htmlClassNames: 'u_content_html'
        }
    }
};

export {
    defaultStyleGeneral,
    defaultStyleRow,
    defaultStyleColumn,
    defaultStyleContent
};