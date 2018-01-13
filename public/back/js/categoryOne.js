
/**
 * Created by ts on 2018/1/13 0013.
 */
;(function () {
    var page = 1;
    var pageSize = 5;
    render();
    function render() {
        $.ajax({
            type:'post',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page
            },
            success:function (info) {

            }
        })
    }
})();