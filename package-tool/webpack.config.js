'use strict'
console.log('start')
let path = require('path')
let fs = require('fs')
let webpack = require('webpack')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let configDir = require('./package.config').configDir
let extractCss = require('./package.config').extractCss

//
/*let configDir = {
  enteryDir: ['./src/add-area/index.js', './src/sku-detail/index.js', './src/prod-detail/index.js'],
  outputDir: '/home/tzf/Documents/front/test-repo/vue-start/assets'  //支持一个输出路径
}

//是否提取css
let extractCss = true*/

//判断开发环境还是生产环境
let isProduction  = process.env.NODE_ENV === 'development' ? false : true   //设置为false——开发环境    // return true;  //设置为true——生产环境
console.log('isProduction', isProduction)

if(configDir.outputDir === '') {
  configDir.outputDir = path.join(__dirname, 'assets')
}
console.log('configDir.outputDir', configDir.outputDir)

//判断路径是否存在，如果不存在则新建路径
let makeDirIfNotExist = function(dir, cb) {
  fs.stat(dir, function(err, state) {
    if(err) {
      fs.mkdir(dir, function(err) {
        if(err) {
          cb(err, null)
        }
        cb(null, true)
      })
    } else {
      cb(null, true)
    }
  })
    
}
//文件拷贝
let fileCopy = function(folderPath, outPath) {
  
  fs.readdir(folderPath, function(err, files) {
    if(err)
       throw err
   
    files.map((item, index) => {
      let src = path.join(folderPath, item)
      let dst = path.join(outPath, item)    

      fs.stat(src, function(err, state) {
        if(err)
          throw err
        if(state.isFile()) { //如果是文件 拷贝
          console.log('to wirte file', item)
          let readAble = fs.createReadStream(src)
          let writeAble = fs.createWriteStream(dst)
          readAble.pipe(writeAble)
        }
        if(state.isDirectory()) { //如果是文件夹，重新循环
          makeDirIfNotExist(path.join(outPath, item), function(err, state) {
            if(err) 
              throw err
            fileCopy(path.join(folderPath, item), path.join(outPath, item))
          })
        }
      })
    })
  })
}
//文件分析
let copySourceCode = function() {
  configDir.enteryDir.map((item, index) => {
    fs.stat(item, function(err, state) {
      if(err) {
        console.log('exists', exists)
        throw ( 'path' + item + 'is not a correct path!') 
      }
    })
    ////拷贝文件
    let folderPath = item.replace(/\/[a-zA-Z0-9_-]+\.js/, '')
    // console.log('[%s] [floder path] [%s]: ', new Date(), folderPath)
    let folderName = folderPath.split('/').pop()
    let outDir = path.join(configDir.outputDir, folderName)

    //判断路径是否存在//共两级路径
    makeDirIfNotExist(outDir, function(err, state) {
      if(err)
        throw err
      //判断source-code 路径是否存在
      makeDirIfNotExist(path.join(outDir, 'code'), function(err, state) {
        if(err)
          throw err
        fileCopy(folderPath, path.join(outDir, 'code'))
      })
    })     
  })
}

//运行build时，拷贝源码
if(isProduction) {
  copySourceCode()
}



let enteryFiles = function() {
  let enteryObj = {}
  if(configDir.enteryDir.length === 0 || configDir.enteryDir === undefined) {
    console.log('[webpack]', 'entry path need to configurated ')
    return
  } else {
    configDir.enteryDir.map((item, index) => {
      fs.stat(item, function(err, state) {
        if(err) {
          console.log('exists', exists)
          throw ( 'path' + item + 'is not a correct path!') 
        }
      })
      //打包文件
      let filePath = /[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.js/.exec(item)[0].replace(/\.js/, '')  //filePath配置时把最后的 ‘/’去掉，否则在hot reload情况下，会出现文件无法找到情况
      console.log('filePath: ', filePath)
      enteryObj[filePath] = [item]      
    })
  }
  return enteryObj
}

let plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  // new webpack.optimize.CommonsChunkPlugin('common/common.js'),
  new ExtractTextPlugin( '[name].css?[hash]-[chunkhash]-[contenthash]-[name]', {
      disable: !extractCss,
      allChunks: true
    }),
]

if(isProduction) {
  console.log('current env is production')
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      test: /(\.jsx|\.js)$/,
      compress: {
        warnings: false
      },
    })
  )
}

module.exports = {
  devtool: isProduction ? null : 'cheap-module-eval-source-map',
  entry: enteryFiles(),
  output: {
    path: configDir.outputDir,
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },

  plugins: plugins,

  module: {
    loaders: [{
      test:/\.js$/,
      loader:'babel-loader',
      exclude:/node_modules/,
      include:__dirname,
      query:{
        presets: ['es2015'],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 
        'css-loader?sourceMap!less-loader?sourceMap!autoprefixer-loader?safe=true'),
      include: __dirname
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!autoprefixer-loader?safe=true'),
      include: __dirname
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i, 
      loader: 'url-loader?limit=5000&name=[path][name].[ext]' 
    },
    //fonts loader
    { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  }
}