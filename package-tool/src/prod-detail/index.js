import './prod-detail.less'
import './tz_base.css'
import $ from 'jquery'

$(() => {
	let csrftoken = document.cookie.match(/csrftoken=\w+/g)[0].replace(/csrftoken=/, '')
	let onlineId = /detail\/\d+/.exec(location.href)[0].replace('detail\/', '')
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
               + 	'<span class="left-span tz-no-wrap">产品包装：<input class="online-info" id="online-unit" type="text" value="' + (pub.unit || '--') + '" disabled="disabled"></span>'
               + 	'<span class="right-span tz-no-wrap">中包大小：<input class="online-info"  id="online-middle" type="text" value="' + (pub.middle || '--') + '" disabled="disabled"></span>'
               + '</p>'
               + '<p>'
               + 	'<span class="left-span tz-no-wrap">批准文号：<input class="online-info"  id="online-license" type="text" value="' + (pub.license || '--') + '" disabled="disabled"></span>'
               + 	'<span class="right-span tz-no-wrap">整件大小：<input class="online-info"  id="online-package" type="text" value="' + (pub.package || '--') + '" disabled="disabled"></span>'
               + '</p>'
               + '<p>已挂网区域：</p>'  
   	}

   	let rendArea = (areas) => {
   		let tableHead =   '<tr>'
   						+ 	'<th class="width-10">省份</th>'
                  		+ 	'<th class="width-10">城市</th>'
                  		+ 	'<th class="width-15">挂网价格</th>'
                  		+ 	'<th class="width-30">运输公司</th>'
                  		+	'<th class="width-15">挂网状态</th>'
                  		+	'<th class="width-20">操作</th>'
                  		+ '</tr>'

        let tableBody =  ''
        areas.map((item, index) => {

        	item.cities.map((city, index) => {
        		if(index === 0) {
        			tableBody += '<tr>'
                  				+	'<td rowspan=' + (item.cities.length) + '>' + (item.prov || '--') + '</td>'
                  				+	'<td>' + (city.name || '--') + '</td>'
                  				+	'<td><input type="text" class="online-price" value="' + (city.price || '--') + '" disabled="disabled"></td>'
                  				+	'<td><select name="company" class="online-com sel-style" disabled="disabled">'
                  				+		'<option value="' + city.companyId + '">' + (city.company || '--') + '</option>'
                  				+       '</select>' 
                  				+    '</td>'
        		} else {
        			tableBody += '<tr>'
                  				+	'<td>' + (city.name || '--') + '</td>'
                  				+	'<td><input type="text" class="online-price" value="' + (city.price || '--') + '" disabled="disabled"></td>'
                  				+	'<td><select name="company" class="online-com sel-style" disabled="disabled">'
                  				+		'<option value="' + city.companyId + '">' + (city.company || '--') + '</option>'
                  				+       '</select>' 
                  				+   '</td>'
        		}

        		if(city.state === 1) {
              		tableBody += '<td class="online-state">申请中</td>'
              				  +	 '<td>'
              				  +   '<input type="button" class="online-btn edit" onlineid="' + city.id + '" value="编辑">'
              				  +   '<input class="online-btn del" type="button" onlineid="' + city.id + '" value="删除">'
              	} else if(city.state === 2) {
              		tableBody += '<td class="online-state">挂网成功</td>'
              				  +	 '<td><input type="button" class="online-btn edit" onlineid="' + city.id + '" value="编辑">'
              				  +  '<input class="online-btn del" type="button" onlineid="' + city.id + '" value="删除">'
              	} else if(city.state === 3) {
              		tableBody += '<td class="online-state">挂网拒绝</td>'
              				  +  '<td><input type="button" class="online-btn reapply" onlineid="' + city.id + '" value="重新申请">'
              	}
              	tableBody += '</tr>'
        	})
        }) 
        return tableHead + tableBody            
   	}

   	let onlineAreaModify = (id, elem, type) => {
   		if(type === 'edit') {
   			$.ajax({
   				url: '/purchase/api/enterprise/skuonlinearea/' + id,
   				type: 'GET',
   				beforeSend: (xhr) => {
					xhr.setRequestHeader("X-CSRFToken", csrftoken)
				}
   			}).done(resp => {
   				let comStr = ''
   				resp.deliver_company.map(item => {
   					comStr += '<option value="' + item.id + '">' + (item.name || '--') + '</option>'
   				})
   				elem.find('.online-price').css('border', '1px solid #ddd').removeAttr('disabled')
				elem.find('.online-com').removeClass('sel-style').removeAttr('disabled').html(comStr)
				elem.find('.edit').val('保存').css('color', '#EEEE00')
   			}).fail(err => {
   				console.log('failed')
   			})
   		} else if(type === 'save' || type === 'reapply') {
   			let data = {}
   			data.price = elem.find('.online-price').val()
   			data.company = elem.find('.online-com').val()
   			if(type === 'reapply') {
   				data.state = 1
   			}
   			$.ajax({
   				url: '/purchase/api/enterprise/skuonlinearea/' + id,
   				type: 'PATCH',
   				beforeSend: (xhr) => {
					xhr.setRequestHeader("X-CSRFToken", csrftoken)
				},
				contentType: 'application/json',
				data: JSON.stringify(data)
   			}).done(resp => {
   				elem.find('.online-price').css('border', 'none').attr('disabled', 'disabled')
   				elem.find('.online-com').addClass('sel-style').attr('disabled', 'disabled')
   				if(resp.state === 1) {
   					elem.find('.online-state').html('申请中')
   				} else if(resp.state === 2) {
   					elem.find('.online-state').html('挂网成功')
   				} else if(resp.state === 3) {
   					elem.find('.online-state').html('挂网拒绝')
   				}
   				elem.find('.edit').val('编辑').css('color', '#83b8fe')
   			}).fail(err => {
   				swal('修改失败！')
   			})
   		} else if(type === 'delete') {
   			$.ajax({
   				url: '/purchase/api/enterprise/skuonlinearea/' + id,
   				type: 'DELETE',
   				beforeSend: (xhr) => {
					xhr.setRequestHeader("X-CSRFToken", csrftoken)
				},
				contentType: 'application/json',
   			}).done(resp => {
   				elem.css({'text-decoration': 'line-through', 'background-color': 'gray'})
   			}).fail(err => {
   				swal('删除失败！')
   			})
   		}

   	}

   	let loadOnlineArea = (onlineId) => {
   		$.ajax({
			url: '/purchase/api/skuonline/detail/' + onlineId,
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
							cities: [{
									id: item.id,
									name: item.area.name, 
									price: item.price, 
									company: item.company.name,
									companyId: item.company.id,
									state: item.state, }]
						})

					} else {
						let city = {
							id: item.id,
							name: item.area.name,
							price: item.price,
							company: item.company.name,
							companyId: item.company.id,
							state: item.state,
						}
						areas[isExit].cities.push(city)
					}
				})

				$('#prod-edit').attr('href', '/sku/new/pub?id=' + sku.id + '&edit=1')				
				$('#sku-info').html(rendSku(sku))
				$('#public-info').html(rendPubInfo(pub))
				$('#area-table').html(rendArea(areas))
				$('.edit').click(function() {
					var onlineAreaId = $(this).attr('onlineid')
					let parentNode = $(this).parents('tr')
					if($(this).val() === '编辑') {
						onlineAreaModify(onlineAreaId, parentNode, 'edit')
					} else if($(this).val() === '保存') {
						onlineAreaModify(onlineAreaId, parentNode, 'save')
					}
				})
				$('.del').click(function() {
					var onlineAreaId = $(this).attr('onlineid')
					let parentNode = $(this).parents('tr')
					onlineAreaModify(onlineAreaId, parentNode, 'delete')
				})
				$('.reapply').click(function() {
					var onlineAreaId = $(this).attr('onlineid')
					let parentNode = $(this).parents('tr')
					onlineAreaModify(onlineAreaId, parentNode, 'reapply')
				})
			},
			error: () => {
				console.log('failed to get data')
			}
		})
   	}

   	let modifiyOnlinInfo = OnlineInfo => {
   		$.ajax({
   			url: '/purchase/api/skuonline/detail/' + onlineId,
   			type: 'PATCH',
   			contentType: 'application/json',
   			beforeSend: (xhr) => {
				xhr.setRequestHeader("X-CSRFToken", csrftoken)
			},
			data: JSON.stringify(OnlineInfo)
   		}).done(resp => {
   			$('.online-info').attr('disabled', 'disabled').css('border', 'none')
			$('#online-edit').val('编辑').css('color', '#83b8fe')
   			console.log(resp)
   		}).fail(err => {
   			swal('修改失败！')
   		})
   	}

   	loadOnlineArea(onlineId)
	$('#online-edit').click(function() {
		if($(this).val() === '编辑') {
			$('.online-info').removeAttr('disabled').css('border', '1px solid #ddd')
			$(this).val('保存').css('color', '#EE6363')
		} else if($(this).val() === '保存') {
			var unit = $('#online-unit').val()
			var license = $('#online-license').val()
			var middle = Number($('#online-middle').val())
			var pack = Number($('#online-package').val())
			modifiyOnlinInfo({unit: unit, license: license, middle: middle, package: pack})
		}
	})

})

