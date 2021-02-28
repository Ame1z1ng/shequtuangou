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
        // alert('请先登录');
        // location.href = "./register.html";
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
        $('.header_help').click(function () {
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
        // 点击加入购物车会提示登录
        $('#shopcarnum_right button').click(function(){
            pleaselogin();
            return
        })
        // 点击收藏会提示登陆
        $('#contain_left span').click(function(){
            pleaselogin();
            return
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
    console.log(GetQueryString('goods_id'));

    $.ajax({
        url: '../api/getgoods.php',
        method: 'get',
        dataType: 'json',
        data: {
            gid: GetQueryString('goods_id')
        },
        success: function (res) {
            console.log(res);
            // 把图片渲染上去
            $('#contain_left img').prop('src', res.img);
            // 渲染商品名字
            $('#goodsName').html(res.name);
            // 渲染市场价格
            $('#mp del').html(res.marketprice);
            // 渲染价格
            $('#price span').html(res.price);
            isFavorite();
        },
        error: function (err) {
            console.log(err);
        }
    })
    // 判断这个商品有没有被收藏


    function isFavorite() {
        $.ajax({
            url: '../api/getgoodsinfavorite.php',
            method: 'get',
            dataType: 'json',
            data: {
                uid: $('#username').attr('uid'),
                gid: GetQueryString('goods_id')
            },
            success: function (res) {
                console.log(res);
                if (res[0]==null) {

                    $('#contain_left span').css({
                        'color': "#999999",
                        'border': "3px solid #999999"
                    }).attr('f', '0').removeAttr('fid').html('点击收藏商品');
                } else{
                    $('#contain_left span').css({
                        'color': 'red',
                        'border': '3px solid red'
                    }).attr({
                        'f': '1',
                        'fid': res[0].id
                    }).html('已收藏');
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }




    // 给收藏加一个点击事件
    $('#contain_left span').click(function () {
        // 如果收藏按钮上面的f属性为1代表已经被收藏
        // 此时就取消收藏
        if ($('#contain_left span').attr('f') == 1) {

            $('#contain_left span').css({
                color: "#999999",
                border: "3px solid #999999"
            }).attr('f', '0').html('点击收藏商品');
            // 去收藏表中删除这条数据
            $.ajax({
                url: '../api/delMyfavorite.php',
                method: 'get',
                dataType: 'json',
                data: {
                    fid: $('#contain_left span').attr('fid')
                },
                success: function (res) {
                    console.log(res);
                    $('#contain_left span').removeAttr('fid')
                },
                error: function (err) {
                    console.log(err);
                }
            })
        } else if ($('#contain_left span').attr('f') == 0) {
            // 此时代表这个商品没有被收藏，需要把这个商品收藏
            $('#contain_left span').css({
                color: '#red',
                border: '3px solid #red'
            }).attr('f', '1').html('已收藏');
            // 去收藏表中增加这条数据
            $.ajax({
                url: '../api/addfavorite.php',
                method: 'get',
                dataType: 'json',
                data: {
                    fid: GetQueryString('goods_id'),
                    uid: $('#username').attr('uid'),
                    listpic: $('#contain_left img').prop('src'),
                    listdescribe: $('#goodsName').html()
                },
                success: function (res) {
                    console.log(res);
                    isFavorite();
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }
    })


    // 加入购物车的点击事件
    $('#shopcarnum_right button').click(function () {
        $.ajax({
            url: '../api/addShopcar.php',
            method: 'get',
            dataType: 'json',
            data: {
                uid: $('#username').attr('uid'),
                fid: GetQueryString('goods_id'),
                goods_num: $('#shopcarnum_left input').val(),
                listname: $('#goodsName').html(),
                listpic: $('#contain_left img').prop('src'),
                price: $('#price span').html(),
                marketprice: $('#mp del').html()
            },
            success: function (res) {
                console.log(res);
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


            },
            error: function (err) {
                console.log(err);
            }
        })
    })























    // 声明一个用于获取地址栏信息的函数
    function GetQueryString(name) {

        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = decodeURIComponent(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }



});