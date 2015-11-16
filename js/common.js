/*
 码农：冰vs焰
 时间：2014年8月19日 
 描述：公共js系列
 * */
var phoneWidth;
var ROOTPATH = "";
var commonJS={
	//mobileMeta:function(){
	
	//	phoneWidth = parseInt(window.screen.width);
	//	var phoneScale = phoneWidth/640;

	//	var ua = navigator.userAgent;
	//	if (/Android (\d+\.\d+)/.test(ua)){
	//		var version = parseFloat(RegExp.$1);
	//		// andriod 2.3
	//		if(version>2.3){
	//			document.write('<meta name="viewport" content="width=640, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+', target-densitydpi=device-dpi">');
	//		// andriod 2.3以上
	//		}else{
	//			document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
	//		}
	//		// 其他系统
	//	} else {
	//		document.write('<meta name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
	//	}
		
	//},
	addClass:function(o,c){
		$(window).scroll(function(){
			if($(window).scrollTop()>10){
				o.addClass(c);
				$("."+c).next().css("padding-top","80px");
			}
		});
	},
	/*
	 * 调用图片轮播图片
	 * @o：jquery对象
	 * @t：类型(false-单个图片,true-多个图片
	 */
	animatePic:function(o,opt,t){
		
		t?'':t=false;
		
		var defaults={
			/*单个图片*/
			duration: 		400, // 动画速度
	        delay: 			4000, // 动画时间间隔
	        margin: 		5,
	        mouseTouch: 	true,
	        namespace: 		"touchslider",  //最外层块
	        next: 			"", // next 样式指定
	        pagination: 	".touchslider-nav-item",
	        currentClass: 	"touchslider-nav-item-current", // current 样式指定
	        prev:		 	"", // prev 样式指定
	        autoplay: 		true, // 自动播放
	        viewport:  		".touchslider-viewport",
	        callback:       function(){},
	        
	        /*多个图片*/
	        width:300, 
			height:100, 
			rows: 1, 
			columns: 4, 
			direction: 'horizontal',  //horizontal-横，vertical-竖
			pages: false,
			nav:false
		};
		
		opt=$.extend(defaults,opt||{});
		
		if(!t){
			$.getScript(ROOTPATH+"js/jquery.touchslider.js",function(){
			    
			    if(opt.nav){
				    //创建点按钮
				    var pointStr='';
				    var len=$(opt.viewport).find("ul li").length;
				    pointStr+='<div class="pic_bottom">';
					pointStr+='			<div class="ban_ico">';
					
					for(var i=0; i<len;i++){
						if(i===0){
							pointStr+='	<a href="javascript:void(0);" class="j-point active"></a>';
						}else{
							pointStr+='	<a href="javascript:void(0);" class="j-point"></a>';
						}
					}
					pointStr+='		</div>';
					pointStr+='</div>';
				    
				    $(opt.viewport).after(pointStr);
			   }
			    
			    o.touchSlider({
			        container: 		this,
			        duration: 		opt.duration, 	// 动画速度
			        delay: 			opt.delay, 		// 动画时间间隔
			        margin: 		opt.margin,
			        mouseTouch: 	opt.mouseTouch,
			        namespace: 		opt.namespace,  //最外层块
			        next: 			opt.next, 		// next 样式指定
			        pagination: 	opt.pagination,
			        currentClass: 	opt.currentClass, // current 样式指定
			        prev: 			opt.prev, 		// prev 样式指定
			        autoplay: 		opt.autoplay,	// 自动播放
			        viewport:  		opt.viewport,
			        callback:       opt.callback,
			        width:          opt.width,
                    height:         opt.height

			    });
			});
		}else{
			$.getScript(ROOTPATH+"js/jquery.promptu-menu.js",function(){
				o.promptumenu({
					width:		opt.width, 
					height:		opt.height, 
					rows: 		opt.rows, 
					columns: 	opt.columns, 
					direction: 	opt.direction, 
					pages: 		opt.pages,
					nav:        opt.nav
				});
			});
		}
	},
	/*秒转时间格式*/
	 setTime:function(miao){
		var time='';
		var d=Math.floor(miao/60/60/24);
	    var h=Math.floor(miao/60/60%24);
	    var m=Math.floor(miao/60%60);
	    var s=Math.floor(miao%60);
	    
	    d>=0?time+=d+"天":'';
	    h>=0?time+=h+"时":'';
	    m>=0?time+=m+"分":'';
	    s>=0?time+=s+"秒":''; 
	    
	    return time;
	},
	/*
	 * 滚动条事件
	 * @type:0(距离顶部)，1(距离底部)
	 * @callback: 回调方法
	 */
	scrollTo:function(type,callback){
		$(document).scroll(function(){
			var top=$(document).scrollTop(),
			 	h=$(document).height(),
			 	_h=$(window).height(),
			 	dish=50;  //佐料
			 if(type==0){
			 	if(top>dish){
			 		callback();
			 	}
			 }
			 	
			if(type==1){
				if(top>=(h-_h)-dish){
					callback();
				}
			}
		});
	},


	scrollWithDish: function (type, dishs, callback) {
	    $(document).scroll(function () {
	        var top = $(document).scrollTop(),
			 	h = $(document).height(),
			 	_h = $(window).height()
	        ;
	        var dish = dishs ? dishs : 20;
	        if (type == 0) {
	            if (top > dish) {
	                callback();
	            }
	        }

	        if (type == 1) {
	            if (top >= (h - _h) - dish) {
	                callback();
	            }
	        }
	    });
	},
	/*
	 * ajax加载
	 */
	ajax:function(opt){
		$.getScript(ROOTPATH+"js/ajax.js",function(){
				$.Ajax(opt);
		});
	},
	/*
	 * 触摸事件
	 * */
	touch:function(opt){
		//@obj:对象， @ type：x(横),y(竖)， @callback:回调函数
		opt=$.extend({
			obj:$(document),
			type:"x",
			moveCallback:function(){},
			endCallback:function(){}
		},opt || {});
		
		var isTouchScreen=('ontouchstart' in window)?true:false;
		var startTouch,moveTouch,endTouch,addEventListener;
		var startX,startY;
		isTouch=false;
		startTouch=isTouchScreen?"touchstart":"mousedown";
		moveTouch=isTouchScreen?"touchmove":"mousemove";
		endTouch=isTouchScreen?"touchend":"mouseup";
		
		
		function start(e){
			e.preventDefault();  //取消默认
			e.stopPropagation(); //取消冒泡
			startX=e.touches?e.touches[0].pageX:e.pageX;
			startY=e.touches?e.touches[0].pageY:e.pageY;
			isTouch=true;
		}
		function move(e){
			if(isTouch){
				e.preventDefault();  //取消默认
				e.stopPropagation(); //取消冒泡
				var X=e.touches?e.touches[0].pageX:e.pageX;
				var Y=e.touches?e.touches[0].pageY:e.pageY;
				opt.type=="x"?opt.moveCallback(X-startX):opt.moveCallback(Y-startY);
			}
		}
		function end(e){
			if(isTouch){
				e.preventDefault();  //取消默认
				e.stopPropagation(); //取消冒泡
				var X=e.touches?e.changedTouches[0].pageX:e.pageX;
				var Y=e.touches?e.changedTouches[0].pageY:e.pageY;
				opt.type=="x"?opt.endCallback(X-startX):opt.endCallback(Y-startY);
			}
			isTouch=false;
		}
		
		if(window.addEventListener){
			opt.obj[0].addEventListener(startTouch,start,false);
			opt.obj[0].addEventListener(moveTouch,move,false);
			opt.obj[0].addEventListener(endTouch,end,false);
		}else{
			opt.obj[0].attachEvent("on"+startTouch,start);
			opt.obj[0].attachEvent("on"+moveTouch,move);
			opt.obj[0].attachEvent("on"+endTouch,end);
		}
			
	},
	
	//回退功能
	historyGo:function(){
		//$(".u-back").click(function(){
		//	window.history.go(-1);
		//});
	},
	//获取url参数
	request:function(name){
		 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
		 var r = window.location.search.substr(1).match(reg);
		 if (r!=null) return (r[2]); return null;
	},
	/*加载样式文件*/
	loadStyle:function(url){
	    try {
	        document.createStyleSheet(url);
	    } catch(e) {
	        var cssLink = document.createElement('link');
	        cssLink.rel = 'stylesheet';
	        cssLink.type = 'text/css';
	        cssLink.href = url;
	        var head = document.getElementsByTagName('head')[0];
	        head.appendChild(cssLink);
	    }
	},
	//初始化
	init:function(){
		commonJS.historyGo(); 

		//1、图片显示加载
		$("img").each(function(){
			var url = $(this).attr("u");
			if(url!='' && url!=undefined) {
				this.src= $(this).attr("u");
				$(this).attr("onerror","this.src='/Resources/Theme/PureBlue/images/default200.png'");
			}
		});
		
		//2、A链接：页面跳转，显示加载图
		$("a").click(function () {
			if($(this).attr("url")==undefined) return;
			commonJS.pageload();
			setTimeout(function(){commonJS.unpageload();},5000);
			window.location.href = $(this).attr("url");
		});
		//console.log($("a").length);
		//$("a").each(function () {
		//    $(this).bind("click", function () {
		//        if ($(this).attr("url") == undefined) return;
		//        commonJS.pageload();
		//        setTimeout(function () { commonJS.unpageload(); }, 5000);
		//        window.location.href = $(this).attr("url");
		//    });
		//});
		
		//3、监听屏幕大小改变事件
		window.addEventListener("resize", function(event) {
			if(phoneWidth != window.screen.width){
				//window.location.reload();
				//commonJS.mobileMeta();
			}
		}, false);
	},
	//测试网络链接  herry 2014-10-11
	doRequest:function(){
		var num = 0;
		var tt = setInterval(function(){num=1;}, 60000);
	    $.post("/Page/checkNetwork",function(data){
	    	l = 0;
	    	if(num==1) { // 一分钟获取不到返回值，网络链接不上
	    		clearInterval(tt);
	    		window.location.href='/Page/network';
	    	}
	    	if(data){
	    		clearInterval(tt);
	    	}
	    });
	},
	//提示内容，停留时长控制 herry 2015/1/31
	prompt:function(msg,time){
		
		var html = '<div class="promptBox">';
		html += '<div class="msg">'+msg+'</div>';
		html += '</div>';
		if($("#cover").length==0) {
			$("body").append("<div id='cover'></div>");
		}
		$("#cover").show();
		$("body").append(html);
		
		time = time>0?time:2500;
		setTimeout(function(){
			$(".promptBox").remove();
			$("#cover").remove();
		},time);
		
		$(".promptBox .close").click(function(){
			$(".promptBox").remove();
			$("#cover").remove();
		});
	},
	//底部模态弹出框
	modeWindow:function(opt,type){
		opt=$.extend({
			message:'',						//弹出框内容
			type:"alert",					//alert：只有确定按钮|confirm：包括确定和取消按钮
			confirmCallback:function(){},	//确认按钮的回调函数
			cancelCallback:function(){}		//取消按钮的回调函数
		},opt || {});
		
		show();
		
		//显示弹窗
		function show(){
			var html = '';
			html += '<div class="alertBox">';
			html += '<div class="f-mask" style="display:block"></div>';
			if(type=='confirm'){
				html += '<div class="f-box1" style="display:block">';
			}else {
				html += '<div class="f-box" style="display:block">';
			}
			html += '<p class="message">' + opt.message + '</p>';
			if(opt.type.length > 0){
				html += '<a class="do-submit yes">确定</a>';
				if(opt.type == 'confirm'){
					html += '<a class="do-submit no">取消</a>';
				}
			}
			html += '</div></div>';
			$("body").append(html);
			
			$(".alertBox .yes").click(function(){
				destroy();
				opt.confirmCallback();
			});
			$(".alertBox .no").click(function(){
				destroy();
				opt.cancelCallback();
			});
		}
		
		//销毁弹窗
		function destroy(){
			$(".alertBox").remove();
		}
	},
	//普通模态弹出框
	alert:function(msg,callback,time){
		var opt = {
				message : msg,
				type: "alert",
				confirmCallback: callback
		};
		
		commonJS.modeWindow(opt,'alert');
		var time = time>0 ? time : 0;
		if(time!=0){
			setTimeout(function(){
				$(".alertBox").remove();
			},time);
		}
	},
	//确认模态弹出框
	confirm:function(msg, confirmCallback, cancelCallback){
		var opt = {
				message : msg,
				type: "confirm",
				confirmCallback: confirmCallback,	
				cancelCallback: cancelCallback
		};
		
		commonJS.modeWindow(opt,'confirm');
	},



    //中部模态弹出框
	centerWindow: function (opt, type) {
	    opt = $.extend({
	        message: '',						//弹出框内容
	        type: "alert",					//alert：只有确定按钮|confirm：包括确定和取消按钮
	        confirmCallback: function () { },	//确认按钮的回调函数
	        cancelCallback: function () { }		//取消按钮的回调函数
	    }, opt || {});

	    show();

	    //显示弹窗
	    function show() {
	        var html = '';
	        html += '<div class="alertBox">';
	        html += '<div class="f-mask" style="display:block"></div>';
	        if (type == 'confirm') {
	            html += '<div class="f-box2" style="display:block">';
	        } else {
	            html += '<div class="f-box" style="display:block">';
	        }
	        html += '<p class="message">' + opt.message + '</p>';
	        if (opt.type.length > 0) {
	            if (opt.type == 'confirm') {
	                html += '<a class="do-submit no">取消</a>';
	            }
	            html += '<a class="do-submit yes">确定</a>';
	        }
	        html += '</div></div>';
	        $("body").append(html);

	        $(".alertBox .yes").click(function () {
	            destroy();
	            opt.confirmCallback();
	        });
	        $(".alertBox .no").click(function () {
	            destroy();
	            opt.cancelCallback();
	        });
	    }

	    //销毁弹窗
	    function destroy() {
	        $(".alertBox").remove();
	    }
	},


	confirmcenter: function (msg, confirmCallback, cancelCallback) {
	    var opt = {
	        message: msg,
	        type: "confirm",
	        confirmCallback: confirmCallback,
	        cancelCallback: cancelCallback
	    };

	    commonJS.centerWindow(opt, 'confirm');
	},

	//页面加载时图标
	pageload:function(){
		var time = arguments[0]?arguments[0]:3000; //1:不限制时间
		$("body").append("<div class='pageload'></div>");
		console.log($("#cover").length);
		if($("#cover").length==0) $("body").append("<div id='cover'></div>");
		$("#cover").show();
		if(time!=1){
			setTimeout(function(){
				$(".pageload , #cover").remove();
			},time);
		}
	},
	//取消页面加载
	unpageload:function(){
		$(".pageload , #cover").remove();
	},
	//图片加载出错，删除图片对象
	imgerror:function(obj){
		$(obj).remove();
	}
	
};
$(function(){
	commonJS.doRequest(); 
	commonJS.init();
});


