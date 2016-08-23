

//打包路径配置
var configDir = {
  enteryDir: [
  				'./src/prod-detail/index.js',
  			 	'./src/add-area/index.js',
  			 './src/sku-detail/index.js',
  			 './src/order-detail/index.js',
         './src/order-cancel/index.js',
         './src/shop-refund/index.js',
         './src/refund-detail/index.js',
         './src/app-order-detail/index.js',
         './src/app-refund-detail/index.js',
  			 ],
   outputDir: '/home/tzf/Documents/eyaos/eyaos_web/web/static/classic/purchase/'  //支持一个输出路径
}

//是否提取css为单独文件从
var extractCss = true

//ngrok config
var ngrokConfig= {
	token: '68NcTtewq6VKaa7eiW5en_239XjYofPtNBEPKPRT8nJ',
	port: 3000,
	proto: 'http', // http|tcp|tls  (default： http)
  subDomain: 'feifeiyuonpe'
}


module.exports = {
	configDir: configDir,
	extractCss: extractCss,
	ngrokConfig: ngrokConfig
}