'use strict'

let enter_data = () => {

	let result = {}

	let comp1 = {}
	let prod11 = {}
	let prod12 = {}
	let prod13 = {}

	comp1.name = '广州宸康医药科技有限公司'
	comp1.focus_num = 2
	comp1.logo_url = 'http://img.eyaos.com/cache/c1/1e/c11e84787f9611f7b4fbc9f928c87df4.jpg'
	comp1.id = 1512

	prod11.name = '银杏叶'
	prod11.spec = '9g*10袋'
	prod11.type = '处方药'
	prod11.comm_num = 12
	prod11.img_url = 'http://img.eyaos.com/cache/b8/3a/b83abe853fc335c448ccdc259eace815.png'
	prod11.id = 19044

	prod12.name = '手参'
	prod12.spec = '3g*10袋'
	prod12.type = '处方药'
	prod12.comm_num = 12
	prod12.img_url = 'http://img.eyaos.com/cache/8b/38/8b38d6b44630cf51c33a854946e84617.png'
	prod12.id = 19043

	prod13.name = '美洲大蠊'
	prod13.spec = '1g*10袋'
	prod13.type = '处方药'
	prod13.comm_num = 12
	prod13.img_url = 'http://img.eyaos.com/cache/c3/d9/c3d917e850bda7affa807b20964dfb74.png'
	prod13.id = 19042

	let prod_list1 = [ prod11, prod12, prod13 ]
	comp1.prod_list = prod_list1


	let comp2 = {}
	let prod21 = {}
	let prod22 = {}
	let prod23 = {}

	comp2.name = '浙江福朋医药有限公司'
	comp2.focus_num = 11
	comp2.logo_url = 'http://img.eyaos.com/cache/c6/86/c686d87279c225ee4b5e087df87ab7da.jpg'
	comp2.id = 1616

	prod21.name = '培植牛黄'
	prod21.spec = '0.05g'
	prod21.comm_num = 12
	prod21.type = '处方药、OTC'
	prod21.img_url = 'http://img.eyaos.com/cache/af/1f/af1f556b3e1a34297bba013c842fdbe1.jpg'
	prod21.id = 22261

	prod22.name = '牛黄解毒片'
	prod22.spec = '12片'
	prod22.comm_num = 12
	prod22.type = '处方药'
	prod22.img_url = 'http://img.eyaos.com/cache/3d/d7/3dd7298cc4725e6aea549872f14b75b1.jpg'
	prod22.id = 22259

	prod23.name = '双芩止泻口服液双芩止泻口服液'
	prod23.spec = '10ml*6支'
	prod23.comm_num = 12
	prod23.type = 'OTC'
	prod23.img_url = 'http://img.eyaos.com/cache/6c/13/6c136798989dd2935f16bbcbfeccf199.jpg'
	prod23.id = 22248

	let prod_list2 = [ prod21, prod22, prod23 ]

	comp2.prod_list = prod_list2

	result.comp_list = [ comp1, comp2 ]

	let logo1 = '/static/index/enterprise/resource/enter_01.jpg'
	let logo2 = '/static/index/enterprise/resource/enter_02.jpg'
	let logo3 = '/static/index/enterprise/resource/enter_03.jpg'
	let logo4 = '/static/index/enterprise/resource/enter_04.jpg'
	let logo5 = '/static/index/enterprise/resource/enter_05.jpg'
	let logo6 = '/static/index/enterprise/resource/enter_06.jpg'
	let logo7 = '/static/index/enterprise/resource/enter_07.jpg'
	let logo8 = '/static/index/enterprise/resource/enter_08.jpg'
	let logo9 = '/static/index/enterprise/resource/enter_09.jpg'
	let logo10 = '/static/index/enterprise/resource/enter_10.jpg'
	let logo11 = '/static/index/enterprise/resource/enter_11.jpg'
	let logo12 = '/static/index/enterprise/resource/enter_12.jpg'
	let logo13 = '/static/index/enterprise/resource/enter_13.jpg'
	let logo14 = '/static/index/enterprise/resource/enter_14.jpg'

	result.logo_list = [logo1, logo2, logo3, logo4, logo5, logo6, logo7,
		logo8, logo9, logo10, logo11, logo12, logo13, logo14]

	return result
}

module.exports = enter_data