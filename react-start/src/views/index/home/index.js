'use strict';
import './web.css'
import './rem.js'

$(() => {
    $('#home-slider').swiper({
        pagination: '#home-slider .swiper-pagination',
        nextButton: '#home-slider .swiper-button-next',
        prevButton: '#home-slider .swiper-button-prev',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        loop: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    })

});
// menu点击效果
(() => {
    $('#index-menulist').on('click',e => {
        $('#tz-menu-list').is(":visible")
            ? $('#tz-menu-list').hide()
            :$('#tz-menu-list').show();
    });
})();

$('.nav-wrraper').on('click','.dropdown', e => {
    $('.dropdown').toggleClass('open');
});