$(function () {
    // 当有一个为login的cookie时代表登录成功
    // 把用户名显示在之前点击登录注册的位置
    let login = getCookie('login');
    // 如果login存在，就在左上角显示用户名
    if (login) {
        let username = getCookie('username');
        let uid = getCookie('uid');
        $('#username').css('display', 'block').html(username).attr('uid', uid);
        $('#exit').css('display', 'block');
        $('#login').css('display', 'none');
        $('.header_myid').click(function () {
            location.href = `./account.html?msg=myid`;
        });
        $('.header_myshopcar').click(function () {
            location.href = `./shopcar.html`;
        });
        $('.header_myorder').click(function () {
            location.href = `./account.html?msg=myorder`;
        });
        $('.header_help').click(function () {
            alert('添加微信"nszdppx1234"询问问题')
        });
        // 点击我的会跳转到我的账户界面
        $('#me').click(function () {
            location.href = "./account.html?msg=myorder"
        })
        // 点击购物车会跳到购物车
        $('#shopcargo').click(function () {
            location.href = "./shopcar.html"
        })
        // 点击收藏会显示收藏
        $('#favoritego').click(function () {
            location.href = "./account.html?msg=myfavorite"
        })
        // 点击id会跳转到我的账户界面
        $('#username').click(function () {
            location.href = "./account.html?msg=myid"
        })

    } else {
        // 如果login不存在 显示登录注册提示
        $('#username').css('display', 'none');
        $('#login').css('display', 'block');
        $('#exit').css('display', 'none');
        // 如果login不存在那么在点击我的账户、我的订单和我的购物车的时候都会进到登录注册页面
        // 给我的账户、我的购物车、我的订单绑定点击事件
        $('.header_myid').click(function () {
            // 这是一个用于提示登录的函数
            pleaselogin()
        });
        $('.header_myshopcar').click(function () {
            pleaselogin()
        });
        $('.header_myorder').click(function () {
            pleaselogin()
        });
        // 点击我的会提示登录
        $('#me').click(function () {
            pleaselogin()
        })
        // 点击购物车会提示登录
        $('#shopcargo').click(function () {
            pleaselogin()
        })
        // 点击收藏会提示登录
        $('#favoritego').click(function () {
            pleaselogin()
        })
        // 点击id会提示登录
        $('#username').click(function () {
            pleaselogin();
        })
        $('#myShopcar').click(function(){
            pleaselogin();
        })

        // 声明一个函数用于提示登录
        function pleaselogin() {
            alert('请先登录');
            location.href = "./register.html";
        }
    }
    // 退出登录按钮的点击事件
    $('#exit').click(function () {
        // 弹窗询问是否退出登录
        if (confirm('确认退出登录吗')) {
            // document.cookie=`login1=1;`
            setCookie('login', '', '-1');
            setCookie('username', '', '-1');
            setCookie('uid', '', '-1');
            $('#username').removeAttr('uid');
            location.reload();
        }
    });
    // 给搜索按钮绑定点击事件
    $('#searchBtn').click(function () {
        // 如果搜索栏为空不可以搜索
        if ($('#searchIpt').val() == '') {
            alert('请输入关键字再搜索')
            return
        }
        location.href = `./search.html?key=${$('#searchIpt').val()}`
    })
    // 给我的购物车绑定点击跳转事件
    $('#myShopcar').click(function () {
        location.href = "./shopcar.html"
    })



    // 获取购物车数目
    $.ajax({
        url: '../api/getShopcar.php',
        method: 'get',
        dataType: 'json',
        data: {
            uid: $('#username').attr('uid')
        },
        success: function (res) {
            $('#listNum').html(res.length);
        },
        error: function (err) {
            console.log(err);
        }
    })
    // 获取列表分类
    $.ajax({
        url: '../api/getnav.php',
        method: 'get',
        dataType: 'json',
        data: {
            pid: 0
        },
        success: function (res) {
            let str = ``;
            res.forEach(function (item) {
                str += `<li uid='${item.id}'>${item.name}</li>`
            })
            $('.nav_content ul').html(str);
            $('.nav_content ul li').click(function(){
                location.href=`./search.html?first=${$(this).attr('uid')}`
            })
            $('.nav_content ul li').mouseenter(function () {
                $('#navContent').css('display', 'block');
                let thisli=$(this);
                $.ajax({
                    url: '../api/getnav.php',
                    method: 'get',
                    dataType: 'json',
                    data: {
                        pid:thisli.attr('uid')
                    },
                    success: function (res) {
                        let str=``;
                        res.forEach(function(item){
                            str+=`<span uid='${item.id}'>${item.name}</span>`
                        })
                        $('#navContent').html(str);
                        $('#navContent span').click(function(){
                            location.href=`./search.html?second=${$(this).attr('uid')}`
                        })
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            })
            $('.nav_content').mouseleave(function () {
                $('#navContent').css('display', 'none')
            })
            $('#navContent').mouseleave(function () {
                $('#navContent').css('display', 'none')
            })
        },
        error: function (err) {
            console.log(err);
        }
    })


    // 获取今日推荐
    $.ajax({
        url: '../api/getindexgoods.php',
        method: 'get',
        dataType: 'json',
        data: {
            cate: 1
        },
        success: function (res) {
            let str = ``;
            res.forEach(function (item) {
                str += `<div class="list_list vegetableslist" sid="${item.id}">
                <div class="list_img vegetableslistimg" style="background-image: url(${item.img});">
                </div>
                <div class="list_msg vegetableslist_msg">
                    ${item.name}
                </div>
                <div class="list_price vegetableslist_price">
                    ${item.price}
                </div>
            </div>`
                $('.vegetableslists').html(str)
            })
            $('.vegetableslist').click(function () {
                location.href = `./detailpage.html?goods_id=${$(this).attr('sid')}`
            })
        },
        error: function (err) {
            console.log(err);
        }
    })
    $.ajax({
        url: '../api/getindexgoods.php',
        method: 'get',
        dataType: 'json',
        data: {
            cate: 2
        },
        success: function (res) {
            let str = ``;
            res.forEach(function (item) {
                str += `<div class="list_list drinkfoodlist">
                <div class="list_img drinkfoodlistimg" style="background-image: url(${item.img});">
                </div>
                <div class="list_msg drinkfoodlist_msg">
                ${item.name}
                </div>
                <div class="list_price drinkfoodlist_price">
                ${item.price}
                </div>
            </div>
        `
                $('.drinkfoodlists').html(str)
            })
            $('.drinkfoodlist').click(function () {
                location.href = `./detailpage.html?goods_id=${$(this).attr('sid')}`
            })
        },
        error: function (err) {
            console.log(err);
        }
    })


});