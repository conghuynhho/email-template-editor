import Loadable from 'react-loadable';

export const components = [
    {
        'name': 'components',
        'label': 'Components',
        'icon': '',
        'components': [
            {
                name: 'general',
                label: 'General',
                child: [
                    {
                        name: 'icon',
                        label: 'Icons',
                        image: 'https://gw.alipayobjects.com/zos/alicdn/rrwbSt3FQ/Icon.svg',
                        active: true,
                        // description: () => require('Components/icon/document/description.md'),
                        // whenToUse: () => require('Components/icon/document/whenToUse.md'),
                        examples: [
                            {
                                markdown: () => require('Components/icon/document/basic/basic.md'),
                                path: Loadable({
                                    loader: () => import('Components/icon/document/basic/basic.jsx'),
                                    loading: () => {return null}
                                })
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
