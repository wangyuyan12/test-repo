console.log('start')
var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var configDir = require('./package.config').configDir
var extractCss = require('./package.config').extractCss

//
/*var configDir = {
  enteryDir: ['./src/add-area/index.js', './src/sku-detail/index.js', './src/prod-detail/index.js'],
  outputDir: '/home/tzf/Documents/front/test-repo/vue-start/assets'  //支持一个输出路径
}

//是否提取css
var extractCss = true*/

//判断开发环境还是生产环境
var isProduction  = process.env.NODE_ENV === 'development' ? false : true   //设置为false——开发环境    // return true;  //设置为true——生产环境
console.log('isProduction', isProduction)

if(configDir.outputDir === '') {
  configDir.outputDir = path.join(__dirname, 'assets')
}
console.log('configDir.outputDir', configDir.outputDir)

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
      console.log('filePath: ', filePath)
      enteryObj[filePath] = [item, 'webpack-hot-middleware/client']
    })
  }
  return enteryObj
}

var plugins = [
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