import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import alias from 'rollup-plugin-alias';
import postCssUrl from 'postcss-url';
import typescript from 'rollup-plugin-typescript2';

const path = require('path');

const pkg = require('./package.json');

const extensions = ['.js', '.jsx', '.json', '.scss', '.css', '.ts', '.tsx'];

export default {
    input: 'components/index.tsx',
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'esm'
        }
    ],
    external: ['react', 'react-dom'],
    plugins: [
        resolve({
            extensions,
            mainFields: ['module', 'main']
        }),
        postcss({
            extensions: ['.css', '.scss'],
            minimize: true,
            extract: true,
            plugins: [
                postCssUrl([{url: 'copy',  assetsPath: 'static', useHash: true}])
            ],
            modules: {
                generateScopedName: 'ants-[local]-[hash:base64:5]'
            },
            use: ['sass', 'less']
        }),
        babel({
            runtimeHelpers: true ,
            exclude: 'node_modules/**',
            extensions: extensions
        }),
        alias({
            resolve: extensions,
            entries: {
                Assets: path.resolve(__dirname, 'assets/'),
                Components: path.resolve(__dirname, 'components/'),
                Hooks: path.resolve(__dirname, 'hooks/'),
                Utils: path.resolve(__dirname, 'utils')
            }
        }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react-is/index.js': ['isValidElementType', 'isContextConsumer', 'typeOf', 'isElement'],
                'node_modules/recharts/es6/util/ChartUtils.js': ['getNiceTickValues']
            }
        }),
        typescript({
            useTsconfigDeclarationDir: true,
            check: false
        })
    ]
};