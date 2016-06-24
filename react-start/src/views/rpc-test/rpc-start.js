import './rpc-start.less'

let cnt = 0

document.getElementById('test').addEventListener('click', e => {
	alert('test ok!!')
	cnt --
	document.getElementById('resutl').innerHTML = cnt   
})