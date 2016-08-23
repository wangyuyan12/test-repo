'use strict'

let webpackEntry = {  //配置需要打包的入口文件，一般将入口文件命名为index.js
	enteryDir: [
		'./src/views/flex/index.js',
	]  
}

let extractCss = true //是否抽取 css文件 独立打包（一般情况下，选择true）

module.exports = { webpackEntry: webpackEntry, extractCss: extractCss } 
