import {random} from 'Utils/index.ts';

const sidePanelConfig = [
    {
        id: 'General',
        type: 'GENERAL',
        resource: {
            general: [
                {
                    id: 'general',
                    elements: [
                        {
                            type: 'TEXT_INPUT',
                            id: 'contentWidth',
                            label: 'Content width',
                            defaultValue: '500',
                            unit: 'px',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '60%'
                                },
                                styleChild: {
                                    width: 65
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'backgroundColorGeneral',
                            label: 'Background color',
                            defaultValue: '#333333',
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        {
                            type: 'FONT_FAMILY',
                            id: 'fontFamily',
                            label: 'Font',
                            isShowIcon: true,
                            defaultValue: 'arial',
                            tooltip: 'Font family',
                            options: [
                                {
                                    name: 'Andale Mono',
                                    label: 'Andale Mono',
                                    value: '"andale mono", times',
                                    defaultFont: true
                                },
                                {
                                    name: 'Arial',
                                    label: 'Arial',
                                    value: 'arial, helvetica, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Arial Black',
                                    label: 'Arial Black',
                                    value: '"arial black", "avant garde", arial',
                                    defaultFont: true
                                },
                                {
                                    name: 'Book Antiqua',
                                    label: 'Book Antiqua',
                                    value: '"book antiqua", palatino',
                                    defaultFont: true
                                },
                                {
                                    name: 'Cabin',
                                    label: 'Cabin',
                                    value: 'Cabin, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Montserrat',
                                    label: 'Montserrat',
                                    value: 'Montserrat, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Commic Sans MS',
                                    label: 'Commic Sans MS',
                                    value: '"comic sans ms", sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Courier New',
                                    label: 'Courier New',
                                    value: 'courier new", courier',
                                    defaultFont: true
                                },
                                {
                                    name: 'Crimson Text',
                                    label: 'Crimson Text',
                                    value: '"Crimson Text", serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Georgia',
                                    label: 'Georgia',
                                    value: 'georgia, palatino',
                                    defaultFont: true
                                },
                                {
                                    name: 'Helvetica',
                                    label: 'Helvetica',
                                    value: 'helvetica, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Impact',
                                    label: 'Impact',
                                    value: 'impact, chicago',
                                    defaultFont: true
                                },
                                {
                                    name: 'Lato',
                                    label: 'Lato',
                                    value: 'Lato, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Lobster Two',
                                    label: 'Lobster Two',
                                    value: '"Lobster Two", cursive',
                                    defaultFont: true
                                },
                                {
                                    name: 'Old Standard TT',
                                    label: 'Old Standard TT',
                                    value: '"Old Standard TT", serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Open Sans',
                                    label: 'Open Sans',
                                    value: '"Open Sans", sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Pacifico',
                                    label: 'Pacifico',
                                    value: 'Pacifico, cursive',
                                    defaultFont: true
                                },
                                {
                                    name: 'Playfair Display',
                                    label: 'Playfair Display',
                                    value: '"Playfair Display", serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Raleway',
                                    label: 'Raleway',
                                    value: 'Raleway, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Rubik',
                                    label: 'Rubik',
                                    value: 'Rubik, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Source Sans Pro',
                                    label: 'Source Sans Pro',
                                    value: '"Source Sans Pro", sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Symbol',
                                    label: 'Symbol',
                                    value: 'symbol',
                                    defaultFont: true
                                },
                                {
                                    name: 'Tahoma',
                                    label: 'Tahoma',
                                    value: 'tahoma, arial, helvetica, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Terminal',
                                    label: 'Terminal',
                                    value: 'terminal, monaco',
                                    defaultFont: true
                                },
                                {
                                    name: 'Times New Roman',
                                    label: 'Times New Roman',
                                    value: '"times new roman", times',
                                    defaultFont: true
                                },
                                {
                                    name: 'Trebuchet Ms',
                                    label: 'Trebuchet Ms',
                                    value: '"trebuchet ms", geneva',
                                    defaultFont: true
                                },
                                {
                                    name: 'Verdana',
                                    label: 'Verdana',
                                    value: 'verdana, geneva',
                                    defaultFont: true
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 'emailSettings',
                    label: 'Email settings',
                    elements: [
                        {
                            type: 'TEXT_INPUT',
                            id: 'preheaderText',
                            isShowMessage: true,
                            message: 'A preheader is the short summary text that follows the subject line when viewing an email from the inbox',
                            label: 'Preheader Text',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '90%'
                                },
                                styleChild: {
                                    width: 302
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'links',
                    label: 'Links',
                    elements: [
                        {
                            type: 'FONT_COLOR',
                            id: 'linkColor',
                            label: 'Font color',
                            defaultValue: '#333333',
                            tooltip: 'Font color',
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        {
                            type: 'SELECT_SINGLE',
                            id: 'linkUnderline',
                            label: 'Underline style',
                            defaultValue: 'none',
                            options: [
                                {
                                    name: 'none',
                                    label: 'None'
                                },
                                {
                                    name: 'underline',
                                    label: 'Underline'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '60%'
                                },
                                styleChild: {
                                    width: 110
                                }
                            }
                        }
                    ]
                }
            ],
            style: [
                {
                    id: 'listComponents',
                    elements: [
                        {
                            type: 'LABEL',
                            id: 'listComponentsLabel',
                            label: 'Drag and drop component to canvas'
                        },
                        {
                            type: 'LIST_COMPONENTS',
                            id: 'childListComponent',
                            // keyShow: 'moreOptionsButtonPadding',
                            elementChild: [
                                {
                                    id: 'text',
                                    label: 'Text',
                                    icon: 'icon-ants-remove-circle'
                                },
                                {
                                    id: 'menu',
                                    label: 'Menu',
                                    icon: 'icon-ants-fixed-size'
                                },
                                {
                                    id: 'image',
                                    label: 'Image',
                                    icon: 'icon-image-component'
                                },
                                {
                                    id: 'divider',
                                    label: 'Divider',
                                    icon: 'icon-ants-remove-circle'
                                },
                                {
                                    id: 'html',
                                    label: 'HTML',
                                    icon: 'icon-ants-expand-icon-hide'
                                },
                                {
                                    id: 'column',
                                    label: 'Columns',
                                    icon: 'icon-ants-remove-circle'
                                },
                                {
                                    id: 'button',
                                    label: 'Button',
                                    icon: 'icon-ants-remove-circle'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'Columns',
        name: 'Columns',
        type: 'COLUMNS',
        resource: {
            style: [
                {
                    id: 'blockRow',
                    elements: [
                        {
                            type: 'BLOCK_COLUMNS',
                            id: `blockColumn${random(3)}`,
                            listBlock: [
                                {
                                    id: random(3),
                                    width: '100%'
                                }
                            ],
                            style: {
                                styleParent: {
                                    marginBottom: 7
                                }
                            },
                            className: 'col-6'
                        },
                        {
                            type: 'BLOCK_COLUMNS',
                            id: `blockColumn${random(3)}`,
                            listBlock: [
                                {
                                    id: random(3),
                                    width: `${(1 / 3) * 100}%`
                                },
                                {
                                    id: random(3),
                                    width: `${(2 / 3) * 100}%`
                                }
                            ],
                            style: {
                                styleParent: {
                                    marginBottom: 7
                                }
                            },
                            className: 'col-6'
                        },
                        {
                            type: 'BLOCK_COLUMNS',
                            id: `blockColumn${random(3)}`,
                            listBlock: [
                                {
                                    id: random(3),
                                    width: '50%'
                                },
                                {
                                    id: random(3),
                                    width: '50%'
                                }
                            ],
                            style: {
                                styleParent: {
                                    marginBottom: 7
                                }
                            },
                            className: 'col-6'
                        },
                        {
                            type: 'BLOCK_COLUMNS',
                            id: `blockColumn${random(3)}`,
                            listBlock: [
                                {
                                    id: random(3),
                                    width: `${(2 / 3) * 100}%`
                                },
                                {
                                    id: random(3),
                                    width: `${(1 / 3) * 100}%`
                                }
                            ],
                            style: {
                                styleParent: {
                                    marginBottom: 7
                                }
                            },
                            className: 'col-6'
                        },
                        {
                            type: 'BLOCK_COLUMNS',
                            id: `blockColumn${random(3)}`,
                            listBlock: [
                                {
                                    id: random(3),
                                    width: `${(1 / 3) * 100}%`
                                },
                                {
                                    id: random(3),
                                    width: `${(1 / 3) * 100}%`
                                },
                                {
                                    id: random(3),
                                    width: `${(1 / 3) * 100}%`
                                }
                            ],
                            style: {
                                styleParent: {
                                    marginBottom: 7
                                }
                            },
                            className: 'col-6'
                        },
                        {
                            type: 'BLOCK_COLUMNS',
                            id: `blockColumn${random(3)}`,
                            listBlock: [
                                {
                                    id: random(3),
                                    width: '15%'
                                },
                                {
                                    id: random(3),
                                    width: '35%'
                                },
                                {
                                    id: random(3),
                                    width: '15%'
                                },
                                {
                                    id: random(3),
                                    width: '35%'
                                }
                            ],
                            style: {
                                styleParent: {
                                    marginBottom: 7
                                }
                            },
                            className: 'col-6'
                        },
                        {
                            type: 'BLOCK_COLUMNS',
                            id: `blockColumn${random(3)}`,
                            listBlock: [
                                {
                                    id: random(3),
                                    width: '25%'
                                },
                                {
                                    id: random(3),
                                    width: '25%'
                                },
                                {
                                    id: random(3),
                                    width: '25%'
                                },
                                {
                                    id: random(3),
                                    width: '25%'
                                }
                            ],
                            style: {
                                styleParent: {
                                    marginBottom: 7
                                }
                            },
                            className: 'col-6'
                        },
                        {
                            type: 'BLOCK_COLUMNS',
                            id: `blockColumn${random(3)}`,
                            listBlock: [
                                {
                                    id: random(3),
                                    width: '35%'
                                },
                                {
                                    id: random(3),
                                    width: '15%'
                                },
                                {
                                    id: random(3),
                                    width: '35%'
                                },
                                {
                                    id: random(3),
                                    width: '15%'
                                }
                            ],
                            style: {
                                styleParent: {
                                    marginBottom: 7
                                }
                            },
                            className: 'col-6'
                        }
                    ]
                },
                {
                    id: 'columnProperties',
                    label: 'Column properties',
                    elements: [
                        {
                            type: 'TAB_COLUMN',
                            id: 'tabColumn',
                            listTab: [
                                {
                                    id: 'columnOne',
                                    label: 'Column 1'
                                },
                                {
                                    id: 'columnTwo',
                                    label: 'Column 2'
                                },
                                {
                                    id: 'columnThree',
                                    label: 'Column 3'
                                },
                                {
                                    id: 'columnFour',
                                    label: 'Column 4'
                                },
                                {
                                    id: 'columnFive',
                                    label: 'Column 5'
                                }
                            ]
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'backgroundColorColumn',
                            keyActive: 'backgroundColor',
                            label: 'Background color',
                            defaultValue: '#707070',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'paddingRowLabel',
                            label: 'Padding',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsColumnPadding',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'paddingColumn',
                            label: '',
                            defaultValue: '10',
                            unit: 'px',
                            isShowUnit: true,
                            keyShow: 'moreOptionsColumnPadding',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childColumnPadding',
                            keyShow: 'moreOptionsColumnPadding',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    label: 'Top',
                                    upLineKey: 'columnPaddings',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    label: 'Right',
                                    upLineKey: 'columnPaddings',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    label: 'Bottom',
                                    upLineKey: 'columnPaddings',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    label: 'Left',
                                    upLineKey: 'columnPaddings',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }, // work here
                        {
                            type: 'LABEL',
                            id: 'border',
                            label: 'Border',
                            style: {
                                styleParent: {
                                    width: '60%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsBorder',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'borderColorColumn',
                            label: '',
                            defaultValue: '#fff',
                            keyShow: 'borderColor',
                            style: {
                                styleParent: {
                                    width: '20%'
                                }
                            }
                        },
                        {
                            type: 'SELECT_SINGLE',
                            id: 'borderSelectSingle',
                            label: '',
                            defaultValue: 'solid',
                            keyShow: 'borderStyle',
                            options: [
                                {
                                    name: 'solid',
                                    label: 'Solid'
                                },
                                {
                                    name: 'dotted',
                                    label: 'Dotted'
                                },
                                {
                                    name: 'dashed',
                                    label: 'Dashed'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '40%'
                                },
                                styleChild: {
                                    width: 120
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'borderColumnWidth',
                            label: '',
                            defaultValue: '10',
                            unit: 'px',
                            isShowUnit: true,
                            keyShow: 'borderWidth',
                            style: {
                                styleParent: {
                                    width: '40%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        }, 
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childBorder',
                            keyShow: 'moreOptionsBorder',
                            elementChild: [
                                {
                                    type: 'LABEL',
                                    id: 'labelBorderTop',
                                    label: 'Border top',
                                    style: {
                                        styleParent: {
                                            width: '100%'
                                        }
                                    }
                                },
                                {
                                    type: 'LINE_STYLE',
                                    id: 'columnBorderStyleTop',
                                    defaultValue: 'solid',
                                    tooltip: 'Border top',
                                    keyPosition: 'Top',
                                    upLineKey: 'columnBorderStyle',
                                    options: [
                                        {
                                            name: 'solid',
                                            label: 'Solid',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dashed',
                                            label: 'Dashed',
                                            textDecorationStyle: 'dashed',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dotted',
                                            label: 'Dotted',
                                            textDecorationStyle: 'dotted',
                                            textDecorationLine: 'underline'
                                        }
                                    ],
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'columnBorderWidthTop',
                                    defaultValue: '1',
                                    unit: 'px',
                                    keyPosition: 'Top',
                                    upLineKey: 'columnBorderWidth',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'FILL_COLOR',
                                    id: 'columnBorderColorTop',
                                    upLineKey: 'columnBorderColor',
                                    keyPosition: 'Top',
                                    defaultValue: '#fff',
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'LABEL',
                                    id: 'labelBorderRight',
                                    label: 'Border right',
                                    style: {
                                        styleParent: {
                                            width: '100%'
                                        }
                                    }
                                },
                                {
                                    type: 'LINE_STYLE',
                                    id: 'columnBorderStyleRight',
                                    defaultValue: 'solid',
                                    keyPosition: 'Right',
                                    upLineKey: 'columnBorderStyle',
                                    tooltip: 'Border right',
                                    options: [
                                        {
                                            name: 'solid',
                                            label: 'Solid',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dashed',
                                            label: 'Dashed',
                                            textDecorationStyle: 'dashed',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dotted',
                                            label: 'Dotted',
                                            textDecorationStyle: 'dotted',
                                            textDecorationLine: 'underline'
                                        }
                                    ],
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'columnBorderWidthRight',
                                    defaultValue: '1',
                                    unit: 'px',
                                    keyPosition: 'Right',
                                    upLineKey: 'columnBorderWidth',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'FILL_COLOR',
                                    id: 'columnBorderColorRight',
                                    defaultValue: '#fff',
                                    keyPosition: 'Right',
                                    upLineKey: 'columnBorderColor',
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'LABEL',
                                    id: 'labelBorderBottom',
                                    label: 'Border bottom',
                                    style: {
                                        styleParent: {
                                            width: '100%'
                                        }
                                    }
                                },
                                {
                                    type: 'LINE_STYLE',
                                    id: 'columnBorderStyleBottom',
                                    defaultValue: 'solid',
                                    keyPosition: 'Bottom',
                                    upLineKey: 'columnBorderStyle',
                                    tooltip: 'Border bottom',
                                    options: [
                                        {
                                            name: 'solid',
                                            label: 'Solid',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dashed',
                                            label: 'Dashed',
                                            textDecorationStyle: 'dashed',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dotted',
                                            label: 'Dotted',
                                            textDecorationStyle: 'dotted',
                                            textDecorationLine: 'underline'
                                        }
                                    ],
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'columnBorderWidthBottom',
                                    defaultValue: '1',
                                    unit: 'px',
                                    keyPosition: 'Bottom',
                                    upLineKey: 'columnBorderWidth',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'FILL_COLOR',
                                    id: 'columnBorderColorBottom',
                                    defaultValue: '#fff',
                                    keyPosition: 'Bottom',
                                    upLineKey: 'columnBorderColor',
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'LABEL',
                                    id: 'labelBorderLeft',
                                    label: 'Border left',
                                    style: {
                                        styleParent: {
                                            width: '100%'
                                        }
                                    }
                                },
                                {
                                    type: 'LINE_STYLE',
                                    id: 'columnBorderStyleLeft',
                                    defaultValue: 'solid',
                                    keyPosition: 'Left',
                                    upLineKey: 'columnBorderStyle',
                                    tooltip: 'Border left',
                                    options: [
                                        {
                                            name: 'solid',
                                            label: 'Solid',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dashed',
                                            label: 'Dashed',
                                            textDecorationStyle: 'dashed',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dotted',
                                            label: 'Dotted',
                                            textDecorationStyle: 'dotted',
                                            textDecorationLine: 'underline'
                                        }
                                    ],
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'columnBorderWidthLeft',
                                    defaultValue: '1',
                                    unit: 'px',
                                    keyPosition: 'Left',
                                    upLineKey: 'columnBorderWidth',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'FILL_COLOR',
                                    id: 'columnBorderColorLeft',
                                    defaultValue: '#fff',
                                    keyPosition: 'Left',
                                    upLineKey: 'columnBorderColor',
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'rowProperties',
                    label: 'Row properties',
                    elements: [
                        {
                            type: 'FILL_COLOR',
                            id: 'backgroundColor',
                            label: 'Background color',
                            defaultValue: '#707070',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'backgroundImageLabel',
                            label: 'Background image',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'SELECT_RADIO',
                            id: 'selectRadioImage',
                            keySelected: 'backgroundImage',
                            defaultValue: 'uploadImage',
                            options: [
                                {
                                    name: 'uploadImage',
                                    label: 'Upload image'
                                },
                                {
                                    name: 'imageUrl',
                                    label: 'Image URL'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'UPLOAD',
                            id: 'imageUpload',
                            keyShow: 'backgroundImage',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'url',
                            keyParent: 'backgroundImage',
                            keyShow: 'backgroundImage',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 200
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'columnsBackgroundColor',
                            label: 'Content background color',
                            defaultValue: '#707070',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'labelRow',
                            label: 'Padding'
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsPadding',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'padding',
                            label: '',
                            defaultValue: '10',
                            unit: 'px',
                            isShowUnit: true,
                            keyShow: 'moreOptionsPadding',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childPadding',
                            keyShow: 'moreOptionsPadding',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    upLineKey: 'listPaddings',
                                    label: 'Top',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    upLineKey: 'listPaddings',
                                    label: 'Right',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    upLineKey: 'listPaddings',
                                    label: 'Bottom',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    upLineKey: 'listPaddings',
                                    label: 'Left',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'responsiveDesign',
                    label: 'Responsive design',
                    elements: [
                        {
                            type: 'SWITCH',
                            id: 'responsive',
                            isShowMessageRight: true,
                            message: 'Hide on desktop',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'Button',
        name: 'Button',
        type: 'BUTTON',
        resource: {
            general: [
                {
                    id: 'action',
                    label: 'Action',
                    elements: [
                        {
                            type: 'SELECT_SINGLE',
                            id: 'actionType',
                            label: 'Action type',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'Open website'
                                }
                            ],
                            style: {
                                styleChild: {
                                    width: 110
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'url',
                            label: 'URL',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 200
                                }
                            }
                        },
                        {
                            type: 'SELECT_SINGLE',
                            id: 'target',
                            label: 'Target',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'New tab'
                                }
                            ],
                            style: {
                                styleChild: {
                                    width: 110
                                }
                            }
                        }
                    ]
                }
            ],
            style: [
                {
                    id: 'button',
                    elements: [
                        {
                            type: 'FILL_COLOR',
                            id: 'backgroundColorButton',
                            label: 'Background color',
                            defaultValue: '#F75F2D',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'textColorButton',
                            label: 'Text color',
                            defaultValue: '#FFFFFF',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'width',
                            label: 'Width',
                            defaultValue: '100',
                            unit: '%',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '60%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'autoWidth',
                            isShowMessageLeft: true,
                            message: 'Auto width',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        {
                            type: 'ALIGNMENT',
                            id: 'alignments',
                            label: 'Alignments',
                            defaultValue: 'left',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'lineHeight',
                            label: 'Line height',
                            defaultValue: '100',
                            unit: '%',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'buttonPadding',
                            label: 'Button padding',
                            style: {
                                styleParent: {
                                    width: '60%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsButtonPadding',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        // {
                        //     type: 'TEXT_INPUT',
                        //     id: 'buttonPaddingText',
                        //     label: '',
                        //     unit: 'px',
                        //     isShowUnit: true,
                        //     defaultValue: '10',
                        //     style: {
                        //         styleParent: {
                        //             width: '100%'
                        //         },
                        //         styleChild: {
                        //             width: 40
                        //         }
                        //     }
                        // },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childButtonPadding',
                            // keyShow: 'moreOptionsButtonPadding',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    label: 'Top',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    label: 'Right',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    label: 'Bottom',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    label: 'Left',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'roundedBorder',
                            label: 'Rounded border',
                            defaultValue: '5',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'border',
                            label: 'Border',
                            style: {
                                styleParent: {
                                    width: '60%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsBorder',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        // {
                        //     type: 'FILL_COLOR',
                        //     id: 'borderColorButton',
                        //     label: '',
                        //     defaultValue: '#707070',
                        //     style: {
                        //         styleParent: {
                        //             width: '20%'
                        //         }
                        //     }
                        // },
                        // {
                        //     type: 'SELECT_SINGLE',
                        //     id: 'borderSelectSingle',
                        //     label: '',
                        //     defaultValue: 1,
                        //     options: [
                        //         {
                        //             name: 1,
                        //             label: 'Solid'
                        //         }
                        //     ],
                        //     style: {
                        //         styleParent: {
                        //             width: '40%'
                        //         },
                        //         styleChild: {
                        //             width: 120
                        //         }
                        //     }
                        // },
                        // {
                        //     type: 'TEXT_INPUT',
                        //     id: 'borderButtonText',
                        //     label: '',
                        //     defaultValue: '10',
                        //     unit: 'px',
                        //     isShowUnit: true,
                        //     style: {
                        //         styleParent: {
                        //             width: '40%'
                        //         },
                        //         styleChild: {
                        //             width: 40
                        //         }
                        //     }
                        // },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childBorder',
                            // keyShow: 'moreOptionsBorder',
                            elementChild: [
                                {
                                    type: 'LABEL',
                                    id: 'labelBorderTop',
                                    label: 'Border top',
                                    style: {
                                        styleParent: {
                                            width: '100%'
                                        }
                                    }
                                },
                                {
                                    type: 'LINE_STYLE',
                                    id: 'borderTop',
                                    defaultValue: 'solid',
                                    tooltip: 'Border top',
                                    options: [
                                        {
                                            name: 'none',
                                            label: 'None',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'none'
                                        },
                                        {
                                            name: 'solid',
                                            label: 'Solid',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dashed',
                                            label: 'Dashed',
                                            textDecorationStyle: 'dashed',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dotted',
                                            label: 'Dotted',
                                            textDecorationStyle: 'dotted',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'double',
                                            label: 'Double',
                                            textDecorationStyle: 'double',
                                            textDecorationLine: 'underline'
                                        }
                                    ],
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'inputBorderTop',
                                    defaultValue: '1',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'FILL_COLOR',
                                    id: 'colorBorderTop',
                                    defaultValue: '#000000',
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'LABEL',
                                    id: 'labelBorderRight',
                                    label: 'Border right',
                                    style: {
                                        styleParent: {
                                            width: '100%'
                                        }
                                    }
                                },
                                {
                                    type: 'LINE_STYLE',
                                    id: 'borderRight',
                                    defaultValue: 'solid',
                                    tooltip: 'Border right',
                                    options: [
                                        {
                                            name: 'none',
                                            label: 'None',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'none'
                                        },
                                        {
                                            name: 'solid',
                                            label: 'Solid',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dashed',
                                            label: 'Dashed',
                                            textDecorationStyle: 'dashed',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dotted',
                                            label: 'Dotted',
                                            textDecorationStyle: 'dotted',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'double',
                                            label: 'Double',
                                            textDecorationStyle: 'double',
                                            textDecorationLine: 'underline'
                                        }
                                    ],
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'inputBorderRight',
                                    defaultValue: '1',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'FILL_COLOR',
                                    id: 'colorBorderRight',
                                    defaultValue: '#000000',
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'LABEL',
                                    id: 'labelBorderBottom',
                                    label: 'Border bottom',
                                    style: {
                                        styleParent: {
                                            width: '100%'
                                        }
                                    }
                                },
                                {
                                    type: 'LINE_STYLE',
                                    id: 'borderBottom',
                                    defaultValue: 'solid',
                                    tooltip: 'Border bottom',
                                    options: [
                                        {
                                            name: 'none',
                                            label: 'None',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'none'
                                        },
                                        {
                                            name: 'solid',
                                            label: 'Solid',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dashed',
                                            label: 'Dashed',
                                            textDecorationStyle: 'dashed',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dotted',
                                            label: 'Dotted',
                                            textDecorationStyle: 'dotted',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'double',
                                            label: 'Double',
                                            textDecorationStyle: 'double',
                                            textDecorationLine: 'underline'
                                        }
                                    ],
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'input',
                                    defaultValue: '1',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'FILL_COLOR',
                                    id: 'colorBoderBottom',
                                    defaultValue: '#000000',
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'LABEL',
                                    id: 'labelBorderLeft',
                                    label: 'Border left',
                                    style: {
                                        styleParent: {
                                            width: '100%'
                                        }
                                    }
                                },
                                {
                                    type: 'LINE_STYLE',
                                    id: 'borderLeft',
                                    defaultValue: 'solid',
                                    tooltip: 'Border left',
                                    options: [
                                        {
                                            name: 'none',
                                            label: 'None',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'none'
                                        },
                                        {
                                            name: 'solid',
                                            label: 'Solid',
                                            textDecorationStyle: 'solid',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dashed',
                                            label: 'Dashed',
                                            textDecorationStyle: 'dashed',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'dotted',
                                            label: 'Dotted',
                                            textDecorationStyle: 'dotted',
                                            textDecorationLine: 'underline'
                                        },
                                        {
                                            name: 'double',
                                            label: 'Double',
                                            textDecorationStyle: 'double',
                                            textDecorationLine: 'underline'
                                        }
                                    ],
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'inputBorderLeft',
                                    defaultValue: '1',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'FILL_COLOR',
                                    id: 'colorBorderLeft',
                                    defaultValue: '#000000',
                                    style: {
                                        styleParent: {
                                            width: '33%'
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'containerPadding',
                            label: 'Container padding',
                            defaultValue: '10',
                            unit: 'px',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '50%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsPaddingButton',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'responsiveDesign',
                    label: 'Responsive design',
                    elements: [
                        {
                            type: 'SWITCH',
                            id: 'responsive',
                            isShowMessageRight: true,
                            message: 'Hide on desktop',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'Line',
        name: 'Line',
        type: 'LINE',
        resource: {
            style: [
                {
                    id: 'line',
                    elements: [
                        {
                            type: 'LABEL',
                            id: 'labelLineStyle',
                            label: 'Line style',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'LINE_STYLE',
                            id: 'borderTopStyle',
                            keyParent: 'border',
                            defaultValue: 'solid',
                            tooltip: 'Border style',
                            options: [
                                {
                                    name: 'none',
                                    label: 'None',
                                    textDecorationStyle: 'solid',
                                    textDecorationLine: 'none'
                                },
                                {
                                    name: 'solid',
                                    label: 'Solid',
                                    textDecorationStyle: 'solid',
                                    textDecorationLine: 'underline'
                                },
                                {
                                    name: 'dashed',
                                    label: 'Dashed',
                                    textDecorationStyle: 'dashed',
                                    textDecorationLine: 'underline'
                                },
                                {
                                    name: 'dotted',
                                    label: 'Dotted',
                                    textDecorationStyle: 'dotted',
                                    textDecorationLine: 'underline'
                                },
                                {
                                    name: 'double',
                                    label: 'Double',
                                    textDecorationStyle: 'double',
                                    textDecorationLine: 'underline'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '33%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'borderTopWidth',
                            keyParent: 'border',
                            defaultValue: '1',
                            unit: 'px',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '33%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'borderTopColor',
                            keyParent: 'border',
                            defaultValue: '#000000',
                            style: {
                                styleParent: {
                                    width: '33%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'width',
                            label: 'Line width',
                            defaultValue: '100',
                            unit: '%',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'ALIGNMENT',
                            id: 'textAlign',
                            label: 'Alignments',
                            defaultValue: 'left',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'lineContainerPaddingLabel',
                            label: 'Container padding',
                            style: {
                                styleParent: {
                                    width: '60%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptions',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'containerPadding',
                            label: '',
                            keyShow: 'moreOptions',
                            defaultValue: '10',
                            unit: 'px',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'containerPadding',
                            keyShow: 'moreOptions',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    label: 'Top',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    label: 'Right',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    label: 'Bottom',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    label: 'Left',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'responsiveDesign',
                    label: 'Responsive design',
                    elements: [
                        {
                            type: 'SWITCH',
                            id: 'hideDesktop',
                            isShowMessageRight: true,
                            message: 'Hide on desktop',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'Text',
        name: 'Text',
        type: 'TEXT',
        resource: {
            style: [
                {
                    id: 'text',
                    elements: [
                        {
                            type: 'FILL_COLOR',
                            id: 'color',
                            label: 'Text color',
                            defaultValue: '#889199',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'ALIGNMENT',
                            id: 'textAlign',
                            label: 'Text align',
                            defaultValue: 'left',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'lineHeight',
                            label: 'Line height',
                            defaultValue: '100',
                            unit: '%',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'inherit',
                            keyParent: 'linkStyle',
                            isShowMessageRight: true,
                            label: 'Line style',
                            message: 'Inherit body styles',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'textContainerPaddingLabel',
                            label: 'Container padding',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsPaddingText',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        // {
                        //     type: 'TEXT_INPUT',
                        //     id: 'textContainerPaddingText',
                        //     label: '',
                        //     defaultValue: '10',
                        //     unit: 'px',
                        //     isShowUnit: true,
                        //     style: {
                        //         styleParent: {
                        //             width: '100%'
                        //         },
                        //         styleChild: {
                        //             width: 40
                        //         }
                        //     }
                        // }
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childTextPadding',
                            // keyShow: 'moreOptionsButtonPadding',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    label: 'Top',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    label: 'Right',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    label: 'Bottom',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    label: 'Left',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'responsiveDesign',
                    label: 'Responsive design',
                    elements: [
                        {
                            type: 'SWITCH',
                            id: 'responsive',
                            isShowMessageRight: true,
                            message: 'Hide on desktop',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'Menu',
        name: 'Menu',
        type: 'MENU',
        resource: {
            general: [
                {
                    id: 'menuOne',
                    style: {
                        background: 'rgb(216 233 237)',
                        paddingRight: 10
                    },
                    isShowIconTrash: true,
                    elements: [
                        {
                            type: 'LABEL',
                            id: 'labelMenu',
                            label: 'Text',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'DELETE_BUTTON',
                            id: 'deleteButton',
                            icon: 'icon-ants-trash',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'menuText',
                            label: '',
                            defaultValue: 'Menu 1',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            }                          
                        },
                        {
                            type: 'SELECT_SINGLE',
                            id: 'actionType',
                            label: 'Action type',
                            defaultValue: 'openWebsite',
                            options: [
                                {
                                    name: 'openWebsite',
                                    label: 'Open website'
                                },
                                {
                                    name: 'sendEmail',
                                    label: 'Send Email'
                                },
                                {
                                    name: 'callPhoneNumber',
                                    label: 'Call Phone Number'
                                },
                                {
                                    name: 'sendSMS',
                                    label: 'Send SMS'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 150
                                }
                            }
                        },
                        // open website
                        {
                            type: 'TEXT_INPUT',
                            id: 'url',
                            label: 'URL',
                            defaultValue: '',
                            keyShow: 'openWebsite',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            } 
                        },
                        {
                            type: 'SELECT_SINGLE',
                            id: 'target',
                            label: 'Target',
                            keyShow: 'openWebsite',
                            defaultValue: '_blank',
                            options: [
                                {
                                    name: '_blank',
                                    label: 'New Tab'
                                },
                                {
                                    name: '_self',
                                    label: 'Same Target'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 150
                                }
                            }
                        },
                        // send email
                        {
                            type: 'TEXT_INPUT',
                            id: 'mailTo',
                            label: 'Mail To',
                            defaultValue: '',
                            keyShow: 'sendEmail',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'subject',
                            label: 'Subject',
                            keyShow: 'sendEmail',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'body',
                            label: 'Body',
                            keyShow: 'sendEmail',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            }
                        },
                        // call phone number
                        {
                            type: 'TEXT_INPUT',
                            id: 'phoneCall',
                            label: 'Phone',
                            keyShow: 'callPhoneNumber',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            }
                        },
                        // send sms
                        {
                            type: 'TEXT_INPUT',
                            id: 'phoneSendSMS',
                            label: 'Phone',
                            keyShow: 'sendSMS',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'addMenuContainer',
                    elements: [
                        {
                            type: 'ADD_MENU',
                            id: 'addButton',
                            label: '',
                            icon: 'icon-ants-add',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
                // {
                //     id: 'menuTwo',
                //     elements: [
                //         {
                //             type: 'TEXT_INPUT',
                //             id: `text${random(3)}`,
                //             label: 'Text',
                //             defaultValue: 'Menu 1',
                //             style: {
                //                 styleParent: {
                //                     width: '100%'
                //                 },
                //                 styleChild: {
                //                     width: '100%'
                //                 }
                //             }
                //         },
                //         {
                //             type: 'SELECT_SINGLE',
                //             id: `actionType${random(3)}`,
                //             label: 'Action type',
                //             defaultValue: 1,
                //             options: [
                //                 {
                //                     name: 1,
                //                     label: 'Send Email'
                //                 }
                //             ],
                //             style: {
                //                 styleChild: {
                //                     width: 150
                //                 }
                //             }
                //         },
                //         {  
                //             type: 'TEXT_INPUT',
                //             id: 'mailTo',
                //             label: 'Mail to',
                //             defaultValue: '',
                //             style: {
                //                 styleParent: {
                //                     width: '100%'
                //                 },
                //                 styleChild: {
                //                     width: '100%'
                //                 }
                //             }
                //         },
                //         {
                //             type: 'TEXT_INPUT',
                //             id: 'subject',
                //             label: 'Subject',
                //             defaultValue: '',
                //             style: {
                //                 styleParent: {
                //                     width: '100%'
                //                 },
                //                 styleChild: {
                //                     width: '100%'
                //                 }
                //             }
                //         },
                //         {
                //             type: 'TEXT_AREA',
                //             id: 'body',
                //             label: 'Body',
                //             defaultValue: '',
                //             style: {
                //                 styleParent: {
                //                     width: '100%'
                //                 },
                //                 styleChild: {
                //                     width: '100%'
                //                 }
                //             }
                //         }
                //     ]
                // }
                // {
                //     id: 'menuThree',
                //     elements: [
                //         {
                //             type: 'TEXT_INPUT',
                //             id: `text${random(3)}`,
                //             label: 'Text',
                //             defaultValue: 'Menu 1',
                //             style: {
                //                 styleParent: {
                //                     width: '100%'
                //                 },
                //                 styleChild: {
                //                     width: '100%'
                //                 }
                //             }
                //         },
                //         {
                //             type: 'SELECT_SINGLE',
                //             id: `actionType${random(3)}`,
                //             label: 'Action type',
                //             defaultValue: 1,
                //             options: [
                //                 {
                //                     name: 1,
                //                     label: 'Call Phone Number'
                //                 }
                //             ],
                //             style: {
                //                 styleChild: {
                //                     width: 150
                //                 }
                //             }
                //         },
                //         {
                //             type: 'TEXT_INPUT',
                //             id: `phone${random(3)}`,
                //             label: 'Phone',
                //             defaultValue: '',
                //             style: {
                //                 styleParent: {
                //                     width: '100%'
                //                 },
                //                 styleChild: {
                //                     width: '100%'
                //                 }
                //             }
                //         }
                //     ]
                // },
                // {
                //     id: 'menuFour',
                //     elements: [
                //         {
                //             type: 'TEXT_INPUT',
                //             id: `text${random(3)}`,
                //             label: 'Text',
                //             defaultValue: 'Menu 1',
                //             style: {
                //                 styleParent: {
                //                     width: '100%'
                //                 },
                //                 styleChild: {
                //                     width: '100%'
                //                 }
                //             }
                //         },
                //         {
                //             type: 'SELECT_SINGLE',
                //             id: `actionType${random(3)}`,
                //             label: 'Action type',
                //             defaultValue: 1,
                //             options: [
                //                 {
                //                     name: 1,
                //                     label: 'Call Phone Number'
                //                 }
                //             ],
                //             style: {
                //                 styleChild: {
                //                     width: 150
                //                 }
                //             }
                //         },
                //         {
                //             type: 'TEXT_INPUT',
                //             id: `phone${random(3)}`,
                //             label: 'Phone',
                //             defaultValue: '',
                //             style: {
                //                 styleParent: {
                //                     width: '100%'
                //                 },
                //                 styleChild: {
                //                     width: '100%'
                //                 }
                //             }
                //         }
                //     ]
                // }
            ],
            style: [
                {
                    id: 'menu',
                    elements: [
                        {
                            type: 'FONT_FAMILY',
                            id: 'fontFamily',
                            label: 'Font',
                            isShowIcon: true,
                            defaultValue: 'arial',
                            tooltip: 'Font family',
                            options: [
                                {
                                    name: 'Andale Mono',
                                    label: 'Andale Mono',
                                    value: '"Andale mono", times',
                                    defaultFont: true
                                },
                                {
                                    name: 'Arial',
                                    label: 'Arial',
                                    value: 'Arial, helvetica, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Arial Black',
                                    label: 'Arial Black',
                                    value: '"Arial black", "avant garde", arial',
                                    defaultFont: true
                                },
                                {
                                    name: 'Book Antiqua',
                                    label: 'Book Antiqua',
                                    value: '"Book antiqua", palatino',
                                    defaultFont: true
                                },
                                {
                                    name: 'Cabin',
                                    label: 'Cabin',
                                    value: 'Cabin, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Montserrat',
                                    label: 'Montserrat',
                                    value: 'Montserrat, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Commic Sans MS',
                                    label: 'Commic Sans MS',
                                    value: '"Comic sans ms", sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Courier New',
                                    label: 'Courier New',
                                    value: 'Courier new", courier',
                                    defaultFont: true
                                },
                                {
                                    name: 'Crimson Text',
                                    label: 'Crimson Text',
                                    value: '"Crimson Text", serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Georgia',
                                    label: 'Georgia',
                                    value: 'Georgia, palatino',
                                    defaultFont: true
                                },
                                {
                                    name: 'Helvetica',
                                    label: 'Helvetica',
                                    value: 'Helvetica, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Impact',
                                    label: 'Impact',
                                    value: 'impact, chicago',
                                    defaultFont: true
                                },
                                {
                                    name: 'Lato',
                                    label: 'Lato',
                                    value: 'Lato, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Lobster Two',
                                    label: 'Lobster Two',
                                    value: '"Lobster Two", cursive',
                                    defaultFont: true
                                },
                                {
                                    name: 'Old Standard TT',
                                    label: 'Old Standard TT',
                                    value: '"Old Standard TT", serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Open Sans',
                                    label: 'Open Sans',
                                    value: '"Open Sans", sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Pacifico',
                                    label: 'Pacifico',
                                    value: 'Pacifico, cursive',
                                    defaultFont: true
                                },
                                {
                                    name: 'Playfair Display',
                                    label: 'Playfair Display',
                                    value: '"Playfair Display", serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Raleway',
                                    label: 'Raleway',
                                    value: 'Raleway, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Rubik',
                                    label: 'Rubik',
                                    value: 'Rubik, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Source Sans Pro',
                                    label: 'Source Sans Pro',
                                    value: '"Source Sans Pro", sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Symbol',
                                    label: 'Symbol',
                                    value: 'Symbol',
                                    defaultFont: true
                                },
                                {
                                    name: 'Tahoma',
                                    label: 'Tahoma',
                                    value: 'Tahoma, arial, helvetica, sans-serif',
                                    defaultFont: true
                                },
                                {
                                    name: 'Terminal',
                                    label: 'Terminal',
                                    value: 'Terminal, monaco',
                                    defaultFont: true
                                },
                                {
                                    name: 'Times New Roman',
                                    label: 'Times New Roman',
                                    value: '"Times new roman", times',
                                    defaultFont: true
                                },
                                {
                                    name: 'Trebuchet Ms',
                                    label: 'Trebuchet Ms',
                                    value: '"Trebuchet ms", geneva',
                                    defaultFont: true
                                },
                                {
                                    name: 'Verdana',
                                    label: 'Verdana',
                                    value: 'Verdana, geneva',
                                    defaultFont: true
                                }
                            ]
                        },
                        {
                            type: 'FONT_SIZE',
                            id: 'fontSize',
                            label: 'Font Size',
                            defaultValue: '12px',
                            options: [
                                {
                                    name: '8px',
                                    label: '8 px'
                                },
                                {
                                    name: '9px',
                                    label: '9 px'
                                },
                                {
                                    name: '10px',
                                    label: '10 px'
                                },
                                {
                                    name: '11px',
                                    label: '11 px'
                                },
                                {
                                    name: '12px',
                                    label: '12 px'
                                },
                                {
                                    name: '13px',
                                    label: '13 px'
                                },
                                {
                                    name: '14px',
                                    label: '14 px'
                                },
                                {
                                    name: '18px',
                                    label: '18 px'
                                },
                                {
                                    name: '24px',
                                    label: '24 px'
                                },
                                {
                                    name: '28px',
                                    label: '28 px'
                                },
                                {
                                    name: '30px',
                                    label: '30 px'
                                },
                                {
                                    name: '32px',
                                    label: '32 px'
                                },
                                {
                                    name: '36px',
                                    label: '36 px'
                                },
                                {
                                    name: '48px',
                                    label: '48 px'
                                },
                                {
                                    name: '60px',
                                    label: '60 px'
                                },
                                {
                                    name: '72px',
                                    label: '72 px'
                                },
                                {
                                    name: '96px',
                                    label: '96 px'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 80
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'textColor',
                            label: 'Text color',
                            defaultValue: '#ff2500',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'linkColor',
                            label: 'Link color',
                            defaultValue: '#FFFFFF',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'ALIGNMENT',
                            id: 'align',
                            label: 'Alignments',
                            defaultValue: 'left',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'SELECT_SINGLE',
                            id: 'layout',
                            label: 'Layout',
                            defaultValue: 'horizontal',
                            options: [
                                {
                                    name: 'vertical',
                                    label: 'Vertical'
                                },
                                {
                                    name: 'horizontal',
                                    label: 'Horizontal'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 80
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'menuPadding',
                            label: 'Menu Padding',
                            style: {
                                styleParent: {
                                    width: '60%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsMenuPadding',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'padding',
                            label: '',
                            defaultValue: '10',
                            keyShow: 'moreOptionsMenuPadding',
                            unit: 'px',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childMenuPadding',
                            keyShow: 'moreOptionsMenuPadding',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    label: 'Top',
                                    upLineKey: 'menuPaddings',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    label: 'Right',
                                    defaultValue: '10',
                                    upLineKey: 'menuPaddings',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    label: 'Bottom',
                                    defaultValue: '10',
                                    upLineKey: 'menuPaddings',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    label: 'Left',
                                    defaultValue: '10',
                                    upLineKey: 'menuPaddings',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {   
                            type: 'LABEL',
                            id: 'containerPaddingLabel',
                            label: 'Container Padding'
                        },
                        {
                            type: 'SWITCH',
                            id: 'moreOptionsContainerPadding',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'containerPadding',
                            label: '',
                            defaultValue: '10',
                            unit: 'px',
                            keyShow: 'moreOptionsContainerPadding',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '60%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childContainerPadding',
                            keyShow: 'moreOptionsContainerPadding',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    label: 'Top',
                                    defaultValue: '10',
                                    upLineKey: 'containerPaddings',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    label: 'Right',
                                    defaultValue: '10',
                                    upLineKey: 'containerPaddings',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    label: 'Bottom',
                                    defaultValue: '10',
                                    upLineKey: 'containerPaddings',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    label: 'Left',
                                    defaultValue: '10',
                                    upLineKey: 'containerPaddings',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'responsiveDesign',
                    label: 'Responsive design',
                    elements: [
                        {
                            type: 'SWITCH',
                            id: 'responsive',
                            isShowMessageRight: true,
                            message: 'Hide on desktop',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'Image',
        name: 'Image',
        type: 'IMAGE',
        resource: {
            general: [
                {
                    id: 'uploadImage',
                    elements: [
                        {
                            type: 'SELECT_RADIO',
                            id: 'selectRadioImage',
                            defaultValue: 'uploadImage',
                            options: [
                                {
                                    name: 'uploadImage',
                                    label: 'Upload image'
                                },
                                {
                                    name: 'imageUrl',
                                    label: 'Image URL'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'UPLOAD',
                            id: 'imageUpload',
                            keyShow: 'selectRadioImage',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'alternalText',
                            label: 'Alternal Text',
                            defaultValue: 'Banner',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'action',
                    label: 'Action',
                    elements: [
                        {
                            type: 'SELECT_SINGLE',
                            id: 'actionType',
                            label: 'Action Type',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'Open Website'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 150
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: `urlImage${random(3)}`,
                            label: 'URL',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'SELECT_SINGLE',
                            id: 'target',
                            label: 'Target',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'New Tab'
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                },
                                styleChild: {
                                    width: 150
                                }
                            }
                        }
                    ]
                }
            ],
            style: [
                {
                    id: 'image',
                    elements: [
                        {
                            type: 'TEXT_INPUT',
                            id: 'width',
                            label: 'Top',
                            defaultValue: '100',
                            unit: '%',
                            isShowUnit: true,
                            style: {
                                styleParent: {
                                    width: '60%'
                                },
                                styleChild: {
                                    width: 40
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'autoWidth',
                            isShowMessageLeft: true,
                            message: 'Auto Width',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        {
                            type: 'ALIGNMENT',
                            id: 'alignments',
                            label: 'Alignments',
                            defaultValue: 'left',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'containerPaddingImageLabel',
                            label: 'Container Padding',
                            style: {
                                styleParent: {
                                    width: '60%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'imageMoreOptions',
                            isShowMessageLeft: true,
                            message: 'More Options',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        // {
                        //     type: 'TEXT_INPUT',
                        //     id: 'imageContainerPaddingText',
                        //     label: '',
                        //     defaultValue: '10',
                        //     unit: 'px',
                        //     isShowUnit: true,
                        //     style: {
                        //         styleParent: {
                        //             width: '100%'
                        //         },
                        //         styleChild: {
                        //             width: 40
                        //         }
                        //     }
                        // },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childImagePadding',
                            // keyShow: 'moreOptionsButtonPadding',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    label: 'Top',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    label: 'Right',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    label: 'Bottom',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    label: 'Left',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'responsiveDesign',
                    label: 'Responsive design',
                    elements: [
                        {
                            type: 'SWITCH',
                            id: 'responsive',
                            isShowMessageRight: true,
                            message: 'Hide on desktop',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        id: 'Html',
        name: 'HTML',
        type: 'HTML',
        resource: {
            style: [
                {
                    id: 'html',
                    elements: [
                        {
                            type: 'TEXT_AREA',
                            id: 'htmlContent',
                            label: 'HTML Content',
                            defaultValue: '',
                            style: {
                                styleParent: {
                                    width: '90%'
                                },
                                styleChild: {
                                    width: '100%',
                                    height: '186px'
                                }
                            }
                        },
                        {
                            type: 'LABEL',
                            id: 'htmlContainerPaddingLabel',
                            label: 'Container Padding',
                            style: {
                                styleParent: {
                                    width: '60%'
                                }
                            }
                        },
                        {
                            type: 'SWITCH',
                            id: 'htmlMoreOptions',
                            isShowMessageRight: true,
                            message: 'More Options',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '40%'
                                }
                            }
                        },
                        // {
                        //     type: 'TEXT_INPUT',
                        //     id: 'htmlContainerPaddingText',
                        //     label: '',
                        //     defaultValue: '10',
                        //     unit: 'px',
                        //     isShowUnit: true,
                        //     style: {
                        //         styleParent: {
                        //             width: '100%'
                        //         },
                        //         styleChild: {
                        //             width: 40
                        //         }
                        //     }
                        // },
                        {
                            type: 'COMPONENT_CHILD',
                            id: 'childHtmlPadding',
                            // keyShow: 'moreOptionsButtonPadding',
                            elementChild: [
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'top',
                                    label: 'Top',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'right',
                                    label: 'Right',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'bottom',
                                    label: 'Bottom',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                },
                                {
                                    type: 'TEXT_INPUT',
                                    id: 'left',
                                    label: 'Left',
                                    defaultValue: '10',
                                    unit: 'px',
                                    isShowUnit: true,
                                    style: {
                                        styleParent: {
                                            width: '25%'
                                        },
                                        styleChild: {
                                            width: 40
                                        }
                                    }
                                }
                            ],
                            style: {
                                styleParent: {
                                    width: '90%'
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'responsiveDesign',
                    label: 'Responsive design',
                    elements: [
                        {
                            type: 'SWITCH',
                            id: 'responsive',
                            isShowMessageRight: true,
                            message: 'Hide on desktop',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }
];

export default sidePanelConfig;