let {resolve} = require('path'),
    {distPath, srcPath, publicPath, assets, limit, commonScssFile} = require('../config'),
    VueLoaderPlugin = require('vue-loader/lib/plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    isProduct = process.env.NODE_ENV === 'production';

console.log('======================== Is production mode:', isProduct, '========================');

module.exports = {
    mode: isProduct ? 'production' : 'development',
    entry: {
        app: resolve(__dirname, '../src/index.js')
    },
    devtool: isProduct ? 'source-map' : 'inline-source-map',
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `${assets}/css/${isProduct ? '[name].css?v=[contenthash]' : '[name].css'}`,
            chunkFilename: `${assets}/css/${isProduct ? '[id].css?v=[contenthash]' : '[id].css'}`,
        })
    ],
    output: {
        filename: `${assets}/js/[name].bundle.js?v=[${isProduct ? 'contenthash' : 'hash'}]`,
        path: distPath,
        publicPath: publicPath,
        pathinfo: false // build performance
    },
    module: {
        rules: [
            {
                test: /\.(eot|ttf|otf|woff2?)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    limit: limit,
                    name: `${assets}/font/[name].[ext]?v=[hash]`
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: limit,
                        name: `${assets}/images/[name].[ext]?v=[hash]`
                    }
                }
            },
            {
                test: /\.scss$/,
                include: srcPath,
                use: [
                    isProduct ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: commonScssFile
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: srcPath,
                use: [
                    isProduct ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: srcPath,
                options: {
                    loaders: {
                        css: ['vue-style-loader', 'css-loader', 'sass-loader',{
                            loader: 'sass-resources-loader',
                            options: {
                                resources: commonScssFile
                            }
                        }]
                    }
                }
            }, {
                test: /\.js$/,
                include: srcPath,
                use: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css', '.json'],
        alias: {
            'components': `${srcPath}/components`,
            'directives': `${srcPath}/directives`,
            'filters': `${srcPath}/filters`,
            'images': `${srcPath}/images`,
            'store': `${srcPath}/store`,
            'modules': `${srcPath}/modules`,
            'mixins': `${srcPath}/mixins`,
            'style': `${srcPath}/style`,
            'views': `${srcPath}/views`,
            'src': srcPath,
            'vue$': 'vue/dist/vue.js'
        }
    }
}