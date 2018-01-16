/**
 * Created by ts on 2018/1/14 0014.
 */
;(function () {
    var page= 1;
    var pageSize = 5;
    var imgArr = [];
    var form = $('form');
    render();
    function render() {
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function (info) {
                //console.log(info);
                $("tbody").html(template("tpl-pdc",info));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3 ,
                    currentPage : page,
                    totalPages : Math.ceil(info.total/info.size),
                    size:"normal",
                    itemTexts:function (type,page,current) {
                        switch (type){
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "page":
                                return page;

                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        //根据type的不同，返回不同的字符串
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "尾页";
                            case "page":
                                return "去第" + page + "页";
                        }
                    },
                    useBootstrapTooltip:true,
                    onPageClicked:function (a,b,c,p) {
                        page = p;
                        render();
                    }
                })
            }
        })
    }
    $(".btn-add").on('click',function () {
        $('#addModal').modal('show');
        $.ajax({
            type:"get",
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize: 100
            },
            success:function (info) {
                $('.dropdown-menu').html(template('tpl-menu',info))
                //console.log(info);
            }
        })
    })

    $('.dropdown-menu').on('click','a',function () {
        //console.log(11);
        $('.dropdown button').text($(this).text());
        var id = $(this).data('id');
        $('[name="brandId"]').val(id)
        form.data('bootstrapValidator').updateStatus('brandId','VALID')
    })

    $('#fileUpload').fileupload({
        dataType:'json',
        done:function (e,data) {
            console.log(data);
            var result = data.result;
            if(imgArr.length >= 3){
                return ;
            }
            $('.img-box').append("<img height ='100' src="+result.picAddr +">")
            imgArr.push(result);

            if(imgArr.length == 3){
                form.data('bootstrapValidator').updateStatus('brandLogo','VALID')
            }else {
                form.data('bootstrapValidator').updateStatus('brandLogo','INVALID')
            }
        }
    })


    form.bootstrapValidator({
        excluded :[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            brandId:{
                validators:{
                    notEmpty:{
                        message:'请选择二级菜单'
                    }
                }
            },
            proName:{
                validators:{
                    notEmpty:{
                        message:'请添加商品名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请添加商品描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请添加商品库存'
                    },
                    regexp:{
                        regexp:/^[1-9]\d*$/,
                        message:'请输入合法库存'
                    }
                }
            },
            size:{
                validators:{
                    notEmpty:{
                        message:'请添写尺码，如34-46'
                    },
                    regexp:{
                        regexp:/^\d{2}-\d{2}$/,
                        message:'请输入合法尺码'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入原价'
                    }

                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入现价'
                    }

                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传三张图片'
                    }

                }
            },

        }

    })

    form.on('success.form.bv',function (e) {
        var param = form.serialize();
        console.log(param);
        param += "&picName1="+imgArr[0].picName +"&picAddr1="+imgArr[0].picAddr;
        param += "&picName1="+imgArr[1].picName +"&picAddr1="+imgArr[1].picAddr;
        param += "&picName1="+imgArr[2].picName +"&picAddr1="+imgArr[2].picAddr;

        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:param,
            success:function (info) {

                if(info.success){
                    $('#addModal').modal('hide');
                    form.data('bootstrapValidator').resetForm(true);
                    $('.dropdown button').text('请输入二级菜单');
                    $('.img-box img').remove()
                    imgArr = [];
                    render()
                }

            }

        })
    })

})();