(function h5TouchEvt () {
   var startX, //触摸时的坐标
       startY,
       x,  //纵向滑动距离
       y,  //横向滑动距离
       offsetY //相对距离

   var documentHeight = document.getElementById('inner').offsetHeight
   var wrapperHeight = document.getElementById('outer').offsetHeight
   
   function touchStart(e) {
      e.preventDefault()
      var touch = e.touches[0]
      startY = touch.pageY
      console.log('startY: ', startY)
   }

   function touchMove(e) {
      e.preventDefault()
      var touch = e.touches[0]
      offsetY = touch.pageY - startY
      document.getElementById('inner').style.top = offsetY + 'px'
   }

   function touchEnd(e) {
      e.preventDefault()
      var touch = e.touches[0]
      document.getElementById('inner').style.top = 0 + 'px'
   }

   document.getElementById("outer").addEventListener('touchstart', touchStart,false) 
   document.getElementById("outer").addEventListener('touchmove', touchMove,false)
   document.getElementById("outer").addEventListener('touchend', touchEnd,false)    

})()

- document.getElementById('show-more').offsetTop