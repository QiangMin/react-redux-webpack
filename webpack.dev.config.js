let path = require('path'); //引入路径
let webpack = require('webpack'); //引入webpack
let jquery = require('jquery/dist/jquery.js');

//压缩文件
let uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
	compress: {
		warnings: false
	},
	output: {
		comments: false,
	}
});
//使用上面的压缩文件会产生警告，解决警告
let definePlugin = new webpack.DefinePlugin({
	"process.env": {
		NODE_ENV: JSON.stringify("production")
	}
})
module.exports = {
	//页面入口文件配置
	entry: {
		app:['react-hot-loader/patch','./entry/index.js']
	},
	//入口文件输出配置
	 output:{
		path: path.join(__dirname, 'build'), //文件的绝对路径
		publicPath: "http://localhost:8082/build/", //访问路径
		filename: "[name].js", //输出的文件名
	},//加载器配置
	module: {
		rules: [{
			test: /\.less$/,
			use: ["style-loader", "css-loader?sourceMap", "less-loader?sourceMap"],
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			use: ["style-loader", "css-loader?sourceMap"],
			//exclude:/node_modules/,
		}, {
			test: /\.js$/,
			exclude: /node_modules/,//排除某个文件的
			use: [{
				"loader":"react-hot-loader/webpack",
			}, {
				"loader": "babel-loader",
				query: {
					"presets": [
						["es2015", {
							"modules": false
						}],
						["react"],
						["stage-0"]
					]
				} //这样的话就可以不要.babelrc的配置文件
			}]
		}, {
			test: /\.(png|jpg|jpeg|git|svg|woff|woff2)$/,
			use: ["url-loader?limit=8192"]
		}, {
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			use: ["url-loader?limit=10000&mimetype=application/font-woff"]
		}, {
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			use: ["url-loader?limit=10000&mimetype=application/octet-stream"]
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			use: ["file-loader"]
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: ["url-loader?limit=10000&mimetype=image/svg+xml"]
		}]
	},
	//web-dev-server相关配置
	devServer: {
		publicPath: "http://localhost:8082/build/",
		hot: true,
		historyApiFallback: true,
		headers: { //解决前后端联调时的跨域问题
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
		}
	},
	//其他解决方案配置
	resolve: {
		//自动扩展文件后缀名，意味着我们require模块和定义别名时可以省略不写后缀名
		extensions: [" ",'.js',"jsx"],
		//绝对路径
		//模块别名定义，方便后续直接引用别名，无须多写长长的地址

	},
	//插件配置
	plugins: [
		//定义全局变量
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			"windows.jQuery": "jquery",
			jQuery: "jquery",
			// Promise: 'es6-promise-promise'
		}),
	],
	devtool: "eval-source-map", //它能帮你定位到位压缩的源代码，但它会生成很大的source map文件，所以只建议在开发环境使用
	//watch:true//当配置了Watchmode,每当文件修改的时候，webpack都会自动build
}