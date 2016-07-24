console.log('start')
var path = require('path')
var fs = require('fs')
var webpack = require('webpack')

//判断开发环境还是生产环境
var isProduction = function () {
  return false;    //设置为false——开发环境
  // return true;  //设置为true——生产环境
};

// 遍历目录
var searchDir = ['hug-apps']; // 需要webpack打包的目录
console.log('searchDir: ' + searchDir)
var entryFile = {}
var hasIndexjsFile = false

searchDir.forEach(function(dir){
  console.log('__dirname: ' + __dirname)
  var srcBasePath = path.join(__dirname, './', dir); //拼装到views路径
  console.log('srcBasePath: ' + srcBasePath)
  var files = fs.readdirSync(srcBasePath);  //读取views路径下的文件夹

  if(/index.js/g.test(files)) {
    console.log('add entry file!')
    entryFile[dir + '/index'] = path.join(srcBasePath, 'index.js')
    hasIndexjsFile = true
  }

  files.map(function (file) {
    console.log('filemap: ' + file)
    var currentPath = path.join(srcBasePath, file)
    var stats = fs.lstatSync(currentPath)   //过滤文件
    if(stats.isDirectory()){   
      console.log(file + ' is a directory')
      var hasIndexJs = fs.readdirSync(currentPath)

      if(/index.js/g.test(hasIndexJs)){
          console.log('add entry file!')
          //将当前路径下的所有目录的index.js文件添加为webpack入口文件
          entryFile[dir+'/'+file+'/index'] = 
              path.join(srcBasePath, file, 'index.js')
          hasIndexjsFile = true
      } /*else {
          throw 'In ' + path.join(srcBasePath, file) + 
            '\'index.js\' file must be added '
      }*/
    } 
  })

  if(!hasIndexjsFile) {
    throw 'In' + path.join(srcBasePath) + 
       ' a \'index.js\' file must be added '
  }
})

Object.keys(entryFile).map(function(key) {   //入口文件拼装
  entryFile[key] = [entryFile[key], 'webpack-hot-middleware/client']
  console.log('entryFile:' + key)
})

console.log(Object.keys(entryFile))

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  
  /*new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',
    filename: 'common.js'
  })*/
]

if(isProduction()) {
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
  devtool: isProduction() ? null : 'cheap-module-eval-source-map',
  entry: entryFile,
  output: {
    path: path.join(__dirname, 'dist'),
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