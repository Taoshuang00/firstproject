/**
 * Created by ts on 2018/1/16 0016.
 */
$(function () {
   var id = getSearch("id");

    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{
            id:id
        },
        success:function (info) {
            var arr = info.size.split("-");
            var sizeArr = [];
            for(var i = +arr[0]; i <= arr[1]; i++) {
                sizeArr.push(i);
            }
            info.sizeArr = sizeArr;
            console.log(info);
            $('.mui-scroll').html(template('tpl',info));
            //初始化轮播图
            mui(".mui-slider").slider({
                interval:1000
            });

            //mui('.lt_num').numbox()
            //重新初始化数字框
            mui(".mui-numbox").numbox();
        }
    })


});