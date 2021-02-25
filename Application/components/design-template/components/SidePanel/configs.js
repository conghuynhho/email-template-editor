const sidePanelConfig = [
    {
        id: 'General',
        name: 'General',
        type: 'GENERAL',
        resource: {
            style: [
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
                                    width: '50%'
                                },
                                styleChild: {
                                    width: 65
                                }
                            }
                        },
                        {
                            type: 'FILL_COLOR',
                            id: 'backgroundColor',
                            label: 'Background color',
                            defaultValue: '#333333',
                            style: {
                                styleParent: {
                                    width: '28%'
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
                                    width: '100%'
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
                                    width: '33%'
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
                                styleChild: {
                                    width: 110
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
            ]
        }
    },
    {
        id: 'Button',
        name: 'Button',
        type: 'BUTTON',
        resource: {
            style: []
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
                            type: 'LINE_STYLE',
                            id: 'lineStyle',
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
                            id: 'textInput',
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
                            id: 'backgroundColor',
                            defaultValue: '#000000',
                            style: {
                                styleParent: {
                                    width: '33%'
                                }
                            }
                        },
                        {
                            type: 'TEXT_INPUT',
                            id: 'lineWidth',
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
                            id: 'moreOptions',
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
                            id: 'moreOptions',
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
    }
];

export default sidePanelConfig;