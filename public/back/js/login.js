;(function () {
    var form = $('form');

   form.bootstrapValidator({
       feedbackIcons: {
           valid: 'glyphicon glyphicon-ok',
           invalid: 'glyphicon glyphicon-remove',
           validating: 'glyphicon glyphicon-refresh'
       },
        fields:{
            username:{
                //不能为空
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    callback:{
                        message: "用户名不存在"
                    }
                }

            },
            password:{
              validators:{
                  notEmpty:{
                      message:"密码不为空"
                  },
                  stringLength:{
                      min :6,
                      max:20,
                      message: '密码长度为6-20字符'
                  },
                  callback:{
                      message:"密码错误"
                  }

              }
            }
        }
    })

    form.on('success.form.bv',function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"employee/employeeLogin",
            data: form.serialize(),
            success:function (info) {
                if(info.success){
                    location.href = "index.html";
                }

                if(info.error === 1000){
                    form.data('bootstrapValidator').updateStatus("username","INVALIN","callback")
                }
                if(info.error === 1001){
                    form.data('bootstrapValidator').updateStatus("password","INVALID",'callback');
                }
            }
        })
    })

})();