require.config({
	paths: {
		jquery: 'http://apps.bdimg.com/libs/jquery/1.10.1/jquery.min'
	}
})
require(['jquery', 'easyDialog'], function($, w) {	 
	w.easyDialog($(".btn1")).init();
	w.easyDialog($(".btn2")).init({
		width:400,
		msg:'带回调函数的alert弹出框',
		buttons:['ok'],
		buttonClass:['success'],
		callback:function(){
			alert("你点击了按钮")
		}
	});
	w.easyDialog($(".btn3")).init({
		width:'400',
		msg:'多个按钮的alert弹出框',
		buttons:['确定','取消'],
		buttonClass:['danger','default']
	});
	w.easyDialog($(".btn4")).init({
		buttons:'',
	});
	w.easyDialog($(".btn5")).init({
		width: 500,
		height: 400,
		borderRadius:10,
		type: 'modal',
		title:"可拖拽的模态框",
		content: '.a',
		effect: 'bounceY',
		isDrag: true
	});
	w.easyDialog($(".btn6")).init({
		width: 800,
		height: 600,
		borderRadius:10,
		type: 'modal',
		content: 'http://www.w3cfuns.com',
		effect: 'bounceX',
		isDrag: true
	});
})