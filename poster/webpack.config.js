console.log('start')
var path = require('path')
var fs = require('fs')
var webpack = require('webpack')

//打包路径
var configDir = {
  enteryDir: ['./src/poster2/index.js'],
  outDir: ''
}

//判断开发环境还是生产环境
var isProduction  = process.env.NODE_ENV === 'production' ? true : false   //设置为false——开发环境    //设置为false——开发环境
  // return true;  //设置为true——生产环境

var enteryFiles = function() {
  var enteryObj = {}
  if(configDir.enteryDir.length === 0 || configDir.enteryDir === undefined) {
    console.log('[webpack]', 'entry path need to configurated ')
    return
  } else {
    configDir.enteryDir.map((item, index) => {
      var entry = fs.exists(item, function(exists) {
        if(!exists) {
          console.log('exists', exists)
          throw ( 'path' + item + 'is not a correct path!') 
        }
      })

      var filePath = /[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\.js/.exec(item)[0].replace(/\.js/, '')  //filePath配置时把最后的 ‘/’去掉，否则在hot reload情况下，会出现文件无法找到情况
      
      console.log('filePath: ', path.join(__dirname, 'assets', filePath.split('/')[0]))
      filePath = filePath.split('/')
      configDir.outDir = filePath[0]
      enteryObj[filePath[1]] = [item, 'webpack-hot-middleware/client']
    })
  }
  return enteryObj
}

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  // new webpack.optimize.CommonsChunkPlugin('common/common.js'),
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
    path: path.join(__dirname, 'assets', configDir.outDir),
    filename: '[name].bundle.js',
    publicPath: '/static/' + configDir.outDir + '/'
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
      loader: 'style-loader!css-loader!less-loader',
      include: __dirname
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      include: __dirname
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i, 
      loader: 'url-loader?limit=50000&name=[path][name].[ext]' 
    },
    //fonts loader
    { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  }
}