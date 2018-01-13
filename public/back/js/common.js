/**
 * Created by ts on 2018/1/11 0011.
 */
;(function () {

    NProgress.configure({showSpinner:false});
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done()
        },1000)
    })

    if(location.href.indexOf('login.html') == -1){

        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function (info) {
                 if(info.error == 400){
                    location.href = 'login.html';
                }
            }
        })
    }

    $('.category').on('click',function () {

        $('.list').slideToggle();
    })
    $('.icon-main').on('click',function () {
        $('.lt_aside').toggle('.toggle')
    })

    $('.icon-out').on('click',function () {
        $('#outModal').modal('show')
    })

    $('.btn-loginOut').on('click',function () {
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success:function (info) {
                if(info.success){
                    console.log(info.success);
                    //location.href = 'login.html';
                }
            }
        })
    })
})();