


var globalJson = {};
var secondEditOn = false;
var mainJson = {
    'pageId': '',
    'pageName': '',
    'title': '首页测试',
    'children' : [],
};


//初始化函数
function init() {

    showModule();
    showOtherModule();
    mainJson.pageId = createId();
    mainJson.pageName = 'test';
}
var createDivJson = function (divId ,  divName , title , children) {
    var returnJson = { 'divId': divId, 'divName': divName, 'title': title, 'children': children };
    return returnJson;
}
//初始化
init();


var imageUtil = function () {

}

//为每一个模块生成一个唯一的id 可以用来在内部跳转 id值需要一直传递下去
function createId() {
    return Math.random().toString(36).substr(2, 15);
}


var ModuleA = function (id , num) {
    var moduleHtml ,  moduleContent;
    //构造html然后返回这个html用来插进container里面
    var openTag = '<div class="banner" data-moduleId="'+ id +'">';
    var closeTag = '</ul></div></div>';
   
    moduleContent  = '<div class="slider">';
    moduleContent += '<ul class="flipsnap">';
    for (var index = 0 ; index < num ; index++) {
        moduleContent += '<li>@bannerimg</li>';
    }


    moduleHtml = openTag + moduleContent + closeTag;
    return moduleHtml;
}

var ModuleB = function (id, num) {
    var moduleHtml, moduleContent;
    //构造html然后返回这个html用来插进container里面
    var openTag = '<div class="nav" data-moduleId="' + id + '">';
    var closeTag = '</ul></div>';

    moduleContent = '<ul>';
    for (var index = 0 ; index < num ; index++) {
        moduleContent += '<li>@navcontent</li>';
    }

    moduleHtml = openTag + moduleContent + closeTag;
    return moduleHtml;
}

var ModuleC = function (id, num) {
    var moduleHtml, moduleContent;
    //构造html然后返回这个html用来插进container里面
    var openTag = '<div class="brands" data-moduleId="' + id + '">';
    var closeTag = '</ul></div>';

    moduleContent = '<ul>';
    for (var index = 0 ; index < num ; index++) {
        moduleContent += '<li>@brandimg</li>';
    }
    moduleHtml = openTag + moduleContent + closeTag;
    return moduleHtml;
}

var ModuleD = function (id, num) {
    var moduleHtml, moduleContent;
    //构造html然后返回这个html用来插进container里面
    var openTag = '<div class="hot-products" data-moduleId="' + id + '">';
    var closeTag = '</div></div>';

    moduleContent = '<div class="hot-floor">';


    moduleHtml = openTag + moduleContent + closeTag;
    return moduleHtml;
}


var SecondModule = function (id, type, num) {
    //这个id为模块id ，隐藏在这里面，用来关联已经添加的模块
    var hiddenId = '<div><input type="hidden" id="thisModuleId" value="' + id + '" / > </div>';
    var secondHtml, secondContent = '', content = '';
    var openTag = ' <div class="box-content"><div class="arrow"></div><div class="box-title">分模块</div>';
    openTag += hiddenId;
    openTag += '<div class="box-module"><div class="specific-box-item">模块名称<div><input type="text" /></div></div></div>';
    var closeTag = '<div class="box-button"><button class="add-second-module redBtn">添加</button><button class="grayBtn">取消</button></div></div>';

   
    switch (type) {
        case 'A':
            content = BulidCommonModule(id , HrefModule());
            break;
        case 'B':
            content = BulidCommonModule(id, ProductModule());
            break;
    }

    for (var index = 0 ; index < num ; index++) {
        secondContent += content + '';
    }
    secondHtml = openTag + secondContent + closeTag;

    

    //为第二层添加按钮添加绑定事件(这里会构建子模块的json数据)
    $('.add-second-module').on('click', function () {

        RenderModuleLayout()
    });
    return secondHtml;
}


var RenderModuleLayout = function (id, json, placeholder) {
    var parentModuleId = $('#thisModuleId').val();
    var findThisParent = $('div[data-module="' + parentModuleId + '"]');
    var findThisParentHtml = findThisParent.html();
    for (var jsonIndex = 0 ; jsonIndex < json.length ; jsonIndex++) {
        findThisParentHtml.replace(placeholder, json.value);
    }
    findThisParent.html(findThisParentHtml);

}

//var RenderModuleBLayout = function (id, json, placeholder) {
//    var parentModuleId = $('#thisModuleId').val();
//    var findThisParent = $('div[data-module="' + parentModuleId + '"]');
//    var findThisParentHtml = findThisParent.html();
//    for (var jsonIndex = 0 ; jsonIndex < json.length ; jsonIndex++) {
//        findThisParentHtml.replace(placeholder, json.value);
//    }
//    findThisParent.html(findThisParentHtml);

//}

//var RenderModuleCLayout = function (id, json, placeholder) {

