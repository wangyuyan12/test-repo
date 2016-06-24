'use strict';
import './pro_detail.less'
// tab切换
$(function() {
	var $li = $('#detail_nav li');
	var $ta = $('.tab-con .tab-pane');
	$li.click(function() {
		var $this = $(this);
		var $t = $this.index();
		$li.removeClass();
		$this.addClass('active');
		$ta.removeClass('active');
		$ta.eq($t).addClass('active');
	});
})	


// 收缩展开效果
$(".list_head").click(function(){
	$(this).next(".list_content").animate({height: 'toggle', opacity: 'toggle'},"slow");
},function(){
	$(this).next(".list_content").animate({height: 'toggle', opacity: 'toggle'});
});