/**
 * Created by ts on 2018/1/13 0013.
 */
;(function () {
    var page = 1;
    var pageSize = 5;

    render();
    function render() {
        $.ajax({
            type:"get",
            url: '/user/queryUser',
            data:{
                page: page,
                pageSize : pageSize
            },
            success:function (info) {
                console.log(info);
                //console.log($('table'));
                $('tbody').html(template('tpl',info));

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total/info.size),
                    numberOfPages: pageSize,
                    onPageClicked:function (a,b,c,p) {
                        page= p;
                        render();
                    }
                });

            }
        });
    };

    $('table').on('click','.btn',function () {
        $('#btnModal').modal('show');
        var id = $(this).parent().data("id");
        var isDelete= $(this).hasClass('btn-success') ? "1": "0";
        console.log(isDelete);
        $(".btn-isDelete").off().on('click',function () {
            $.ajax({
                type:"post",
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete,
                },
                success:function (info) {
                    if(info.success){
                        $('#btnModal').modal('hide');
                        render();
                    }
                }
            })
        })
    })
})();