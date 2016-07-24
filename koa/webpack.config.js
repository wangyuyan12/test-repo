var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var entry = require('./config/package.config.js').webpackEntry
var extractCss = require('./config/package.config.js').extractCss

console.log('[%s] [webpack] package start!', new Date())

//判断开发环境还是生产环境

var isProduction = process.env.NODE_ENV === 'development' ? false : true
console.log('NODE_ENV', process.env.NODE_ENV)

//入口文件
var configDir = entry

var outDir = ''

var enteryFiles = function() {
  var enteryObj = {}
  if(configDir.enteryDir.length === 0 || configDir.enteryDir === undefined) {
    console.log('[%s} [webpack]', 'entry path need to configurated ', new Date())
    return
  } else {
    configDir.enteryDir.map((item, index) => {
      var entry = fs.exists(item, function(exists) {
        if(!exists) {
          throw ( 'path' + item + ' is not a correct path!') 
        }
      })
      // var filePath = item.replace(/\.js/, '').replace(/\.\/src\/views/, '')  //filePath配置时把最后的 ‘/’去掉，否则在hot reload情况下，会出现文件无法找到情况
      
      var filePath = item.replace(/\.\/src\/views\//, '').replace(/\/[a-zA-Z0-9_-]+\.js/, '')
      // var outPath = filePath2.replace(/\/[a-zA-Z0-9_-]+\.js/, '')
      // console.log('filePath2', filePath2 )
      outDir = filePath
      filePath = filePath.replace(/\//g, '')
      console.log('[%s] [webpack] [%s]: ', new Date(),filePath)
      enteryObj[filePath] = [item]
    })
  }
  return enteryObj
}

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  // new webpack.optimize.CommonsChunkPlugin('common/common.js'),
  new ExtractTextPlugin("[name].css?[hash]-[chunkhash]-[contenthash]-[name]", {
      disable: !extractCss,
      allChunks: true
    }),
]

if(isProduction) {
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
    path: path.join(__dirname, 'public', outDir),
    filename: '[name].bundle.js',
    publicPath: '/static/' + outDir + '/'
  },

  plugins: plugins,

  module: {
    loaders: [{
      test:/\.js$/,
      loader:'babel-loader',
      exclude:/node_modules/,
      include:__dirname,
      query:{
        presets: ['es2015','react']
      }
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract('style-loader', 
        'css-loader?sourceMap!less-loader?sourceMap'),
      include: __dirname
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap'),
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