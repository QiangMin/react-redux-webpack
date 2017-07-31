let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

//压缩文件
var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    output: {
        comments: false,
    }
});
//使用上面的压缩文件会产生警告，解决警告
var definePlugin = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
})

module.exports = {
    entry: {
        jquery:["jquery"],
        react:["react","react-dom","react-router"],
        bootstrap:["bootstrap"],
        redux:["react-redux","redux"]
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: './build/',//访问路径
        filename: '[name].js',
        /**
         * output.library
         * 将会定义为 window.${output.library}
         * 在这次的例子中，将会定义为`window.vendor_library`
         */
        library: '[name]'
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            "windows.jQuery": "jquery",
            jQuery: "jquery",
        }),//
        new webpack.DllPlugin({
            /**
             * path
             * 定义 manifest 文件生成的位置
             * [name]的部分由entry的名字替换
             */
            path: path.join(__dirname, 'build', 'manifest-[name].json'),
            /**
             * name
             * dll bundle 输出到那个全局变量上
             * 和 output.library 一样即可。
             */
            name: '[name]'
        }),
        new HtmlWebpackPlugin(
            {
                title:"QM-react-redux-demo",
                filename: '../template2.html',
                template: './template1.html',
                favicon:"./imgs/favicon.ico",
                hash: true,
                chunks:["jquery","react","bootstrap","redux"],
            }
        ),
        uglifyJsPlugin,//压缩文件
        definePlugin,//上面压缩文件会产生警告，这个消除警告
    ]
};