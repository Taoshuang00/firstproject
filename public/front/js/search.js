/**
 * Created by ts on 2018/1/16 0016.
 */
$(function () {

    //获取历史记录
    function getHistory() {
        //localStorage.setItem("lt_search_history",JSON.stringify(['a','b','v']))
        var history = localStorage.getItem("lt_search_history") || "[]";
        var arr = JSON.parse(history);
        return arr;
    }
    //读取历史记录

    function render() {
        var arr = getHistory();
        //console.log(arr);
        $(".lt_history").html(template('tpl',{arr:arr}))
    }
    render();

    //清空
    $('.btn_empty').on('click',function () {
        localStorage.removeItem('lt_search_history');
        render();
    });
    //删除
    $('.lt_history').on('click','.btn_delete',function () {
        var id = $(this).parent().data('id');
        var arr=getHistory();
        arr.splice(id,1);
        localStorage.setItem("lt_search_history",JSON.stringify(arr))
        render()
    });
    //添加
    $(".search-btn").on('click',function () {
        var key = $('.search-text').val().trim();
        $('.search-text').val('');
        var arr = getHistory();
        var index = arr.indexOf(key);
        if(index != -1){
            arr.splice(index,1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem("lt_search_history",JSON.stringify(arr))
        location.href= "searchList.html?key=" + key

    });


});