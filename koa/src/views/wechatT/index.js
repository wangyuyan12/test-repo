// import wx from './sdk/jweixin.js'
import wx from 'weixin-js-sdk'
//test
let wxStatus = 0  //0: not ready; 1: ready; 2: error

wx.config({
		debug: true,
		appId: 'wxec20d6faebd1508d',
		timestamp: '1468507125',
		nonceStr: '554158203',
		signature: 'a9a8d7594de9d2d41a0f5a474dcfa4c45290a5fa',
		jsApiList: ['chooseImage'],
	})
wx.ready(() => {
	console.log('wx ready')
	alert('wx ready')
	wxStatus = 1
})
wx.error(() => {
	console.log('wx error')
	alert('wx error')
	wxStatus = 2
})


document.getElementById('test1').addEventListener('click', function() {
	alert('ok')
	console.log('ok')
})

document.getElementById('check-api').addEventListener('click', function() {
	wx.checkJsApi({
		jsApiList: ['chooseImage'],
		success: (resp) => {
			alert(resp)
			console.log(resp)
		}
	})
})

document.getElementById('chooseimg').addEventListener('click',function() {
	alert('choose image')
	if(wxStatus === 1) {
		wx.chooseImage({
			count: 4,
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success: (res) => {
				var localIds = res.localIds 
				console.log('localIds', localIds)
			}
		})
	} else {
		console.log('wx init failed')
	}
})
