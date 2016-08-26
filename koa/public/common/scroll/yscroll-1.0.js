var yscrolNextUrl = null  //下一个请求链接
var yscrollLoadmore = null //是否加载更多

var Yscroll = function (option, cb) {
    //参数
  var target = option.target || null
  if(target === null) {
    throw 'target id can\'t be null'  
  }
  var refresh = option.refresh || true
  yscrollLoadmore = option.url ? true : false
  var token = option.token ? 'token\ \ ' + option.token : null
  var height = option.height || window.screen.height
  yscrolNextUrl = option.url ? option.url : null

  //设置窗口高度
  var _this = document.getElementById(target)
  _this.style.height = height + 'px'
  _this.style.position = 'absolute'
  _this.style.width = '100%'
  _this.style.overflow = 'auto'
  var startY = 0 //滑动起点
  var offsetY = 0 //拉动距离

  //给子元素嵌套一层
  if(yscrollLoadmore || refresh) {
    var scrollWrapper = document.createElement('div')
    scrollWrapper.setAttribute('id', 'scroll-wrapper')
    var childNodes = _this.childNodes
    for(var i=0; i<childNodes.length; i++) {
      scrollWrapper.appendChild(childNodes[0])
    }
    _this.appendChild(scrollWrapper)
  }
  //加载提示图标
  var loadNode = document.createElement('p')
  loadNode.style.textAlign = 'center'
  loadNode.style.lineHeight = '15px'
  loadNode.style.margin = '0'
  if(yscrollLoadmore) {
    var text = document.createTextNode('加载更多')
    loadNode.appendChild(text)
    _this.appendChild(loadNode)
  }  

  //接口请求
  var headers = {}
  if(token) {
    headers.Authorization = token
  }

  function toLoadMore(yscrolNextUrl) {
    reqwest({
      url: yscrolNextUrl,
      method: 'GET',
      headers: headers,
      crossOrigin: true,
      withCredentials: true,
    }).then(function(resp) {
      if(resp.next) {
        this.yscrolNextUrl = resp.next
        loadNode.innerHTML = '加载更多'
      } else {
        loadNode.innerHTML = '没有更多了'
        yscrollLoadmore = false
      }
      
      cb(null, resp.results)
    }).fail(function(err) {
      cb(err, null)
    })
  }

  if(yscrollLoadmore) {
    toLoadMore(yscrolNextUrl) //首次加载
  }

  //touch事件处理
  function touch(e) {
    // e.preventDefault()  //加了 scroll 事件没了
    var e = e || window.event
    var offsetTop = _this.scrollHeight - height  //相对与顶部偏移距离
    var scrollTop = _this.scrollTop
    var touch = e.touches[0]

    switch(e.type) {
      case 'touchstart': 
        startY = touch.pageY
        break
      case 'touchmove':  //滑动中
        offsetY = touch.pageY - startY
        if(scrollTop === 0 || Math.abs(scrollTop - offsetTop) < 5) {
          _this.style.top = offsetY + 'px'
        }
        break
      case 'touchend':  //滑动结束
        _this.style.top = '0px'
        if( offsetTop === 0 || scrollTop / offsetTop > .7 ) {
           offsetTop && (document.body.scrollTop = 10000)  //把body移到底部

           if( yscrollLoadmore && Math.abs(scrollTop - offsetTop) < 5 && offsetY < -150) {
              loadNode.innerHTML = '加载中...'
              offsetTop && (_this.scrollTop = _this.scrollHeight)

              toLoadMore(yscrolNextUrl) //请求接口
           }
        } else if( refresh && ( offsetTop === 0 || scrollTop / offsetTop < .3 )) {

          document.body.scrollTop = 0  //把body移到顶部

          if( scrollTop === 0 && offsetY > 150) {

            loadNode.innerHTML = '加载中...'
            _this.insertBefore(loadNode, _this.childNodes[0])

            //微信页面刷新
            if(location.search === '') {
              location.href += '?wxtag=' + new Date().getTime()
            } else {
              var wxtag = /(&)?wxtag=(\d)+/.exec(location.href)

              if(wxtag === null) {
                location.href += '&wxtag=' + new Date().getTime()
              } else {
                query = wxtag[0].split('=')
                query = query[0] + '=' + new Date().getTime()
                location.href = location.href.replace(wxtag[0], query)
              }
            }
          }
        }
        break
      case 'touchcancel':  //滑动结束
        _this.style.top = '0px'
        if( yscrollLoadmore && (offsetTop === 0 || scrollTop / offsetTop > .7 )) {

           offsetTop && (document.body.scrollTop = 10000)  //把body移到底部

           if( Math.abs(scrollTop - offsetTop) < 5 && offsetY < -150) {
              loadNode.innerHTML = '加载中...'
              offsetTop && (_this.scrollTop = _this.scrollHeight)

              toLoadMore(yscrolNextUrl) //请求接口
           }
        } else if( refresh && ( offsetTop === 0 || scrollTop / offsetTop < .3 )) {

          document.body.scrollTop = 0  //把body移到顶部

          if( scrollTop === 0 && offsetY > 150) {
            loadNode.innerHTML = '加载中...'
            _this.insertBefore(loadNode, _this.childNodes[0])

            //微信页面刷新
            if(location.search === '') {
              location.href += '?wxtag=' + new Date().getTime()
            } else {
              var wxtag = /(&)?wxtag=(\d)+/.exec(location.href)
              if(wxtag === null) {
                location.href += '&wxtag=' + new Date().getTime()
              } else {
                query = wxtag[0].split('=')
                query = query[0] + '=' + new Date().getTime()
                location.href = location.href.replace(wxtag[0], query)
              }
            }
          }
        }
        break
      }
    }

  _this.addEventListener('touchstart', touch, false)
  _this.addEventListener('touchmove', touch, false)
  _this.addEventListener('touchend', touch, false)
  _this.addEventListener('touchcancel', touch, false)
}

