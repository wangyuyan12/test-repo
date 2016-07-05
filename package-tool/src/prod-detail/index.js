import './prod-detail.less'
import './tz_base.css'
import $ from 'jquery'

$(() => {
	let csrftoken = document.cookie.match(/csrftoken=\w+/ig)[0].replace(/csrftoken=/, '')
	let skuId = /detail\/\d+/.exec(location.href)[0].replace('detail\/', '')
	//加载
	let rendSku = (sku) => {
		return '<img src=' + sku.pic + '>'
				+ '<div class="prod-intro">'
				+ 	'<p class="name tz-no-wrap">' + (sku.name || '--') + '</p>'
				+	 '<p>'
				+		'<span class="left-span tz-no-wrap">规格：' + (sku.specs || '--') + '</span>'
				+		'<span class="right-span tz-no-wrap">剂型：'+ (sku.dosage_form || '--') + '</span>'
				+ 	'</p>'
				+ 	'<p class="tz-no-wrap">厂商：' + (sku.factory || '--') + '</p>'
				+ 	'<p>优势：' + (sku.adva || '--') + '</p>'
				+ '</div>'
	}

	let rendPubInfo = (pub) => {
		return   '<p>'
               + 	'<span class="left-span tz-no-wrap">产品包装：' + (pub.unit || '--') + '</span>'
               + 	'<span class="right-span tz-no-wrap">中包大小：' + (pub.middle || '--') + '</span>'
               + '</p>'
               + '<p>'
               + 	'<span class="left-span tz-no-wrap">批准文号：' + (pub.license || '--') + '</span>'
               + 	'<span class="right-span tz-no-wrap">整件大小：' + (pub.package || '--') + '</span>'
               + '</p>'
               + '<p>已挂网区域：</p>'  
   	}

   	let rendArea = (areas) => {
   		let tableHead =   '<tr>'
   						+ 	'<th class="width-20">省份</th>'
                  		+ 	'<th class="width-20">城市</th>'
                  		+ 	'<th class="width-20">挂网价格</th>'
                  		+ 	'<th class="width-40">运输公司</th>'
                  		+ '</tr>'

        let tableBody =  ''
        areas.map((item, index) => {

        	item.cities.map((city, index) => {
        		if(index === 0) {
        			tableBody += '<tr>'
                  				+	'<td rowspan=' + (item.cities.length) + '>' + (item.prov || '--') + '</td>'
                  				+	'<td>' + (city.name || '--') + '</td>'
                  				+	'<td>' + (city.price || '--') + '</td>'
                  				+	'<td>' + (city.company || '--') + '</td>'
                  				+ '</tr>'
        		} else {
        			tableBody += '<tr>'
                  				+	'<td>' + (city.name || '--') + '</td>'
                  				+	'<td>' + (city.price || '--') + '</td>'
                  				+	'<td>' + (city.company || '--') + '</td>'
                  				+ '</tr>'
        		}
        	})
        }) 
        return tableHead + tableBody            
   	}

   	let loadOnlineArea = (skuId) => {
   		$.ajax({
			url: '/purchase/api/skuonline/detail/' + skuId,
			type: 'GET',
			beforeSend: (xhr) => {
				xhr.setRequestHeader("X-CSRFToken", csrftoken)
			},
			success: (data) => {
				let sku = data.sku
				
				let pub = {
					unit: data.unit,
					middle: data.middle,
					package: data.package,
					license: data.license,
				}
				
				let areas = []
				data.online_areas.map((item, index) => {
					let isExit = areas.findIndex((value, index, arr) => {
						return value.prov === item.area.parent_name
					})
					if(isExit === -1) {
						areas.push ({
							prov: item.area.parent_name,
							cities: [{name: item.area.name, 
									price: item.price, 
									company: item.company.name }]
						})

					} else {
						let city = {
							name: item.area.name,
							price: item.price,
							company: item.company.name
						}
						areas[isExit].cities.push(city)
					}
				})
				
				$('#sku-info').html(rendSku(sku))
				$('#public-info').html(rendPubInfo(pub))
				$('#area-table').html(rendArea(areas))

			},
			error: () => {
				console.log('failed to get data')
			}
		})
   	}

   	loadOnlineArea(skuId)
	
})

