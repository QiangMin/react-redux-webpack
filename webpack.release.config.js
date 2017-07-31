/**
 * Created by QM on 2016/9/21.
 * 2017.5.18 升级webpack，react，使用react-hot-loader
 */
let path = require('path'); //引入路径
let webpack = require('webpack'); //引入webpack
let HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html模板
let jquery = require('jquery/dist/jquery.js');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin({
	filename: '[name]_1.css'
});
let extractLESS = new ExtractTextPlugin({
	filename: '[name]_2.css'
});

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
		'app': [
			'./entry/index.js'
		]
	},
	//入口文件输出配置
	output: {
		path: path.join(__dirname, 'build'), //文件的绝对路径
		 publicPath: "./build/", //访问路径
		filename: "[name].js", //输出的文件名
		chunkFilename: "[name].chunk.js?[chunkhash]" //模块化加载
	},
	//加载器配置
	module: {
		rules: [{
			test: /\.less$/,
			use: extractLESS.extract({
				fallback: "style-loader",
				use: ["css-loader", "less-loader"],
			}),
			exclude: /node_modules/,
		}, {
			test: /\.css$/,
			use: extractCSS.extract({
					fallback: "style-loader",
					use: "css-loader",
				})
				//exclude:/node_modules/,
		},  {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: __dirname,
                use: [
                    {
                        "loader":"babel-loader" ,
                        query: {
                            "presets": ["react", "es2015"]
                            }
                        }
                    ],//这样的话就可以不要.babelrc的配置文件
       }, {
			test: /\.(png|jpg|jpeg|git|svg|woff|woff2)$/,
			use: ['file-loader?publicPath=./']
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
	//其他解决方案配置
	resolve: {
		//自动扩展文件后缀名，意味着我们require模块和定义别名时可以省略不写后缀名
		extensions: ['.js', '.jsx', '.scss'],
		//绝对路径
		//模块别名定义，方便后续直接引用别名，无须多写长长的地址
		alias: {
			'jqPaginator.css': path.resolve( //path.resolve,把当前位置转换为绝对位置
				__dirname,
				'../plugin/jqPaginator-master/jqPaginator.css'
			), ////后续直接 require('scss') 即可
			'jqPaginator.js': path.resolve( //path.resolve,把当前位置转换为绝对位置
					__dirname,
					'../plugin/jqPaginator-master/jqPaginator.js'
				) ////后续直接 require('scss') 即可
		}

	},
	//插件配置
	plugins: [
		extractCSS,
		extractLESS,
		//生成模板
		new HtmlWebpackPlugin({
            filename: '../index.html',
            template: './template2.html',
			hash: true,
			//chunks:["jquery","react","echarts","bootstrap","redux","app"],
			chunksSortMode: "auto",
			/* files: {
			     "js": [ "./build/dll.react.js","./build/dll.bootstrap.js", "./build/dll.echarts.js","./build/dll.react.js","./build/dll.redux.js"],
			 }*/
		}),
		//定义全局变量
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			"windows.jQuery": "jquery",
			jQuery: "jquery",
			// Promise: 'es6-promise-promise'
		}),
		 new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/manifest-bootstrap.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/manifest-jquery.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/manifest-react.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./build/manifest-redux.json'),
        }),
		uglifyJsPlugin, //压缩文件
		definePlugin//上面压缩文件会产生警告，这个消除警告
	],
	

}