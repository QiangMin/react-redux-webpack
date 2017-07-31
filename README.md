# react-redux-webpack

这是一个基于"react+react-router+redux+less+webpack"的demo程序，主要是搭建环境，实现react+ract-router+redux的使用。    
主要实现以下功能
#### 1.代码切分以及异步加载
#### 2.公共组件单独打包
#### 3.css 单独打包
#### 4.缓存处理
#### 3.国际化

### 克隆
```
git clone https://github.com/QiangMin/react-redux-webpack.git
cd react-redux-webpack
npm install
npm start
```


### 运行

``` js
"scripts": {
    "dev": "webpack-dev-server --config webpack.dev.config.js  --inline --hot --port 8082 ",
    "release": "webpack --config webpack.release.config.js",
    "dll": "webpack --config webpack.dll.config.js ",
    "start": "node server.js"
  },
```
## 技术栈

- react@15.3.1
- react-router@3.0.5
- redux@3.6.0
- webpack@1.13.2
- es6

## 浏览器兼容

- Chrome
- Firefox
- Safari
- IE10+

react-demo
