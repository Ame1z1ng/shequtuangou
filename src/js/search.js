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
            alert('添加微信"nszdppx1234"询问解决方法')
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
    $('#topIndex').click(function(){
        location.href='./sqtg.html'
    })
    // 给搜索按钮绑定点击事件
    $('#searchBtn').click(function () {
        // 如果搜索栏为空不可以搜索
        if ($('#searchIpt').val() == '') {
            alert('请输入关键字再搜索')
            return
        }
        location.href = `./search.html?key=${$('#searchIpt').val()}`
    })
    $('#searchText').html(GetQueryString('key'));
    let num = 0
    // 向数据库发送请求 查找有关键字的信息
    let str = ``;
    render();
    
    
// 首先判断是否地址栏是否有first 有的话就搜索这个没有的话判断是否有second，没有的话才去看地址栏有没有key，并且拿这个关键字去搜索
    function render() {
        if(GetQueryString('first')!=null){
            $.ajax({
                url: '../api/firstsearch.php',
                method: 'get',
                dataType: 'json',
                async: false,
                data: {
                    // key是地址栏获取的关键字
                    first: GetQueryString('first'),
                    num: num
                },
                success: function (res) {
                    drawing(res);
                },
                error: function (err) {
                    console.log(err);
                    alert('没有找到商品信息哦！')
                }
            })
        }else if(GetQueryString('second')!=null){
            $.ajax({
            url: '../api/secondsearch.php',
            method: 'get',
            dataType: 'json',
            async: false,
            data: {
                // key是地址栏获取的关键字
                second: GetQueryString('second'),
                num: num
            },
            success: function (res) {
                drawing(res);

            },
            error: function (err) {
                console.log(err);
                alert('没有找到商品信息哦！')
            }
        })
        }else{
            $.ajax({
                url: '../api/search.php',
                method: 'get',
                dataType: 'json',
                async: false,
                data: {
                    // key是地址栏获取的关键字
                    key: GetQueryString('key'),
                    num: num
                },
                success: function (res) {
                    drawing(res);
    
                },
                error: function (err) {
                    console.log(err);
                    alert('没有找到商品信息哦！')
                }
            })
        }
        
        
    }

    // 调用ajax之后的遍历数组渲染数据操作
    function drawing(res){
        // 渲染查找到多少条数据
        $('#searchAllnums').html(res.length)
        // 循环遍历数组渲染数据
        res.forEach(function (item) {
            str += `<div class="searchReslist" sid=${item.id}>
            <div class="searchReslistsimg" style="background-image: url(${item.img});">
            </div>
            <div class="searchReslists_msg">
                ${item.name}
            </div>
            <div class="searchReslists_price">
                ${item.marketprice}
            </div>
        </div>`
        })
        $('#searchReslists').html(str);
        $('.searchReslist').click(function () {
            location.href = `./detailpage.html?goods_id=${$(this).attr('sid')}`
        })
    }

    // 页面滚动条滚动至底部时加载更多事件
    let flag = true;
    $(window).scroll(function () {
        if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
            if (flag) {
                console.log(1);
                flag = false;
                num += 20;
                render();
                flag = true
            }

        }

    });























    // 声明一个用于获取地址栏信息的函数
    function GetQueryString(name) {

        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = decodeURIComponent(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

});