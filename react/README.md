# ToDo List 前端实践
该项目主要是实现一个基本ToDo List应用。其实质是通过调用网络Api接口，实现数据的“增、删、改、查”等功能。

##编译运行工程
- 环境配置：安装NodeJS（最新版集成npm版本）
- 安装依赖：进入工程的当前文件 运行 npm install 
- 开发环境运行： npm start， 浏览器输入地址： http://localhost:3000/todolist/index.html
- 生产环境打包：1、将webpack.config.js中的 isProduction设置为true，2、运行 npm run deploy，在当前目录下会生成一个dist文件夹，其中为编译后文件

##ToDo 介绍
  - 该页面适用手机一类de小屏幕设备
  - 顶部Bar：标题（ToDo LIST），添加新事项按钮（加号）
  - 添加新事项：点击添加按钮，弹出输入框，在输入框输入事项标题，事项内容，点击提交后，将事项上传至服务器
  - 查看事项内容：点击事项标题，展开事项内容
  - 删除事项：点击叉号按钮，删除事项
  - 完成事项：点击空心五角星按钮，事项底色由淡变深，五角星按钮变成实心（撤销完成事项）
  - 撤销完成事项：点击实心五角星按钮，事项底色由深变浅，五角星变成空心
  - 修改事项：点击笔形按钮，弹出输入框，在输入框修改事项标题or内容，点击确定，将修改后事项上传至服务器
  - 底部bar：点击“ToDo”展示未完成事项列表（默认展示），点击“Done”展示已完成事项列表，点击“All”展示所有事项列表，气泡统计当前事项数目

##工程使用框架及工具
 - React：View层，基本组件，UI实现
 - Redux：Control层，数据的更新，状态流转控制
 - fetch Api： 发送http请求
 - BootStrap： 组件，样式应用
 - WebPack：开发调试，打包

##工程目录结构
```
.
├── todolist        #开发目录  
|   ├──constants     #Redux文件 -constants 定义动作常量  
|   |   └──todo  
|   |       └──todoListTypes.js      #定义每个动作对应的常量  
|   |  
|   ├──actions     #Redux文件 -actions 定义redux所需的动作类型  
|   |   └──todo          
|   |       └──todoListActions.js      #实现事项请求，增加，修改删除等动作（网络请求在此文件中实现）
|   |
|   ├──reducers     #Redux文件 --reducer 消息，数据处理
|   |   ├──todo
|   |   |   └──todoListReducer.js     #应用数据处理，状态处理等（state更新）
|   |   └──rootReducer.js     #根Reducer
|   |
|   ├──stores     #Redux文件 --store 维持整个应用数据，提供数据查询、更新，以及监听事件
|   |   └──configureStore.js     #将todoListReducer引入Redux Store中
|   |
|   ├──todolist      #Todo List 应用实现
|   |   ├──addList.js       #React组件， 添加新事项组件
|   |   ├──addList.less      #添加新事项组件样式表
|   |   ├──itemContainer.js     #React组件，事项展示组件，（展示标题，展开内容，删除事项，完成（撤销)事项，修改事项）
|   |   ├──itemContainer.less     #事项展示组件样式表
|   |   ├──footBar.js     #React组件，底部页面事项分类组件（未完成，已完成，全部）
|   |   ├──footBar.less     #底部Bar组件样式表
|   |   ├──todoList.js      #应用主要功能在此文件中实现，包括组件组装，Redux事务调用及相关状态处理
|   |   ├──todoList.less     #todo应用整体样式表
|   |   ├──index.js       #整个应用组装（View层与Control层组装），将应用添加至html文件
|   |   ├──index.less     #根样式表
|   |   └──index.html      #html文件
|   |
|   ├──dist       #发布目录
|   ├──package.json 
|   ├──node_modules      #包文件夹
|   ├──sever.js      #webpack本地服务
| 	├──webpack.config.js    #webpack配置文件
|   ├──.gitignore   
|   └──README.md
└──end
```
