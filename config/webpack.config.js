const fs = require('fs');
const path = require('path');
const DotenvFlow = require('dotenv-flow-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const StylishReporter = require('webpack-stylish');

const buildDir = '../dist';

module.exports = env => {

    return [
        {
            name: 'server',
            mode: (env.production) ? 'production' : 'development',
            entry: ['babel-polyfill', './src/server/index.js'],
            target: 'node',
            externals: fs.readdirSync(path.resolve(__dirname, '../node_modules')).concat([
                'react-dom/server'
            ]).reduce((ext, mod) => {
                ext[mod] = 'commonjs ' + mod;
                return ext;
            }, {}),
            node: {
                __filename: false,
                __dirname: false
            },
            stats: 'none',
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        use: { loader: 'babel-loader' },
                        include: __dirname,
                        exclude: /node_modules/
                    }
                ]
            },
            plugins: [
                // stylish,
            ],
            output: {
                path: path.join(__dirname, buildDir),
                filename: 'server.js'
            },
        },
        {
            name: 'client',
            mode: (env.production) ? 'production' : 'development',
            devtool: (env.production) ? 'none' : 'inline-source-map',
            entry: ['babel-polyfill', './src/client/index.js'],
            stats: 'none',
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader'
                        }
                    },
                    {
                        test: /\.(sa|sc|c)ss$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    sourceMap: true,
                                    hmr: true,
                                    reloadAll: true,
                                },
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ],
                    },
                    {
                        test: /\.svg$/,
                        use: ['@svgr/webpack'],
                    },
                    {
                        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                        loader: 'url-loader?limit=100000'
                    },
                    {
                        test: /\.jpg$/,
                        loader: "file-loader"
                    }
                ]
            },
            resolve: {
                extensions: ['*', '.js', '.jsx', '.scss']
            },
            devServer: {
                historyApiFallback: true,
                port: 3000,
                open: false,
                proxy: {
                    '/api': 'http://localhost:5000'
                }
            },
            plugins: [
                new DotenvFlow(),
                new MiniCssExtractPlugin({
                    moduleFilename: ({ name }) => `css/${name}.css`
                }),
                new HtmlWebpackPlugin({
                    template: './public/index.html',
                    favicon: './public/favicon.svg'
                }),
                new StylishReporter(),
            ],
            output: {
                publicPath: '/',
                path: path.join(__dirname, buildDir),
                filename: 'client.js'
            },
        }
    ];
};
