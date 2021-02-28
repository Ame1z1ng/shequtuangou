// 当页面所有静态元素加载完毕之后执行下面的代码
$(function () {
    $('#backindex').click(function(){
        location.href=`./sqtg.html`
    })
    // 声明一个对象用于接收用户名和密码框的验证结果
    let obj = {};
    // 给用户名区域绑定一个失去焦点事件
    $('#username').blur(function () {

        // 当用户名输入框为空时，提示不能为空
        if ($('#username').val() == '') {
            // 将隐藏的提示信息的display改为block
            $('#falseUsn').css('display', 'block');
            // 改变下面元素的margin-top值让元素布局不发生变化
            $('#password').css('marginTop', '9.2px');
            return
        } else {
            // 如果输入框内有值就不会显示隐藏的信息
            $('#falseUsn').css('display', 'none');

            $('#password').css('marginTop', '30px');
        }
        // 用户名正则验证 两个字符到11个字符 只能以字母或者汉字开头
        let reg = /^[a-z\u4e00-\u9fa5][0-9A-Za-z\u4e00-\u9fa5]{1,11}$/;
        if (!reg.test($('#username').val())) {
            obj.usnText = false;
            alert('用户名格式错误(只能以字母或者汉字开头的2到11个字符)')
        } else {
            obj.usnText = true
        }
        objText();

    })
    // 给密码区域绑定一个失去焦点事件
    $('#password').blur(function () {
        // 当密码输入框为空时，提示不能为空
        if ($('#password').val() == '') {
            // 将隐藏的提示信息的display改为block
            $('#falsePsw').css('display', 'block');
            // 改变下面元素的margin-top值让元素布局不发生变化
            $('#agreement').css('marginTop', '9.2px');
            return
        } else {
            // 如果输入框内有值就不会显示隐藏的信息
            $('#falsePsw').css('display', 'none')
            $('#agreement').css('marginTop', '30px');
        }
        // 密码的正则   6到18位由字母或者数字
        let reg = /^[a-zA-Z0-9_-]{6,18}$/;
        if (!reg.test($('#password').val())) {
            obj.pswText = false;
            alert('密码格式错误(6到18位数字或者字母)')
        } else {
            obj.pswText = true
        }
        objText();

    })
    // 给多选按钮一个点击事件
    $('#ckb').click(function () {
        if ($(this).prop('checked') == true) {
            obj.ckbText = true;
        } else {
            obj.ckbText = false;
        }
        objText();
    })


    // 封装一个用于判断的函数，当用户名和密码的格式都正确且多选按钮被选中时，下面的登录按钮可以被点击
    function objText() {
        if (obj.usnText == true && obj.pswText == true && obj.ckbText == true) {
            $('#btn').prop('disabled', '');
            $('#btn').css('backgroundColor', '#4caf50')
        } else {
            $('#btn').prop('disabled', true);
            $('#btn').css('backgroundColor', '#b2eeb4')
        }
    }
    // 登录按钮绑定点击事件
    $('#btn').click(function () {

        $.ajax({
            url: '../api/login.php',
            method: 'post',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            },
            success: function () {
                // 登录成功时候跳转首页
                // 在login.php中写了两个七天的cookie
                // 一个是验证登录的，一个是用户名
                let log = getCookie('login');
                if (log) {
                    alert('登录成功');
                    location.href = './sqtg.html';
                } else {
                    alert('用户名或者密码错误')
                }

            },
            error: function (err) {
                console.log(err);
            }
        })

    })

    // 当点击免费注册时，弹出注册页面
    // 给免费注册绑定一个点击事件
    $('#zhuce').click(function () {
        $('#signin').fadeIn('fast');

    })

    // 当点击除注册页面内容外的部位时，注册页面隐藏，信息不会消失
    $('#signin').click(function (e) {
        // 当点击的元素的id为signin时，也就是说点击遮罩层时注册页面消失
        if (e.target.id == 'signin') {
            $('#signin').fadeOut('fast');
        }
    })
    // 给注册页面验证正则
    // 声明一个对象验证注册所需条件是否满足
    let robj = {};
    // 用户名输入框的焦点失去事件
    $('#usnipt').on('input propertychange', function () {
        // 当用户名为空时显示提示信息
        if ($('#usnipt').val() == '') {
            $('#usntip').css('display', 'block').html('用户名不能为空');
            robj.usnText = false;
            return
        }
        // 用户名的正则验证
        let reg = /^[a-z\u4e00-\u9fa5][0-9A-Za-z\u4e00-\u9fa5]{1,11}$/;
        if (!reg.test($('#usnipt').val())) {
            robj.usnText = false;
            $('#usntip').css('display', 'block').html('用户名格式错误');
        } else {
            $('#usntip').css('display', 'none');
            robj.usnText = true;
        }
        robjText();

    });
    // 密码输入框的焦点失去事件
    $('#pswipt').on('input propertychange', function () {
        if ($('#pswipt').val() == '') {
            $('#pswtip').css('display', 'block').html('密码不能为空');
            robj.pswText = false;
            return
        }
        // 密码的正则验证
        let reg = /^[a-zA-Z0-9_-]{6,18}$/;
        if (!reg.test($('#pswipt').val())) {
            robj.pswText = false;
            $('#pswtip').css('display', 'block').html('密码格式错误');
        } else {
            $('#pswtip').css('display', 'none');
            robj.pswText = true;
        }
        robjText();

    });
    // 确认密码框的失去焦点事件
    $('#agrpswipt').on('input propertychange', function () {
        if ($('#pswipt').val() == '') {
            $('#agrpswtip').css('display', 'block').html('请先输入密码');
            robj.agrpswText = false;
            return
        } else if (!($('#pswipt').val() == $('#agrpswipt').val())) {
            $('#agrpswtip').css('display', 'block').html('与上一次输入密码不一致，请确认');
            robj.agrpswText = false;
        } else {
            $('#agrpswtip').css('display', 'none');
            robj.agrpswText = true;
        }
        robjText();
    });
    // 给服务协议加一个点击事件
    $('#ckbipt').click(function () {
        if (!($('#ckbipt').prop('checked'))) {
            robj.ckbText = false;
        } else {
            robj.ckbText = true;
        }
        robjText();
    })

    function robjText() {
        if (robj.usnText == true && robj.pswText == true && robj.agrpswText == true && robj.ckbText == true) {
            $('#signinAreaFooter_register').prop('disabled', '').css('backgroundColor', '#4caf50');
        } else {
            $('#signinAreaFooter_register').prop('disabled', 'true').css('backgroundColor', '#b2eeb4')
        }
    }

    // 点击去登录按钮注册页面消失
    $('#signinAreaFooter_login').click(function () {
        $('#signin').fadeOut('fast');
    })

    // 给立即注册按钮绑定点击事件
    $('#signinAreaFooter_register').click(function () {
        $.ajax({
            url: '../api/register.php',
            method: 'post',
            data: {
                username: $('#usnipt').val(),
                password: $('#pswipt').val()
            },
            success: function (res) {
                alert(res);
                let suc = getCookie('success');
                if (suc) {
                    // 隐藏注册界面
                    $('#signin').fadeOut('fast');
                    // 初始化所有的输入框和多选按钮
                    $('#usnipt').val('');
                    $('#pswipt').val('');
                    $('#agrpswipt').val('');
                    $('#ckbipt').prop('checked','');
                    // 将下方的注册按钮也初始化
                    $('#signinAreaFooter_register').css('backgroundColor', '#b2eeb4').prop('disabled', 'true');
                    // 将robj里的所有属性的属性值都变为false
                    robj.usnText = false;
                    robj.pswText = false;
                    robj.agrpswText = false;
                    robj.ckbText = false;  
                }
            }
        })
    })





});