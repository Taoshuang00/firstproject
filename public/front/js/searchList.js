/**
 * Created by ts on 2018/1/16 0016.
 */
$(function () {


    $(".search-text").val(getSearch("key"));
    render();
    function render() {
        var proName= $('.search-text').val();
        var type = $('.lt_title a.now').data('type');
        var value =  $('.lt_title a.now span').hasClass("fa-angle-down")? 2:1;
        var param = {
            page:1,
            pageSize: 100,
            proName:proName,
        };
        param[type] = value;
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:param,
            success:function (info) {
                console.log(info);
                $('.lt_product').html(template('tpl',info))
            }
        })
    }

    //价格顺序
    $(".lt_title > a[data-type]").on('click',function () {
        if($(this).hasClass('now')){
            $(this).find('span').toggleClass("fa-angle-down").toggleClass("fa-angle-up")
        }else {
            $(this).addClass('now').siblings().removeClass('now');
            $('.lt_title span').removeClass('fa-angle-up').addClass('fa-angle-down')
        };

        render()
    })
    //搜索
    $(".search-btn").on('click',function () {
        render()
    })
});