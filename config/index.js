const {resolve} = require('path'),
    srcPath = resolve(__dirname, '../src')

module.exports = {
    srcPath: srcPath,
    distPath: resolve(__dirname, '../dist'),
    commonScssFile: [`${srcPath}/style/variables/system-variable.scss`], // 配置全局scss变量
    publicPath: '/',
    assets: 'assets',
    limit: 1024 * 5,                            // url-loader limit参数
    htmlPlugin: {                               // html-webpack-plugin config
        title: 'webpack building',
        template: 'index.html',
        favicon: './src/images/favicon.ico'
    },
}