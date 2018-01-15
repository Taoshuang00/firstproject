/**
 * Created by ts on 2018/1/15 0015.
 */
;$(function () {
    $.ajax({
        type:"get",
        url:'/category/queryTopCategory',
        success:function (info) {
            console.log(info);
            $('.leftUl').html(template('tpl-cate',info))
            renderSec(info.rows[0].id)
        }
    })

    function renderSec(id) {
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{id :id},
            success:function (info) {
                console.log(info);
                console.log(template('tpl-right', info));
                $('.rightUl').html(template('tpl-right',info))
            }
        })
    }

    $('.leftUl ').on('click','li',function () {
        var id = $(this).data('id');
        console.log(id);
        renderSec(id);
    })
});