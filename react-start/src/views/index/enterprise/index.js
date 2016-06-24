'use strict'

import './index.css'

 $(() => {

 	$('#bg_pic').click( () => {
        $('.mceng').removeClass('none')
        $('.popup').removeClass('none')
    })

    $('.mceng').click( () => {
        $('.mceng').addClass('none')
        $('.popup').addClass('none')
    })

    $('.ip').keyup(function() {
    	$('this').css('border-color', '#ccc')
    })

	$('.nav-wrraper').on('click','.dropdown', (e) => {
	    $('.dropdown').toggleClass('open')
	})

    $('#tp').click( () => {
    	let info = {}
    	let input_name = $('#name')
    	let input_mobile = $('#mobile')
    	let input_company = $('#company')
    	let input_job = $('#job')
    	let readyFlage = true
    	
    	if($(input_name).val()) {
    		info.name = $(input_name).val()
    	} else {
    		$(input_name).css('border-color', 'red')
    		readyFlage = false
    	}
    	if(/^1\d{10}$/.test($(input_mobile).val())) {
    		info.mobile = $(input_mobile).val()
    	} else {
    		$(input_mobile).css('border-color', 'red')
    		readyFlage = false
    	}
    	if($(input_company).val()) {
    		info.company = $(input_company).val()
    	} else {
    		$(input_company).css('border-color', 'red')
    		readyFlage = false
    	}
    	if($(input_job).val()) {
    		info.job = $(input_job).val()
    	} else {
    		$(input_job).css('border-color', 'red')
    		readyFlage = false
    	}

    	if(readyFlage) {
    		$.post('http://localhost:8000/authenticate/api/applied', info, (data, status) => {
    			if(status === 'success') {
    				$('.popup').addClass('none')
    				alert('申请发送成功！')
    			} else {
    				alert('申请发生失败，请重试')
    			}
    		})
    	} else {
    		alert('请完整填写申请信息')
    	}
    })

    $('#ym_bt').click( () => {
        $('#yq_qp').toggleClass('qr_center')
    })
 }) 