//表单异步提交
function AjaxFormSubmit(formId , post ) {
	//表单不存在 则直接返回
	if(!formId){
		formId = 'form';
	}
	if($('#'+formId).length == 0) {
		return false ;
	}
	var action = $('#'+formId).attr('action');
	if( !action ) {
		action = location.href ;
	}
	if( !post ) {
		post = 'post' ;
	}
	$.ajax({
		url:action , 
		type:post , 
		data: $('#'+formId).serialize() , 
		dataType:'json',
		beforeSubmit:commonJS.pageload(),//页面loding。..
		async:false,
		success:function(data) {
			commonJS.unpageload();
			if(data=='' || data==null){
				commonJS.prompt('网络错误,请稍后再重试!');//错误消息
				return;
			}
			var time = data.time?data.time:3000;
			if (data.ret == 0) {
				commonJS.prompt(data.msg,time);//正确的消息
				setTimeout(function () {
					if(typeof(data.url)!='undefined'){
						window.location.href = data.url;//网址跳转
					}
				}, time);
			} else {
				commonJS.prompt(data.msg,time);//错误消息
			}
		},
		error: function(e) { 
			commonJS.prompt('网络错误,请重试!');
		}
	});
}



//表单异步提交
function AjaxForThing(url , data , async) {
    if (async == undefined) {
        async = false;
    }

    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        beforeSubmit: commonJS.pageload(),//页面loding。..
        async: async,
        success: function (data) {
            console.log(data);
            commonJS.unpageload();
            if (data == '' || data == null) {
                commonJS.prompt('网络错误,请稍后再重试!');//错误消息
                return;
            }
            var time = data.time ? data.time : 3000;
            if (data.ret == 0) {
                commonJS.prompt(data.msg, time);//正确的消息
                setTimeout(function () {
                    if (typeof (data.url) != 'undefined') {
                        window.location.href = data.url;//网址跳转
                    }
                }, time);
            } else {
                commonJS.prompt(data.msg, time);//错误消息
            }
        },
        error: function (e) {
            commonJS.prompt('网络错误,请重试!');
        }
    });
}


