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
                            defaultValue: '600',
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
                            defaultValue: 'roboto',
                            tooltip: 'Font family',
                            options: [
                                {
                                    name: 'arial',
                                    label: 'Arial'
                                },
                                {
                                    name: 'boogaloo',
                                    label: 'Boogaloo'
                                },
                                {
                                    name: 'bubblegumSans',
                                    label: 'Bubblegum Sans'
                                },
                                {
                                    name: 'calibri',
                                    label: 'Calibri'
                                },
                                {
                                    name: 'chewy',
                                    label: 'Chewy'
                                },
                                {
                                    name: 'comicSansMS',
                                    label: 'Comic Sans MS'
                                },
                                {
                                    name: 'comingSoon',
                                    label: 'Coming Soon'
                                },
                                {
                                    name: 'cormorantUnicase',
                                    label: 'Cormorant Unicase'
                                },
                                {
                                    name: 'corsiva',
                                    label: 'Corsiva'
                                },
                                {
                                    name: 'courierNew',
                                    label: 'Courier New'
                                },
                                {
                                    name: 'droid',
                                    label: 'Droid'
                                },
                                {
                                    name: 'droidSans',
                                    label: 'Droid Sans'
                                },
                                {
                                    name: 'eater',
                                    label: 'Eater'
                                },
                                {
                                    name: 'georgia',
                                    label: 'Georgia'
                                },
                                {
                                    name: 'greatVibes',
                                    label: 'Great Vibes'
                                },
                                {
                                    name: 'impact',
                                    label: 'Impact'
                                },
                                {
                                    name: 'indieFlower',
                                    label: 'Indie Flower'
                                },
                                {
                                    name: 'lato',
                                    label: 'Lato'
                                },
                                {
                                    name: 'lora',
                                    label: 'Lora'
                                },
                                {
                                    name: 'montserrat',
                                    label: 'Montserrat'
                                },
                                {
                                    name: 'oleoScript',
                                    label: 'Oleo Script'
                                },
                                {
                                    name: 'openSans',
                                    label: 'Open Sans'
                                },
                                {
                                    name: 'orbitron',
                                    label: 'Orbitron'
                                },
                                {
                                    name: 'oswald',
                                    label: 'Oswald'
                                },
                                {
                                    name: 'permanentMarker',
                                    label: 'Permanent Marker'
                                },
                                {
                                    name: 'quicksand',
                                    label: 'Quicksand'
                                },
                                {
                                    name: 'raleway',
                                    label: 'Raleway'
                                },
                                {
                                    name: 'reenieBeanie',
                                    label: 'Reenie Beanie'
                                },
                                {
                                    name: 'roboto',
                                    label: 'Roboto'
                                },
                                {
                                    name: 'robotoCondensed',
                                    label: 'Roboto Condensed'
                                },
                                {
                                    name: 'syncopate',
                                    label: 'Syncopate'
                                },
                                {
                                    name: 'tahoma',
                                    label: 'Tahoma'
                                },
                                {
                                    name: 'timesNewRoman',
                                    label: 'Times New Roman'
                                },
                                {
                                    name: 'trebuchet',
                                    label: 'Trebuchet'
                                },
                                {
                                    name: 'ubuntu',
                                    label: 'Ubuntu'
                                },
                                {
                                    name: 'ubuntuMono',
                                    label: 'Ubuntu Mono'
                                },
                                {
                                    name: 'verdana',
                                    label: 'Verdana'
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
                            id: 'fontColor',
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
                            id: 'underlineStyle',
                            label: 'Underline style',
                            defaultValue: 'None',
                            options: [
                                {
                                    name: 'None',
                                    label: 'None'
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
                            id: 'moreOptionsPaddingRow',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: true,
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        // {
                        //     type: 'TEXT_INPUT',
                        //     id: 'paddingRowText',
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
                            id: 'childColumnPadding',
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
                            defaultValue: '#707070',
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
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'Solid'
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
                            id: 'borderColumnText',
                            label: '',
                            defaultValue: '10',
                            unit: 'px',
                            isShowUnit: true,
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
                            id: 'backgroundImage',
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
                            id: 'inputUrl',
                            keyShow: 'selectRadioImage',
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
                            id: 'contentBackgroundColorRow',
                            label: 'Content background color',
                            defaultValue: '#707070',
                            style: {
                                styleParent: {
                                    width: '100%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'paddingRow',
                            label: 'Padding',
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
                            id: 'moreOptionsPaddingRow',
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
                            id: 'backgroundColor',
                            label: 'Background color',
                            keyParent: 'buttonColors',
                            defaultValue: '#F75F2D',
                            style: {
                                styleParent: {
                                    width: '50%'
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'color',
                            label: 'Text color',
                            keyParent: 'buttonColors',
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
                            keyParent: 'size',
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
                            keyParent: 'size',
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
                        {
                            type: 'TEXT_INPUT',
                            id: 'padding',
                            label: 'Button Padding',
                            unit: 'px',
                            keyShow: 'padding',
                            isShowUnit: true,
                            defaultValue: '10',
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
                            id: 'padding',
                            keyShow: 'padding',
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
                            id: 'borderRadius',
                            label: 'Rounded border',
                            defaultValue: '5',
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
                            type: 'LABEL',
                            id: 'borderLabel',
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
                            id: 'border',
                            // keyShow: 'isMoreOptionBorder',
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
                                    id: 'borderTopStyle',
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
                                    id: 'borderTopWidth',
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
                                    id: 'borderRightStyle',
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
                                    id: 'borderRightWidth',
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
                                    id: 'borderRightColor',
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
                                    id: 'borderBottomStyle',
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
                                    id: 'borderBottomWidth',
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
                                    id: 'borderBottomColor',
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
                                    id: 'borderLeftStyle',
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
                                    id: 'borderLeftWidth',
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
                                    id: 'borderLeftColor',
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
                            id: 'moreOptionsContainerPadding',
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
                            id: 'containerPadding',
                            // label: 'Container padding',
                            keyShow: 'containerPadding',
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
                            keyShow: 'containerPadding',
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
                            keyShow: 'containerPadding',
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
                            keyShow: 'containerPadding',
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
                            id: 'textColor',
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
                            id: 'lineStyle',
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
                        {
                            type: 'TEXT_INPUT',
                            id: 'containerPadding',
                            label: '',
                            defaultValue: '10',
                            keyShow: 'containerPadding',
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
                            keyShow: 'containerPadding',
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
                        background: '#F0F8FA',
                        paddingRight: 10
                    },
                    isShowIconTrash: true,
                    elements: [
                        {
                            type: 'TEXT_INPUT',
                            id: `text${random(3)}`,
                            label: 'Text',
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
                            id: `actionType${random(3)}`,
                            label: 'Action type',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'Open website'
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
                            id: `url${random(3)}`,
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
                },
                {
                    id: 'menuTwo',
                    elements: [
                        {
                            type: 'TEXT_INPUT',
                            id: `text${random(3)}`,
                            label: 'Text',
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
                            id: `actionType${random(3)}`,
                            label: 'Action type',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'Send Email'
                                }
                            ],
                            style: {
                                styleChild: {
                                    width: 150
                                }
                            }
                        },
                        {  
                            type: 'TEXT_INPUT',
                            id: 'mailTo',
                            label: 'Mail to',
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
                            id: 'subject',
                            label: 'Subject',
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
                            type: 'TEXT_AREA',
                            id: 'body',
                            label: 'Body',
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
                    id: 'menuThree',
                    elements: [
                        {
                            type: 'TEXT_INPUT',
                            id: `text${random(3)}`,
                            label: 'Text',
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
                            id: `actionType${random(3)}`,
                            label: 'Action type',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'Call Phone Number'
                                }
                            ],
                            style: {
                                styleChild: {
                                    width: 150
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: `phone${random(3)}`,
                            label: 'Phone',
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
                    id: 'menuFour',
                    elements: [
                        {
                            type: 'TEXT_INPUT',
                            id: `text${random(3)}`,
                            label: 'Text',
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
                            id: `actionType${random(3)}`,
                            label: 'Action type',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'Call Phone Number'
                                }
                            ],
                            style: {
                                styleChild: {
                                    width: 150
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: `phone${random(3)}`,
                            label: 'Phone',
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
                }
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
                                    name: 'arial',
                                    label: 'Arial'
                                },
                                {
                                    name: 'boogaloo',
                                    label: 'Boogaloo'
                                },
                                {
                                    name: 'bubblegumSans',
                                    label: 'Bubblegum Sans'
                                },
                                {
                                    name: 'calibri',
                                    label: 'Calibri'
                                },
                                {
                                    name: 'chewy',
                                    label: 'Chewy'
                                },
                                {
                                    name: 'comicSansMS',
                                    label: 'Comic Sans MS'
                                },
                                {
                                    name: 'comingSoon',
                                    label: 'Coming Soon'
                                },
                                {
                                    name: 'cormorantUnicase',
                                    label: 'Cormorant Unicase'
                                },
                                {
                                    name: 'corsiva',
                                    label: 'Corsiva'
                                },
                                {
                                    name: 'courierNew',
                                    label: 'Courier New'
                                },
                                {
                                    name: 'droid',
                                    label: 'Droid'
                                },
                                {
                                    name: 'droidSans',
                                    label: 'Droid Sans'
                                },
                                {
                                    name: 'eater',
                                    label: 'Eater'
                                },
                                {
                                    name: 'georgia',
                                    label: 'Georgia'
                                },
                                {
                                    name: 'greatVibes',
                                    label: 'Great Vibes'
                                },
                                {
                                    name: 'impact',
                                    label: 'Impact'
                                },
                                {
                                    name: 'indieFlower',
                                    label: 'Indie Flower'
                                },
                                {
                                    name: 'lato',
                                    label: 'Lato'
                                },
                                {
                                    name: 'lora',
                                    label: 'Lora'
                                },
                                {
                                    name: 'montserrat',
                                    label: 'Montserrat'
                                },
                                {
                                    name: 'oleoScript',
                                    label: 'Oleo Script'
                                },
                                {
                                    name: 'openSans',
                                    label: 'Open Sans'
                                },
                                {
                                    name: 'orbitron',
                                    label: 'Orbitron'
                                },
                                {
                                    name: 'oswald',
                                    label: 'Oswald'
                                },
                                {
                                    name: 'permanentMarker',
                                    label: 'Permanent Marker'
                                },
                                {
                                    name: 'quicksand',
                                    label: 'Quicksand'
                                },
                                {
                                    name: 'raleway',
                                    label: 'Raleway'
                                },
                                {
                                    name: 'reenieBeanie',
                                    label: 'Reenie Beanie'
                                },
                                {
                                    name: 'roboto',
                                    label: 'Roboto'
                                },
                                {
                                    name: 'robotoCondensed',
                                    label: 'Roboto Condensed'
                                },
                                {
                                    name: 'syncopate',
                                    label: 'Syncopate'
                                },
                                {
                                    name: 'tahoma',
                                    label: 'Tahoma'
                                },
                                {
                                    name: 'timesNewRoman',
                                    label: 'Times New Roman'
                                },
                                {
                                    name: 'trebuchet',
                                    label: 'Trebuchet'
                                },
                                {
                                    name: 'ubuntu',
                                    label: 'Ubuntu'
                                },
                                {
                                    name: 'ubuntuMono',
                                    label: 'Ubuntu Mono'
                                },
                                {
                                    name: 'verdana',
                                    label: 'Verdana'
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
                            id: 'textColorMenu',
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
                            id: 'textColorButton',
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
                            type: 'SELECT_SINGLE',
                            id: 'layout',
                            label: 'Layout',
                            defaultValue: 1,
                            options: [
                                {
                                    name: 1,
                                    label: 'Vertical'
                                },
                                {
                                    name: 2,
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
                        // {
                        //     type: 'TEXT_INPUT',
                        //     id: 'menuContainerPaddingText',
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
                            id: 'childMenuPadding',
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
                            id: 'containerPadding',
                            label: 'Container padding',
                            defaultValue: '10',
                            unit: 'px',
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
                            id: 'moreOptionsPaddingMenu',
                            isShowMessageLeft: true,
                            message: 'More options',
                            defaultValue: false,
                            style: {
                                styleParent: {
                                    width: '40%'
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
                            keyParent: 'src',
                            id: 'maxWidth',
                            label: 'Auto Width',
                            defaultValue: '100',
                            keyShow: 'src.autoWidth',
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
                            keyParent: 'src',
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
                        {
                            type: 'TEXT_INPUT',
                            id: 'containerPadding',
                            label: '',
                            keyShow: 'containerPadding',
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
                            keyShow: 'containerPadding',
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