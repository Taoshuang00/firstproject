/**
 * Created by ts on 2018/1/13 0013.
 */
;(function () {
    var page = 1;
    var pageSize = 5;
    var form =$('form');
    render();
    function render() {
        $.ajax({
            type:'get',
            url:"/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
                console.log(info);
                $('tbody').html(template('tpl-category',info));

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    numberOfPages :pageSize,
                    onPageClicked:function (a,b,c,p) {
                        page = p;
                        render();

                    }
                })
            }
        })

    }

    $('.btn-add').on('click',function () {
        $("#addModal").modal('show');

        $.ajax({
            type:'get',
            url:"/category/queryTopCategoryPaging",
            data:{
                page:page,
                pageSize:100
            },
            success:function (info) {
                console.log(info);
                $(".dropdown-menu").html(template("tpl-menu",info))
            }
        })


    })

    $('.dropdown-menu').on('click','a',function () {

        $('.dropdown button').text($(this).text());
        var id= $(this).data('id');
        $('#categoryId').val(id);
        form.data('bootstrapValidator').updateStatus('categoryId','VALID')
    })
    $('#fileupload').fileupload({
        dataType:'json',

        done:function (e,data) {
            //console.log(data);
            var result = data.result.picAddr;
            //console.log(result);
            $('.img-show').attr('src', '../../../' +result);
            $('#brandLogo').val(result);
            form.data('bootstrapValidator').updateStatus('brandLogo','VALID')
        }
    })


    form.bootstrapValidator({
        excluded:[],
        //配置校验时显示的图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            brandName:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请输入品牌的名称"
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传品牌的图片"
                    }
                }

            }
        }
    })

    form.on('success.form.bv',function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:form.serialize(),
            success:function (info) {
                if(info.success){
                    page = 1;
                    render();
                    $('#addModal').modal('hide');
                    $('.img-show').attr('src','images/none.png')
                    form.data('bootstrapValidator').resetForm(true)
                }
            }
        })
    })

})();