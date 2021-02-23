// Libraries
import React from 'react';
import Docs from '@antscorp/document';

// Component
import {components} from '../components/constant';

import '@antscorp/document/main.css/';

const App: React.FC = () => {
    const defaultProps = {
        sidebar: {
            defaultOpenKeys: ['component'],
            defaultSelectedKeys: ['word-cloud']
        },
        copyright: 'ants©2020',
        menus: components,
        headerMenus: [
            {
                key: 'charts',
                label: 'Charts',
                link: 'https://sandbox-adx.ants.vn/docs/charts#/document'
            },
            {
                key: 'components',
                label: 'Components',
                link: 'https://sandbox-adx.ants.vn/docs/components#/document'
            },
            {
                key: 'icons',
                label: 'Icons',
                link: 'https://sandbox-adx.ants.vn/docs/icons#/document'
            }
        ]
    };

    return (
        <Docs  {...defaultProps}  />
    );
};

export default App;
