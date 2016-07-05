import './add-area.less'
import './tz_base.css' 
import $ from 'jquery'

$(() => {
	let csrftoken = document.cookie.match(/csrftoken=\w+/ig)[0].replace(/csrftoken=/, '')
	let skuId = /add\/\d+/.exec(location.href)[0].replace('add\/', '')
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

   	let rendList = (cities) => {
   		let cityList = ''
   		cities.map((item, index) => {
   			cityList += '<option value=' + item.id + '>' + item.name + '</option>'
   		})
   		return cityList
   	}

   let loadOnlineArea = (id) => {
		$.ajax({
			url: '/purchase/api/skuonline/detail/' + id,
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

	let getAreas = (parenNode, id) => {
		$.get('/area/cityList/v2/' + id, (data, status) => {
			if(status === 'success') {
				if(id === 1) {
					let node = $(parenNode).find('.province')
					node.html(rendList(data))
					getAreas(parenNode, node.val())  //渲染城市
				} else {
					let node = $(parenNode).find('.city')
					node.html(rendList(data))
					getCompany(parenNode, node.val())
				}
			} else {
				console.log('failed to load areas')
			}
		})
	}

	let getCompany = (parenNode, areaId) => {
		$.get('/purchase/api/company/list/area/' + areaId, (data, status) => {
			if(status === 'success') {
				$(parenNode).find('.company').html(rendList(data))
				if(data.length === 0) {
					sweetAlert("温馨提示！", '抱歉，该区域未设置商业公司', 'error')
				}
			}
		})
	}

	let getApplyInfo = () => {
		let nodes = $('#area-list').children()
		let applyInfos = []
		let subFlage = true
		for(let i=0; i<nodes.length; i++) {
			let area = $(nodes[i]).find('.city').val()
			let company = $(nodes[i]).find('.company').val()
			let price = parseFloat($(nodes[i]).find('.price').val())
			if(isNaN(price)) {
				$(nodes[i]).find('.price').css('border-color', 'red')
					.attr('placeholder', '请输入正确单价')
				subFlage = false
			}

			applyInfos.push({area: area, company: company, price: price})
		}
		if(subFlage) {
			return applyInfos
		} else {
			return null
		}
	}

	let subApply = (applyInfos, skuId) => {
		$.ajax({
            url: '/purchase/api/skuonlinearea/' + skuId,
            type: 'POST',
            contentType: 'application/json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFTOKEN", csrftoken)
            },
            data: JSON.stringify(applyInfos),
            success: function(data) {
            	sweetAlert("温馨提示！", '申请发送成功！', 'success')
            },
            error: function(xhr, textStatus, errorThrow) {
            	if(xhr.status === 400) {
            		sweetAlert("温馨提示！", '请检查是否区域重复申请挂网！', 'error')
            	} else {
            		sweetAlert("温馨提示！", '申请发送失败，请重试！', 'error')
            	}
            	
            }
        })
	}

	loadOnlineArea(skuId)
	getAreas($('.area-unit')[0], 1) //渲染省份	

	$('.price').on('input', function() {
		$(this).css('border-color', '#ccc')
	})

	$('.province').change( function() {
		let parenNode = $(this).parents('.area-unit')
		getAreas(parenNode, $(this).val())
	})

	$('.city').change(function() {
		let parenNode = $(this).parents('.area-unit')
		getCompany(parenNode, $(this).val())
	})

	$('.add-area').click(function() {
		let areaUnit = $(this).parents('.area-unit').clone(true)
		$(areaUnit).find('.del-area').css('display', 'block')
		areaUnit.appendTo('#area-list')
	})
	$('.del-area').click(function() {
		$(this).parents('.area-unit').remove()
	})
	$('#btn-sub').click(() => {
		let node = $('#area-list').children()
		let applyInfos = getApplyInfo()
		if(applyInfos) {
			subApply(applyInfos, skuId)
		}
		
	})

})