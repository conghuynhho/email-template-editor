const webpack = require('webpack');
const path = require('path');
const paths = require('./config/paths');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const publicPath = '/';

module.exports = {
    devtool: 'source-map',
    mode: 'development',
    entry: ['@babel/polyfill', paths.appIndexTsx],
    output: {
        path: paths.appBuild,
        filename: 'build/js/bundle.js',
        chunkFilename: '[name].js',
        publicPath: publicPath,
        crossOriginLoading: 'anonymous'
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            Assets: path.resolve(__dirname, 'assets/'),
            Components: path.resolve(__dirname, 'components/'),
            Hooks: path.resolve(__dirname, 'hooks/'),
            Utils: path.resolve(__dirname, 'utils/')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.scss$/,
                exclude: /\.module.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.module.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: 'ants-[local]-[hash:base64:5]',
                            camelCase: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(svg|md)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            SITE_URL: JSON.stringify('http://localhost:8080'),
            APPLICATION_ENV: JSON.stringify('development')
        }),
        new HTMLWebpackPlugin({
            template: './docs/index.html',
            filename: './index.html',
            chunksSortMode: 'none'
        })
    ]
};
