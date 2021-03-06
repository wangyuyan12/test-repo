
var includeStyleElement = function (styles,styleId) {
    if (document.getElementById(styleId)) return;
    var style = document.createElement('style');
    style.id = styleId;
    (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
    if (style.styleSheet) {
        style.styleSheet.cssText = styles;
    } else {
        style.appendChild(document.createTextNode(styles));
    }
}

var setStyle = function(color) {

	var styleStr = '.load-wrapp {'
    				+  'position: fixed;'
                    +  'z-index: 2000;'
    				+  'left: 0;'
    				+  'top: 0;'
    				+  'width: 100%;'
    				+  'height: 100%;'
    				+  'margin: 0 10px 10px 0;'
    				+  'border-radius: 5px;'
    				+  'text-align: center;'
    				+  'background-color: rgba(0, 0, 0, 0.1);'
    			+  '}'
    			+  '.load-wrapp p {padding: 0 0 20px;}'
    			+  '.load-wrapp:last-child {margin-right: 0;}'
    			+  '.load {'
    				+    'position: relative;'
    				+    'top: 45%;'
    			+  '}'
    			+  '.line {'
    			+      'display: inline-block;'
    			+      'width: 15px;'
    			+      'height: 15px;'
    			+      'border-radius: 15px;'
    			+      'background-color: '+ color +';'
    			+  '}'
    			+  '.ring-1 {'
    			+      'width: 10px;'
    			+      'height: 10px;'
    			+      'margin: 0 auto;'
    			+      'padding: 10px;'
    			+      'border: 7px dashed '+ color  +';'
    			+      'border-radius: 100%;'
    			+  '}'
    			+  '.ring-2 {'
    			+      'position: relative;'
    			+      'width: 45px;'
    			+      'height: 45px;'
    			+      'margin: 0 auto;'
    			+      'border: 4px solid '+ color +';'
    			+      'border-radius: 100%;'
    			+  '}'
    			+  '.ball-holder {'
    			+      'position: absolute;'
    			+      'width: 12px;'
    			+      'height: 45px;'
    			+      'left: 17px;'
    			+      'top: 0px;'
    			+  '}'
    			+  '.ball {'
    			+      'position: absolute;'
    			+      'top: -11px;'
    			+      'left: 0;'
    			+      'width: 16px;'
    			+      'height: 16px;'
    			+      'border-radius: 100%;'
    			+      'background: '+ color +';'
    			+  '}'
    			+  '.letter-holder {padding: 16px;}'
    			+  '.letter {'
    			+      'float: left;'
    			+      'font-size: 14px;'
    			+      'color: #777;'
    			+  '}'
    			+  '.square {'
    			+      'width: 12px;'
    			+      'height: 12px;'
    			+      'border-radius: 4px;'
    			+      'background-color: '+ color +';'
    			+  '}'
    			+  '.spinner {'
    			+      'position: relative;'
    			+      'width: 45px;'
    			+      'height: 45px;'
    			+      'margin: 0 auto;'
    			+  '}'
    			+  '.bubble-1,'
    			+  '.bubble-2 {'
    			+      'position: absolute;'
    			+      'top: 0;'
    			+      'width: 25px;'
    			+      'height: 25px;'
    			+      'border-radius: 100%;'
    			+      'background-color: '+ color +';'
    			+  '}'
    			+  '.bubble-2 {'
    			+      'top: auto;'
    			+      'bottom: 0;'
    			+  '}'
    			+  '.bar {'
    			+      'float: left;'
    			+      'width: 15px;'
    			+      'height: 6px;'
    			+      'border-radius: 2px;'
    			+      'background-color: '+ color +';'
    			+  '}'
    			+  '.load-1 .line:nth-last-child(1) {animation: loadingA 1.5s 1s infinite;}'
    			+  '.load-1 .line:nth-last-child(2) {animation: loadingA 1.5s .5s infinite;}'
    			+  '.load-1 .line:nth-last-child(3) {animation: loadingA 1.5s 0s infinite;}'
    			+  '.load-2 .line:nth-last-child(1) {animation: loadingB 1.5s 1s infinite;}'
    			+  '.load-2 .line:nth-last-child(2) {animation: loadingB 1.5s .5s infinite;}'
    			+  '.load-2 .line:nth-last-child(3) {animation: loadingB 1.5s 0s infinite;}'
    			+  '.load-3 .line:nth-last-child(1) {animation: loadingC .6s .1s linear infinite;}'
    			+  '.load-3 .line:nth-last-child(2) {animation: loadingC .6s .2s linear infinite;}'
    			+  '.load-3 .line:nth-last-child(3) {animation: loadingC .6s .3s linear infinite;}'
    			+  '.load-4 .ring-1 {animation: loadingD 1.5s .3s cubic-bezier(.17,.37,.43,.67) infinite;}'
    			+  '.load-5 .ball-holder {animation: loadingE 1.3s linear infinite;}'
    			+  '.load-6 .letter {'
    			+      'animation-name: loadingF;'
    			+      'animation-duration: 1.6s;'
    			+      'animation-iteration-count: infinite;'
    			+      'animation-direction: linear;'
    			+  '}'
    			+  '.l-1 {animation-delay: .48s;}'
    			+  '.l-2 {animation-delay: .6s;}'
    			+  '.l-3 {animation-delay: .72s;}'
    			+  '.l-4 {animation-delay: .84s;}'
    			+  '.l-5 {animation-delay: .96s;}'
    			+  '.l-6 {animation-delay: 1.08s;}'
    			+  '.l-7 {animation-delay: 1.2s;}'
    			+  '.l-8 {animation-delay: 1.32s;}'
    			+  '.l-9 {animation-delay: 1.44s;}'
    			+  '.l-10 {animation-delay: 1.56s;}'
    			+  '.load-7 .square {animation: loadingG 1.5s cubic-bezier(.17,.37,.43,.67) infinite;}'
    			+  '.load-8 .line {animation: loadingH 1.5s cubic-bezier(.17,.37,.43,.67) infinite;}'
    			+  '.load-9 .spinner {animation: loadingI 2s linear infinite;}'
    			+  '.load-9 .bubble-1, .load-9 .bubble-2 {animation: bounce 2s ease-in-out infinite;}'
    			+  '.load-9 .bubble-2 {animation-delay: -1.0s;}'
    			+  '.load-10 .bar {animation: loadingJ 2s cubic-bezier(.17,.37,.43,.67) infinite;}'
    			+  '@keyframes loadingA {'
    			+      '0 {height: 15px;}'
    			+      '50% {height: 35px;}'
    			+      '100% {height: 15px;}'
    			+  '}'
    			+  '@keyframes loadingB {'
    			+      '0 {width: 15px;}'
    			+      '50% {width: 35px;}'
    			+      '100% {width: 15px;}'
    			+  '}'
    			+  '@keyframes loadingC {'
    			+      '0 {transform: translate(0,0);}'
    			+      '50% {transform: translate(0,15px);}'
    			+      '100% {transform: translate(0,0);}'
    			+  '}'
    			+  '@keyframes loadingD {'
    			+      '0 {transform: rotate(0deg);}'
    			+      '50% {transform: rotate(180deg);}'
     			+     '100% {transform: rotate(360deg);}'
    			+  '}'
    			+  '@keyframes loadingE {'
    			+      '0 {transform: rotate(0deg);}'
    			+      '100% {transform: rotate(360deg);}'
    			+  '}'
    			+  '@keyframes loadingF {'
    			+      '0% {opacity: 0;}'
    			+      '100% {opacity: 1;}'
    			+  '}'
    			+  '@keyframes loadingG {'
    			+      '0% {transform: translate(0,0) rotate(0deg);}'
    			+      '50% {transform: translate(70px,0) rotate(360deg);}'
    			+      '100% {transform: translate(0,0) rotate(0deg);}'
    			+  '}'
    			+  '@keyframes loadingH {'
    			+      '0% {width: 15px;}'
    			+      '50% {width: 35px; padding: 4px;}'
    			+      '100% {width: 15px;}'
    			+  '}'
    			+  '@keyframes loadingI {'
    			+      '100% {transform: rotate(360deg);}'
    			+  '}'
    			+  '@keyframes bounce  {'
    			+    '0%, 100% {transform: scale(0.0);}'
    			+    '50% {transform: scale(1.0);}'
    			+  '}'
    			+  '@keyframes loadingJ {'
    			+    '0%,100% {transform: translate(0,0);}'
    			+    '50% {'
    			+        'transform: translate(80px,0);'
    			+        'background-color: #f5634a;'
    			+        'width: 25px;'
    			+    '}'
    			+  '}'

    return styleStr
}

var newNode = document.createElement('div')
newNode.className = 'load-wrapp'
newNode.id = 'load-wrapp'
newNode.style.display = 'none'
document.body.appendChild(newNode)

function Loading(status, type, color) {

	if(document.getElementById('load-wrapp').childNodes.length === 0) {

		if(color) {
			var style = setStyle(color)
			includeStyleElement(style,"logding-1")
		} else {
			var style = setStyle('#4b9cdb')
			includeStyleElement(style,"logding-1")
		}
		var elem = ''
		if( !type || type === 1) {
			elem = '<div class="load load-1">'
				+ 	 '<div class="line"></div>'
	            + 	 '<div class="line"></div>'
	            + 	 '<div class="line"></div>'
	            +  '</div>'
		} else if(type === 2) {
			elem = '<div class="load load-2">'
				+ 	 '<div class="line"></div>'
	            + 	 '<div class="line"></div>'
	            + 	 '<div class="line"></div>'
	            +  '</div>'
		} else if(type === 3) {
			elem = '<div class="load load-3">'
				+ 	 '<div class="line"></div>'
	            + 	 '<div class="line"></div>'
	            + 	 '<div class="line"></div>'
	            +  '</div>'
		} else if(type === 4) {
			elem = '<div class="load load-4">'
				+ 	 '<div class="ring-1"></div>'
	            +  '</div>'
		} else if(type === 5) {
			elem = '<div class="load load-5">'
				+ 	 '<div class="ring-2">'
	            +        '<div class="ball-holder">'
	            +            '<div class="ball"></div>'
	            +        '</div>'
	            +    '</div>'
	            +  '</div>'
		} else if(type === 6) {
			elem = '<div class="load load-6">'
				+    '<div class="letter-holder">'
	            +        '<div class="l-1 letter">L</div>'
	            +        '<div class="l-2 letter">o</div>'
	            +        '<div class="l-3 letter">a</div>'
	            +        '<div class="l-4 letter">d</div>'
	            +        '<div class="l-5 letter">i</div>'
	            +        '<div class="l-6 letter">n</div>'
	            +        '<div class="l-7 letter">g</div>'
	            +        '<div class="l-8 letter">.</div>'
	            +        '<div class="l-9 letter">.</div>'
	            +        '<div class="l-10 letter">.</div>'
	            +    '</div>'
	            +  '</div>'
		} else if(type === 7) {
			elem = '<div class="load load-7">'
					+	'<div class="square-holder">'
	                +    '<div class="square"></div>'
	                +   '</div>'
	            +  '</div>'
		} else if(type === 8) {
			elem = '<div class="load load-8">'
				+    '<div class="line"></div>'
	            +  '</div>'
		} else if(type === 9) {
			elem = '<div class="load load-9">'
				+    '<div class="spinner">'
	            +        '<div class="bubble-1"></div>'
	            +        '<div class="bubble-2"></div>'
	            +     '</div>'
	            +  '</div>'
		}  else if(type === 10) {
			elem = '<div class="load load-9">'
				+    '<div class="bar"></div>'
	            +  '</div>'
		}
		document.getElementById('load-wrapp').innerHTML = elem
	} 
	if(status === 'show') {
		document.getElementById('load-wrapp').style.display = 'block'
	} else {
		document.getElementById('load-wrapp').style.display = 'none'
	}
}