## 安装&启动&部署
> - 依赖安装： npm install
> - 启动服务： npm start (配置开发文件 dev.env.config.js)
> - 新依赖安装：打包无关依赖： npm install --save XXX； 打包|编译工具：npm install --save-dev XXX
> - 测试环境部署： 将test.env.config.js 中的信息配置为测试环境参数， 部署命令： npm run dpytest
> - 生产环境部署： 将prod.env.config.js 中的信息配置为生产环境参数， 部署命令： npm run dpyprod

## RPC文件编译
>**安装**： thrift's compiler [传送门](http://thrift.apache.org/docs/install/)

>**thrift文件**：

> - thrift文件由前后端约定填写
> - thrift文件请置于thirft目录，**对于新加的thrift文件，请在entry.thrift中引入**。例： 新加入 index.thrift文件， 在entry.thrift文件 顶部添加 include 'index.thrift'
> - thrift文件编译： npm run thrift (在./thrift/lib/gen-nodejs路径下会生成编译后文件)
> - **注意**: 编译时，推荐只编译与本次开发相关的thrift文件，其他的删除


## 环境配置
>**环境配置文件**：

> - ./config/dev.env.config.js  #开发环境
> - ./config/test.env.config.js  #测试环境
> - ./config/prod.env.config.js  #生产环境

>**环境分类**：

> - 本地开发环境 (NODE_ENV === 'development')
> - 测试环境(test.eyaos.com) (NODE_ENV='test')
> - 生产环境(www.eyaos.com) (NODE_ENV='production')
> - **测试和生产环境由部署人配置，开发过程中无需修改**

>**注意**：配置文件中的变量都为全局变量，开发过程中请避免使用配置文件中使用的变量名

>**参数说明**

> - global.listen_port: Koa服务开启的侦听端口，在开发环境下可以按需求修改
> - global.base_domain 根域名配置，需要配置url地址时可以使用此参数，例如：开发环境下 base_domain === 'localhost'
> - 待续（增加新全局变量请在此添加）……

## 打包配置
> - 打包工具 webpack
> - 打包配置文件： ./config/package.config.js
> - 在变量webpackEntry的entryDir对象数组中添加打包入口文件的相对路径，例：enteryDir: ['./src/views/home/index.js']
> - extractCss = true 时，打包时抽取样式，打成单独的css文件; = false 时，不单独抽取样式， 统一打入 bundle.js 文件
> - **注意**： 路径配置时，1、请将相对路径写全，2、只填写与本次开发相关的路径,其他路径删除
> - 打包： a. 开发环境： npm run dev(这种方式打出来的包可以debug)；b. 生产环境： npm run build, 在正式发布前，务必使用此命令打包;
> - webpack.config.js 该文件请不要随意修改！！！

## 日志说明
> - 日志模块 log4js， [传送门](https://github.com/nomiddlename/log4js-node)
> - 日志输出目录 ./logs
> - log输出信息会在终端打出，推荐使用log4js 代替console
> - 日志标签请按业务添加，例如： 首页业务 log4js.getLogger('home')
> - app.log 包含所有日志信息
> - errors.log 包含error级别及以上日志信息
> - http.log 包含所有http请求信息


## 工程目录结构
```
├── eyaos_front        #开发目录  
|   ├──bin    #服务启动相关路径  
|   |   ├──app.js   #koa 服务入口  
|   |   ├──dispatch.js  #graceful 异常捕捉
|   |   ├──work.js  # graceful
|   |   └──log4js.json #log配置文件   
|   |  
|   ├──config     #配置文件路径 
|   |   ├──dev.env.config.js  #开发环境变量配置
|   |   ├──test.env.config.js #测试环境变量配置
|   |   ├──prod.env.config.js #开发环境变量配置
|   |   └──package.config.js  # 打包入口文件配置      
|   |
|   ├──public     #静态文件目录（打包后文件自动置于此目录）
|   |   ├──common #该路径放置常用的模块，如：jQuery， silder等
|   |   └──home
|   |
|   ├──src      #开发文件目录
|   |   ├──app     #将业务逻辑层置于此目录
|   |   |   └──home   #各个业务通过文件夹作区分，例如 home
|   |   ├──lib    #公用模块至于此目录
|   |   ├──router   #路由目录
|   |   └──views  #view层，模板、js、css文件开发目录
|   |       └──home  #各个业务通过文件夹作区分，例如 home
|   |
|   ├──package.json 
|   ├──node_modules      #包文件夹
|   ├──webpack.config.js    #webpack配置文件
|   ├──.gitignore
|   └──README.md
└──end
```