//}


    var BulidCommonModule = function (id , otherHtml) {
        var commonModuleContent = '<div class="box-module">';
    
        commonModuleContent += '<div class="specific-box-item">请上传图片<div class="file-upload"><input type="file" class="upload-btn" />上传图片</div></div>';

        commonModuleContent += otherHtml;

        commonModuleContent += '</div>';

        return commonModuleContent;
    }

    var HrefModule = function () {
        var hrefHtmlModule = '';
        hrefHtmlModule += ' <div class="specific-box-item"><label><input type="radio" name="hrefRadio" />请选择一个内部链接</label>' +
                       '<div class="select-product"><select disabled="disabled"><option>第一个</option></select></div></div>';

        hrefHtmlModule += '<div class="specific-box-item"><label><input type="radio" name="hrefRadio" />请填写一个超链接</label><div><input type="text" /></div></div>';

        hrefHtmlModule += '<div class="specific-box-item">请填写一个布局格式(1:2:3)<div><input type="text" /></div></div>';

        return hrefHtmlModule;

    }

    var ProductModule = function () {
        var productHtmlModule = '';
        productHtmlModule += '<div class="specific-box-item"><label><input type="radio" name="hrefRadio" />请选择商品分组</label>' +
                        '<div class="select-product"><select disabled="disabled"><option>第一个</option></select></div></div>';

    
        productHtmlModule += '<div class="specific-box-item"><div>选用商品模板</div><label><input type="radio" name="productTemplate" />模板1</label><label><input type="radio" name="productTemplate" />模板2</label></div>';

        return productHtmlModule
    }


    //记得添加一个模块之后每个input要恢复到原始的状态

    function radioSelected() {

        $('input[name=hrefRadio]').change(function () {
            console.log($(this).closest('div').find('select'));
            $(this).closest('div').find('select').removeAttr('disabled');
        })
    }

    //点击+号按钮的时候显示添加模块信息
    function showModule() {
        var editon = false;
        $('.show-module').on('click', function () {
            if (secondEditOn) {
                alert('先完成当前模块的设置');
            } else {
                toggleAddPanel();
            }

        });

        function toggleAddPanel() {
            if (editon) {
                hideModuleA();
            } else {
                showModuleA();
            }
        }

        //显示第一层模块信息
        function showModuleA() {
            //计算距离顶部的高度
            var originTop = 60;
            var containerHeight = $('.template-container').height();
            console.log(containerHeight);
            $('#first-addmodule').css({ 'display': 'block', 'margin-top': getContainerHeight() });
            editon = true;
        }

        //隐藏第一层模块信息
        function hideModuleA() {
            $('#first-addmodule').css({ 'display': 'none' });
            editon = false;
        }
    }

    //点击添加按钮 来添加模块
    function showOtherModule() {
        $('.add-module').on('click', function () {
            var firstCheckedValue = $('input[name="moduleRadio"]:checked').val();

            var moduleId = createId();
        
            //将上面的字符串转化为字符数组来分割数量跟类型
            var ValueAndType = firstCheckedValue.match(/./g);

            var ModuleValue = ValueAndType[0];
            var ModuleType = ValueAndType[1];

            addModule(moduleId, ModuleType, ModuleValue);

            showModuleB(moduleId , ModuleType, ModuleValue);
        })
    }



    //根据第一层模块选择的信息来显示第二层信息
    function showModuleB(id, type, num) {
        //隐藏第一层模块
        $('.show-module').trigger('click');

        secondEditOn = true;
        //$('#first-addmodule').css({ 'display': 'none' });
        $('#second-addmodule').html(SecondModule(id , type, num));
        $('#second-addmodule').css({ 'display': 'block', 'margin-top': getContainerHeight() - 40 });

        //给单选框绑定事件
        radioSelected();
        //为添加按钮绑定事件
        addHtmlIntoModule();
    }


    function getContainerHeight() {
        var originTop = 60;
        var containerHeight = $('.template-container').height();
        return containerHeight - originTop;
    }


    function addModule(moduleId , moduleType, moduleValue) {
        var moduleContent;
        var insideNum = parseInt(moduleValue);
        switch (moduleType) {
            case 'A':
                moduleContent = ModuleA(moduleId , insideNum)
                break;

            case 'B':
                moduleContent = ModuleB(moduleId , insideNum)
                break;

            case 'C':
                moduleContent = ModuleC(moduleId , insideNum)
                break;
        }
        //console.log($('.layout:last-child'));
        $('.layout > div:last-child').after(moduleContent);

    }

    function addHtmlIntoModule() {
        $('.add-second-module').on('click', function () {
            secondEditOn = false;
            $('#second-addmodule').html(' ');
        });
    }


    function getFiles(e) {
        e.stopPropagation();
        e.preventDefault();
        //获取file input中的图片信息列表
        var files = e.target.files;
        console.log(files);
        //验证是否是图片文件的正则
        reg = /image\/.*/i;
        //for (var i = 0, f; f = files[i]; i++) {
        var f = files[0]
        var fileext = f.name.toLowerCase().match(/[^.]+$/);
        //commonJS.prompt(fileext , 10000);
        //把这个if判断去掉后，也能上传别的文件
        if (fileext != "jpg" && fileext != "gif" && fileext != "jpeg" && fileext != "png") {
            commonJS.prompt("该文件不是图片");
            return;
        }


        if ($("#imgBox li img").length >= 10) {
            commonJS.prompt("只能上传10张图片");
            return;
        }
        if (f.size > 4 * 1024 * 1024) {
            commonJS.prompt("上传图片不能大于4M");
            return;
        }

        var dataindex = imageIndex;
        imageIndex++;
        var formdata = new FormData();
        formdata.append("file", f);
        $.ajax({
            url: 'http://management.haituncun.com/image/upload',
            type: 'post',
            data: formdata,
            processData: false,  // 告诉jQuery不要去处理发送的数据
            contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
            success: function (data) {
                if (data == '' || data == null) {
                    commonJS.prompt('网络错误,请稍后再重试!');//错误消息
                    return;
                }
                var json = eval('(' + data + ')');
                if (json.status == 0 || json.status == "0") {
                    var url = dealImageUrl(json.msg, fileext);

                 
                } else {
                    commonJS.prompt("上传图片失败");//错误消息
                    $("li[data-index=" + dataindex + "]").remove();
                }
            },
            error: function (e) {
                commonJS.prompt('网络错误,请重试!');
            }
        });
    }