/**
 * 管理操作信息,不弹出对话确认框
 * @param url
 */
//请求ajax
function getAjax(url){
	$.ajax({
		url:url , 
		type:"GET" , 
		dataType:'json',
		beforeSubmit:commonJS.pageload(),//页面loding。..
		async:false,//false为同步执行,未返回时不进行其他操作
		success:function(data) {
			commonJS.unpageload();
			if (data.status == 1) {
				commonJS.prompt(data.message);//正确的消息
				setTimeout(function () {
					if(typeof(data.url)!='undefined'){
						window.location.href = data.url;//网址跳转
					}
				}, 3000);
			} else {
				commonJS.prompt(data.message);//错误消息
			}
		},
		error: function(e) { 
			commonJS.prompt('网络错误,请重试!');
		}
	});
}

//commonJS.mobileMeta();

$(function () {
    //处理版权居于页面底部
    var windowHeight = $(window).height();
    var documentHeight = $('#docBox').height();
    if (documentHeight != null) {
        if (documentHeight < windowHeight) {
            var differHeight = windowHeight - documentHeight;
            descHeight = $('.g-content').height();
            descHeight += differHeight;
            $('.g-content').height(descHeight);
        }
    }
   
});
function AjaxReturnPage(url , data ) {
    $.ajax({
    url: url,
    type: 'post',
    data: data,
    dataType: 'json',
    async: true,
    success: function (data) {
        if ( data !=null && data.ret == 0 ) {
        	console.log("consolelog here");

                if (typeof (data.url) != 'undefined') {
                    window.location.href = data.url;//网址跳转
                }else{
                	window.location.href = 'index';
                }
        }
    }
});
}


function GetVerifCode(url, data, async) {
    if (async == undefined) {
        async = false;
    }

    $.ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        beforeSubmit: commonJS.pageload(),//页面loding。..
        async: async,
        success: function (data) {
            console.log(data);
            commonJS.unpageload();
            if (data == '' || data == null) {
                commonJS.prompt('网络错误,请稍后再重试!');//错误消息
                return;
            }
            var time = data.time ? data.time : 3000;
            if (data.ret == 0) {
                commonJS.prompt(data.msg, time);//正确的消息
                console.log("test countdown come in");
                testcountdown();
            } else if (data.ret == 2) {
                commonJS.prompt(data.msg, time);
                $(".resend").html("重新获取");
                $(".resend").removeClass("a-disable");
                $(".resend").addClass("bcolor");
            }
            else {
                commonJS.prompt(data.msg, time);//错误消息
            }
        },
        error: function (e) {
            commonJS.prompt('网络错误,请重试!');
        }
    });
}

function formatPrice(pricestring) {
	var priceString = (pricestring && typeof(pricestring)!="string"?pricestring+"":pricestring) ||"0";
    var price = priceString.match(/\d+(\.\d+)?/)[0];
    return parseFloat(price);
}
