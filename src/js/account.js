$(function () {
    // 当有一个为login的cookie时代表登录成功
    // 把用户名显示在之前点击登录注册的位置
    let login = getCookie('login');
    let uid = getCookie('uid');
    // 如果login存在，就在左上角显示用户名
    if (login) {
        let username = getCookie('username');
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
        alert('请先登录');
        location.href = "./register.html";
        // 如果login不存在 显示登录注册提示
        $('#username').css('display', 'none');
        $('#login').css('display', 'block');
        $('#exit').css('display','none');
       
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
        if($('#searchIpt').val()==''){
            alert('请输入关键字再搜索')
            return
        }
        location.href = `./search.html?key=${$('#searchIpt').val()}`
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
    if(GetQueryString('msg')=='myid'){
        $('main').html(`<div>
            <h2 class="title_order">基本信息</h2>
            <div id="essentialInformation">
                <div class="userinfo">用户信息</div>
            </div>
            <div id="essentialContent">
                <div class="eClist">
                    <div class="eClist_left"><label for="ecname">用户名:</label></div>
                    <div class="eClist_right"><input type="text" name="ecname" id="ecname" readonly></div>
                </div>
                <div class="eClist">
                    <div class="eClist_left"><label for="ecsex">性别:</label></div>
                    <div class="eClist_right"><input type="radio" name="ecsex" style="margin-right: 5px;" checked>男<input type="radio" name="ecsex" style="margin-right: 5px; margin-left: 15px;">女</div>
                </div>
                <div class="eClist">
                    <div class="eClist_left"><label for="ectel">手机号:</label></div>
                    <div class="eClist_right"><input type="text" name="ectel" id="ectel"></div>
                </div>
                <div class="eClist">
                    <div class="eClist_left"><label for="ecaddress">地址:</label></div>
                    <div class="eClist_right"><input type="text" name="ecaddress" id="ecaddress"></div>
                </div>
                <div class="eClist">
                    <div class="eClist_left"></div>
                    <div class="eClist_right">
                        <button disabled>确认修改</button>
                    </div>
                </div>
            </div>
        </div>`)
            // 请求数据渲染页面
            $.ajax({
                url: '../api/userinfo.php',
                method: 'get',
                dataType: 'json',
                data: {
                    uid: $('#username').attr('uid')
                },
                success: function (res) {
                    console.log(res);
                    $('#ecname').val(res.username);
                    $('#ectel').val(res.tel);
                    $('#ecaddress').val(res.address);

                },
                error: function (err) {
                    console.log(err);
                }
            })
            let obj = {
                addressText: true,
                telText: true
            };
            // 给手机号输入框绑定失去焦点事件
            $('#ectel').blur(function () {
                // 当手机号输入框为空时，提示不能为空
                if ($('#ectel').val() == '') {
                    // 将隐藏的提示信息的display改为block
                    alert('手机号不能为空');
                    obj.telText = false;
                    changeuserinfoText();
                    return
                }
                let reg = /^1[3456789]\d{9}$/;
                if (!reg.test($('#ectel').val())) {
                    alert('手机号码格式错误');
                    obj.telText = false;
                } else {
                    obj.telText = true;
                }
                changeuserinfoText();
            })
            $('#ecaddress').blur(function () {
                // 当地址输入框为空时，提示不能为空
                if ($('#ecaddress').val() == '') {
                    // 将隐藏的提示信息的display改为block
                    alert('地址不能为空');
                    obj.addressText = false;
                    changeuserinfoText();
                    return
                } else {
                    obj.addressText = true;
                }
                changeuserinfoText();

            })

            function changeuserinfoText() {
                if (obj.telText == true && obj.addressText == true) {
                    $('.eClist_right button').prop('disabled', '').css('backgroundColor', '#4caf50');
                } else {
                    $('.eClist_right button').prop('disabled', 'true').css('backgroundColor', '#b2eeb4');
                }
            }
            changeuserinfoText();
            // 给修改信息按钮绑定点击事件
            $('.eClist_right button').click(function () {
                $.ajax({
                    url: '../api/changeTelAddress.php',
                    method: 'get',
                    dataType: 'json',
                    data: {
                        uid: $('#username').attr('uid'),
                        tel: $('#ectel').val(),
                        address: $('#ecaddress').val()
                    },
                    success: function (res) {
                        console.log(res);

                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            })


    }else if(GetQueryString('msg')=='myfavorite'){
        $('main').html(`<div>
            <h2 class="title_order">我的收藏</h2>
            <div id="favorite_title">
                            还没有收藏商品哦！去逛逛吧
                        </div>
            <div id="favorite">
                <div class="favorite_list">
                    
                </div>
            </div>
        </div>`)
            // 请求数据渲染页面，获取这个账号的收藏
            $.ajax({
                url: '../api/getMyfavorite.php',
                method: 'get',
                dataType: 'json',
                data: {
                    uid: $('#username').attr('uid'),
                },
                success: function (res) {
                    console.log(res);
                    if (res.length == 0) {
                        $('#favorite_title').css('display', 'block');
                        return
                    } else {
                        $('#favorite_title').css('display', 'none');
                    }
                    let favoritestr = ``;
                    res.forEach(function (item) {
                        favoritestr += `<div class="favorite_lists">
                            <div class="favorite_listsimg">
                                <img src="${item.listpic}" alt="">
                            </div>
                            <div class="favorite_listsmsg">
                                ${item.listdescribe}
                            </div>
                            <ul class="operatelist">
                                <li class="operalist_check" gid="${item.goods_id}">查看商品</li>
                                <li class="operalist_cancel" fid="${item.id}">取消收藏</li>
                            </ul>
                        </div>`
                    })
                    $('.favorite_list').html(favoritestr);
                    // 取消收藏按钮的点击事件
                    $('.operalist_cancel').click(function () {
                        // 链接数据库删除收藏表中id与这个取消收藏上fid属性相同的数据
                        $.ajax({
                            url: '../api/delMyfavorite.php',
                            method: 'get',
                            dataType: 'json',
                            data: {
                                fid: $(this).attr('fid'),
                            },
                            success: function (res) {
                                console.log(res);
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        })
                        $(this).parent().parent().remove();

                    })

                },
                error: function (err) {
                    console.log(err);
                }
            })
    }else {
        $('main').html(`<div>
            <h2 class="title_order">我的订单</h2>
            <div id="orderInformation">
                <div class="orderInformation_list">
                    <div class="orderInformation_lists">全部订单</div>
                    <div class="orderInformation_lists">待发货</div>
                    <div class="orderInformation_lists">待收货</div>
                    <div class="orderInformation_lists">已完成</div>
                    <div class="orderInformation_lists">已取消</div>
                </div>
                <div class="order_list">
                                还没有订单信息快去逛逛吧
                </div>
            </div>

        </div>`)
    }
    // 点击侧边导航栏时会实现选中特效
    $('.allist').click(function (e) {
        $('.allist').css({
            'border-right': 'none',
            'backgroundColor': '#fff',
            'color': '#000'
        })
        $(this).css({
            'border-right': '2px solid #4caf50',
            'backgroundColor': '#d5ebd6',
            'color': '#4caf50'
        })
        // 当点击的是我的订单时,向数据库请求我的订单数据并进行渲染
        if (e.target.classList.contains('account_myorder')) {
            $('main').html(`<div>
            <h2 class="title_order">我的订单</h2>
            <div id="orderInformation">
                <div class="orderInformation_list">
                    <div class="orderInformation_lists">全部订单</div>
                    <div class="orderInformation_lists">待发货</div>
                    <div class="orderInformation_lists">待收货</div>
                    <div class="orderInformation_lists">已完成</div>
                    <div class="orderInformation_lists">已取消</div>
                </div>
                <div class="order_list">
                                还没有订单信息快去逛逛吧
                </div>
            </div>

        </div>`)
        }
        // 当点击的是我的收藏时,向数据库请求数据并进行渲染
        else if (e.target.classList.contains('account_myfavorite')) {
            $('main').html(`<div>
            <h2 class="title_order">我的收藏</h2>
            <div id="favorite_title">
                            还没有收藏商品哦！去逛逛吧
                        </div>
            <div id="favorite">
                <div class="favorite_list">
                    
                </div>
            </div>
        </div>`)
            // 请求数据渲染页面，获取这个账号的收藏
            $.ajax({
                url: '../api/getMyfavorite.php',
                method: 'get',
                dataType: 'json',
                data: {
                    uid: $('#username').attr('uid'),
                },
                success: function (res) {
                    console.log(res);
                    if (res.length == 0) {
                        $('#favorite_title').css('display', 'block');
                        return
                    } else {
                        $('#favorite_title').css('display', 'none');
                    }
                    let favoritestr = ``;
                    res.forEach(function (item) {
                        favoritestr += `<div class="favorite_lists">
                            <div class="favorite_listsimg">
                                <img src="${item.listpic}" alt="">
                            </div>
                            <div class="favorite_listsmsg">
                                ${item.listdescribe}
                            </div>
                            <ul class="operatelist">
                                <li class="operalist_check" gid="${item.goods_id}">查看商品</li>
                                <li class="operalist_cancel" fid="${item.id}">取消收藏</li>
                            </ul>
                        </div>`
                    })
                    $('.favorite_list').html(favoritestr);
                    // 查看商品的点击事件
                    $('.operalist_check').click(function(){
                        location.href=`./detailpage.html?goods_id=${$(this).attr('gid')}`
                    })
                    // 取消收藏按钮的点击事件
                    $('.operalist_cancel').click(function () {
                        // 链接数据库删除收藏表中id与这个取消收藏上fid属性相同的数据
                        $.ajax({
                            url: '../api/delMyfavorite.php',
                            method: 'get',
                            dataType: 'json',
                            data: {
                                fid: $(this).attr('fid'),
                            },
                            success: function (res) {
                                console.log(res);
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        })
                        $(this).parent().parent().remove();

                    })

                },
                error: function (err) {
                    console.log(err);
                }
            })

        }
        // 当点击的是收货地址时,向数据库请求数据并且进行渲染
        else if (e.target.classList.contains('account_myaddress')) {
            $('main').html(`<div>
            <h2 class="title_order">收货地址</h2>
            <div id="addnew">
                <span id="addnewCon">
                    <button id="addbtn">
                        + 新增收货地址
                    </button>
                    <div id="addtable">
                    <table style="width: 100%;">
                        <colgroup>
                            <col style="width: 120px;">
                            <col style="width: 120px;">
                            <col style="width: 250px;">
                            <col>
                            <col style="width: 110px;">
                        </colgroup>
                        <thead>
                            <tr>
                                <th><span>收货人</span></th>
                                <th><span>手机号</span></th>
                                <th><span>所在地区</span></th>
                                <th><span>详细地址</span></th>
                                <th><span>操作</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
                </span>
            </div>

        </div>`)


            $.ajax({
                url: '../api/getaddress.php',
                method: 'get',
                dataType: 'json',
                data: {
                    uid: $('#username').attr('uid')
                },
                success: function (res) {
                    let str = '';
                    res.forEach(function (item) {
                        str += `<tr class='address_tr'>
                    <td>${item.name}</td>
                    <td>${item.tel}</td>
                    <td>${item.region}</td>
                    <td>${item.address}</td>
                    <td pid=${item.id}>
                        <span><a href="#">编辑</a></span> |
                        <span><a href="#">删除</a></span>
                    </td>
                </tr>`


                    })
                    // 将获取的地址数据渲染到页面中
                    $('tbody').html(str);
                    let pid;
                    $('tbody').on('click', 'a', function () {
                        // 获取当前点击的a标签所在行的数据的id
                        pid = $(this).parent().parent().attr('pid');
                        $('#consigneeipt').attr('pid', pid);
                        // 如果点击的是编辑按钮
                        if ($(this).html() == '编辑') {
                            // 显示提交地址的页面
                            $('#newAdd').fadeIn("fast");
                            let obj = {};
                            for (let i = 0; i < res.length; i++) {
                                if (res[i].id == pid) {
                                    obj = res[i];
                                    break
                                }
                            }

                            $('#consigneeipt').val(obj.name);
                            $('#telIpt').val(obj.tel);
                            $('#areaIpt').val(obj.region);
                            $('#detailaddIpt').val(obj.address);


                            // 当点击取消按钮或者点击右上角x时提前终止事件


                        } else if ($(this).html() == '删除') {
                            if (confirm('确认删除此地址吗？')) {
                                $.ajax({
                                    url: '../api/deladdress.php',
                                    method: 'get',
                                    dataType: 'json',
                                    data: {
                                        id: pid
                                    },
                                    success: function (res) {
                                        console.log(res);
                                        $.ajax({
                                            url: '../api/getaddress.php',
                                            method: 'get',
                                            dataType: 'json',
                                            data: {
                                                uid: $('#username').attr('uid')
                                            },
                                            success: function (res) {
                                                let str = '';
                                                res.forEach(function (item) {
                                                    str += `<tr class='address_tr'>
                                                <td>${item.name}</td>
                                                <td>${item.tel}</td>
                                                <td>${item.region}</td>
                                                <td>${item.address}</td>
                                                <td pid=${item.id}>
                                                    <span><a href="#">编辑</a></span> |
                                                    <span><a href="#">删除</a></span>
                                                </td>
                                            </tr>`


                                                })
                                                // 将获取的地址数据渲染到页面中
                                                $('tbody').html(str);
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

                            }
                        }

                    })


                },
                error: function (err) {
                    console.log(err);
                }
            })
            // 点击新增按钮时弹出输入界面
            $('#addbtn').click(function () {
                $('#newAdd').fadeIn("fast");
                $('#consigneeipt').attr('uid', uid);
                // 把地址输入框清空
                $('#consigneeipt').val('');
                $('#telIpt').val('');
                $('#areaIpt').val('');
                $('#detailaddIpt').val('');
            })
        }
        // 当点击的是个人信息时向数据库请求数据并且渲染
        else if (e.target.classList.contains('account_myself')) {
            $('main').html(`<div>
            <h2 class="title_order">基本信息</h2>
            <div id="essentialInformation">
                <div class="userinfo">用户信息</div>
            </div>
            <div id="essentialContent">
                <div class="eClist">
                    <div class="eClist_left"><label for="ecname">用户名:</label></div>
                    <div class="eClist_right"><input type="text" name="ecname" id="ecname" readonly></div>
                </div>
                <div class="eClist">
                    <div class="eClist_left"><label for="ecsex">性别:</label></div>
                    <div class="eClist_right"><input type="radio" name="ecsex" style="margin-right: 5px;" checked>男<input type="radio" name="ecsex" style="margin-right: 5px; margin-left: 15px;">女</div>
                </div>
                <div class="eClist">
                    <div class="eClist_left"><label for="ectel">手机号:</label></div>
                    <div class="eClist_right"><input type="text" name="ectel" id="ectel"></div>
                </div>
                <div class="eClist">
                    <div class="eClist_left"><label for="ecaddress">地址:</label></div>
                    <div class="eClist_right"><input type="text" name="ecaddress" id="ecaddress"></div>
                </div>
                <div class="eClist">
                    <div class="eClist_left"></div>
                    <div class="eClist_right">
                        <button disabled>确认修改</button>
                    </div>
                </div>
            </div>
        </div>`)
            // 请求数据渲染页面
            $.ajax({
                url: '../api/userinfo.php',
                method: 'get',
                dataType: 'json',
                data: {
                    uid: $('#username').attr('uid')
                },
                success: function (res) {
                    console.log(res);
                    $('#ecname').val(res.username);
                    $('#ectel').val(res.tel);
                    $('#ecaddress').val(res.address);

                },
                error: function (err) {
                    console.log(err);
                }
            })
            let obj = {
                addressText: true,
                telText: true
            };
            // 给手机号输入框绑定失去焦点事件
            $('#ectel').blur(function () {
                // 当手机号输入框为空时，提示不能为空
                if ($('#ectel').val() == '') {
                    // 将隐藏的提示信息的display改为block
                    alert('手机号不能为空');
                    obj.telText = false;
                    changeuserinfoText();
                    return
                }
                let reg = /^1[3456789]\d{9}$/;
                if (!reg.test($('#ectel').val())) {
                    alert('手机号码格式错误');
                    obj.telText = false;
                } else {
                    obj.telText = true;
                }
                changeuserinfoText();
            })
            $('#ecaddress').blur(function () {
                // 当地址输入框为空时，提示不能为空
                if ($('#ecaddress').val() == '') {
                    // 将隐藏的提示信息的display改为block
                    alert('地址不能为空');
                    obj.addressText = false;
                    changeuserinfoText();
                    return
                } else {
                    obj.addressText = true;
                }
                changeuserinfoText();

            })

            function changeuserinfoText() {
                if (obj.telText == true && obj.addressText == true) {
                    $('.eClist_right button').prop('disabled', '').css('backgroundColor', '#4caf50');
                } else {
                    $('.eClist_right button').prop('disabled', 'true').css('backgroundColor', '#b2eeb4');
                }
            }
            changeuserinfoText();
            // 给修改信息按钮绑定点击事件
            $('.eClist_right button').click(function () {
                $.ajax({
                    url: '../api/changeTelAddress.php',
                    method: 'get',
                    dataType: 'json',
                    data: {
                        uid: $('#username').attr('uid'),
                        tel: $('#ectel').val(),
                        address: $('#ecaddress').val()
                    },
                    success: function (res) {
                        console.log(res);

                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            })

        }
        // 当点击的是修改密码时,向数据库请求数据渲染页面并且确定修改时链接数据库修改密码
        else if (e.target.classList.contains('account_mypassword')) {
            $('main').html(`<div>
                <h2 class="title_order">修改密码</h2>
                <div id="changePassword">
                    <div class="userinfo">用户信息</div>
                </div>
                <div id="changepswContent">
                    <div class="cpClist">
                        <div class="cpClist_left"><label for="cpcname">用户名:</label></div>
                        <div class="cpClist_right"><input type="text" name="cpcname" id="cpcname" readonly>
                        </div>
                    </div>
                    <div class="cpClist mistake">
                        <div class="cpClist_left"><label for="oldpsw">旧密码:</label></div>
                        <div class="cpClist_right">
                            <input type="password" name="oldpsw" id="oldpsw" readonly>
                        </div>
                    </div>
                    <div class="cpClist" style="height: 88px;">
                        <div class="cpClist_left"><label for="newpsw">新密码:</label></div>
                        <div class="cpClist_right"><input type="text" name="newpsw" id="newpsw">
                        <p>6到18位数字或者字母组成</p>
                    <span id=falsenewpsw>密码格式错误!</span>
                </div>
                    </div>
                    <div class="cpClist mistake">
                        <div class="cpClist_left"><label for="pswsure">确认密码:</label></div>
                        <div class="cpClist_right"><input type="text" name="pswsure" id="pswsure">
                        <span id=falsepswsure>与上一次输入密码不一致!</span></div>
                    </div>
                    <div class="cpClist">
                        <div class="cpClist_left"></div>
                        <div class="cpClist_right">
                            <button disabled>修改密码</button>
                        </div>
                    </div>
                </div>
            </div>`);
            $.ajax({
                url: '../api/userinfo.php',
                method: 'get',
                dataType: 'json',
                data: {
                    uid: $('#username').attr('uid')
                },
                success: function (res) {
                    console.log(res);
                    $('#cpcname').val(res.username);
                    $('#oldpsw').val(res.password);


                },
                error: function (err) {
                    console.log(err);
                }
            })
            // 对修改密码的输入进行正则
            let obj = {};
            // 新密码的正则
            $('#newpsw').blur(function () {
                // 当密码输入框为空时，提示不能为空
                if ($('#newpsw').val() == '') {
                    // 将隐藏的提示信息的display改为block
                    $('#falsenewpsw').css('display', 'block').html('密码不能为空');
                    return
                } else {
                    // 如果输入框内有值就不会显示隐藏的信息
                    $('#falsenewpsw').css('display', 'none');
                }
                // 密码的正则   6到18位由字母或者数字
                let reg = /^[a-zA-Z0-9_-]{6,18}$/;
                if (!reg.test($('#newpsw').val())) {
                    obj.newpswText = false;
                    $('#falsenewpsw').css('display', 'block').html('密码格式错误');
                } else {
                    $('#falsenewpsw').css('display', 'none');
                    obj.newpswText = true;
                }
                objchangepasswordText();

            })
            // 确认密码的正则
            $('#pswsure').blur(function () {
                // 当密码输入框为空时，提示不能为空
                if ($('#pswsure').val() == '') {
                    // 将隐藏的提示信息的display改为block
                    $('#falsepswsure').css('display', 'block').html('请确认密码');
                    return
                } else {
                    // 如果输入框内有值就不会显示隐藏的信息
                    $('#falsepswsure').css('display', 'none');
                }

                if ($('#newpsw').val() == $('#pswsure').val()) {
                    obj.pswsureText = true;
                    $('#falsepswsure').css('display', 'none');
                } else {
                    $('#falsepswsure').css('display', 'block').html('密码不一致');
                    obj.pswsureText = false;
                }
                objchangepasswordText();

            })
            // 声明一个函数 当输入框都满足条件时，下面的按钮才可以点击（通过修改按钮的颜色和disabled来区别状态）
            function objchangepasswordText() {
                if (obj.newpswText == true && obj.pswsureText == true) {

                    $('.cpClist_right button').prop('disabled', '').css('backgroundColor', '#4caf50');
                } else {
                    $('.cpClist_right button').prop('disabled', 'true').css('backgroundColor', '#b2eeb4')
                }
            }
            // 给修改密码按钮一个点击事件
            $('.cpClist_right button').click(function () {
                // 将新密码和用户的id一起传到数据库找到表并且修改
                $.ajax({
                    url: '../api/changepassword.php',
                    method: 'get',
                    dataType: 'json',
                    data: {
                        uid: $('#username').attr('uid'),
                        password: $('#newpsw').val()
                    },
                    success: function (res) {
                        console.log(res);

                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            })


        }
    })


    // 点击新增地址弹出框的右上角X按钮时隐藏
    $('.newAdd_headexit').click(function () {
        $('#newAdd').fadeOut("fast");
        $('#consigneeipt').removeAttr('uid');

    })
    // 点击新增地址输入界面的取消按钮时也隐藏界面
    $('#footCancel').click(function () {
        $('#newAdd').fadeOut("fast");
        $('#consigneeipt').removeAttr('uid');
    })
    // 点击所在地区输入框出现地址下拉菜单
    $('#areaIpt').click(function () {
        $('#address_lists').css('display', 'block');
        let x = $('#areaIpt').offsetParent().offset().left + 144;
        let y = $('#areaIpt').offsetParent().offset().top + 249;
        $('#address_list').css('left', `${x}px`).css('top', `${y}px`);
        // 请求数据渲染在地址的一级菜单
        $.ajax({
            url: '../api/regionlevelone.php',
            method: 'get',
            dataType: 'json',
            data: {
                level: 1
            },
            success: function (res) {
                if(res.length==0){
                    $('.address_levelone').html(`<li>暂不支持此区域</li>`);
                    return
                }
                console.log(res);
                let str = ``;
                res.forEach(function (item) {
                    str += `<li aid="${item.id}" pid="${item.pid}">${item.name}</li>`
                })
                $('.address_levelone').html(str);

                // 点击levelone菜单里的li时出现leveltwo菜单
                $('.address_levelone li').click(function () {
                    $('.address_levelone li').css({
                        'font-weight': '100',
                        'color': 'rgba(0,0,0,.65)'
                    }).removeClass('levelactive');;
                    $(this).css({
                        'font-weight': '600',
                        'color': 'rgba(0,0,0,.65)'
                    }).addClass('levelactive');
                    $('.address_leveltwo').css('display', 'inline-block');
                    $('.address_levelthree').css('display', 'none');
                    console.log($(this).attr('aid'));

                    // 请求数据渲染二级地址菜单
                    $.ajax({
                        url: '../api/regionleveltwo.php',
                        method: 'get',
                        dataType: 'json',
                        data: {
                            uid: $(this).attr('aid'),

                        },
                        success: function (res) {
                            if(res.length==0){
                                $('.address_levelone').html(`<li>暂不支持此区域</li>`);
                                return
                            }
                            console.log(res);
                            let str = ``;
                            res.forEach(function (item) {
                                str += `<li aid="${item.id}" pid="${item.pid}">${item.name}</li>`
                            })
                            $('.address_leveltwo').html(str);
                            // 点击leveltwo菜单里的li时出现levelthree菜单
                            $('.address_leveltwo li').click(function () {
                                $('.address_leveltwo li').css({
                                    'font-weight': '100',
                                    'color': 'rgba(0,0,0,.65)'
                                }).removeClass('levelactive');
                                $(this).css({
                                    'font-weight': '600',
                                    'color': 'rgba(0,0,0,.65)'
                                }).addClass('levelactive');
                                $('.address_levelthree').css('display', 'inline-block');
                                // 点击第二级地址菜单时跳出第三级地址菜单
                                $.ajax({
                                    url: '../api/regionleveltwo.php',
                                    method: 'get',
                                    dataType: 'json',
                                    data: {
                                        uid: $(this).attr('aid')
                                    },
                                    success: function (res) {
                                        if(res.length==0){
                                            $('.address_levelone').html(`<li>暂不支持此区域</li>`);
                                            return
                                        }
                                        console.log(res);
                                        let str = ``;
                                        res.forEach(function (item) {
                                            str += `<li aid="${item.id}" pid="${item.pid}">${item.name}</li>`
                                        })
                                        $('.address_levelthree').html(str);
                                        // 第三级地址菜单的点击事件
                                        $('.address_levelthree li').click(function () {
                                            $('.address_levelthree li').css({
                                                'font-weight': '100',
                                                'color': 'rgba(0,0,0,.65)'
                                            }).removeClass('levelactive');
                                            $(this).css({
                                                'font-weight': '600',
                                                'color': 'rgba(0,0,0,.65)'
                                            }).addClass('levelactive');
                                            // 把三个下拉菜单中的内容加到所在地区的输入框中
                                            $('#areaIpt').val(`${$('.address_levelone .levelactive').html()}/${$('.address_leveltwo .levelactive').html()}/${$('.address_levelthree .levelactive').html()}`)
                                            // 隐藏下拉菜单
                                            $('#address_lists').css('display', 'none');
                                    
                                        })

                                    },
                                    error: function (err) {
                                        console.log(err);
                                    }
                                })
                            })
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                })

            },
            error: function (err) {
                console.log(err);
            }
        })
    })

    $(window).resize(function () {
        // 当窗口改变时改变下拉菜单的位置
        if ($('#address_lists').css('display') == 'block') {
            let x = $('#areaIpt').offsetParent().offset().left + 144;
            let y = $('#areaIpt').offsetParent().offset().top + 249;
            $('#address_list').css('left', `${x}px`).css('top', `${y}px`);
        }
    });


    
    // 点击除了所在地区输入框和下拉菜单以外的区域都会隐藏下拉菜单
    $('#areaIpt').click(function (e) {
        e.stopPropagation();
        $(document).click(function () {
            $('#address_lists').css('display', 'none');
        })
        
    })
    $('.address_menu').click(function (e) {
        e.stopPropagation();
        $(document).click(function () {
            $('#address_lists').css('display', 'none');
        })
        
    })
    // 当点击提交地址框的提交按钮时把修改的数据提交到数据库
    $('#footSubmit').click(function () {
        // 请求如果传输uid的话就是新增地址，没有uid传输就是修改地址
        $.ajax({
            url: '../api/changeaddress.php',
            method: 'get',
            dataType: 'json',
            data: {
                id: $('#consigneeipt').attr('pid'),
                uid: $('#consigneeipt').attr('uid'),
                name: $('#consigneeipt').val(),
                tel: $('#telIpt').val(),
                region: $('#areaIpt').val(),
                address: $('#detailaddIpt').val()
            },
            success: function (res) {
                console.log(res);
                // 修改或者增加数据成功之后将页面再次渲染
                $.ajax({
                    url: '../api/getaddress.php',
                    method: 'get',
                    dataType: 'json',
                    data: {
                        uid: $('#username').attr('uid')
                    },
                    success: function (res) {
                        let str = '';
                        res.forEach(function (item) {
                            str += `<tr class='address_tr'>
                        <td>${item.name}</td>
                        <td>${item.tel}</td>
                        <td>${item.region}</td>
                        <td>${item.address}</td>
                        <td pid=${item.id}>
                            <span><a href="#">编辑</a></span> |
                            <span><a href="#">删除</a></span>
                        </td>
                    </tr>`


                        })
                        // 将获取的地址数据渲染到页面中
                        $('tbody').html(str);
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
        // 把输入框都清空
        $('#consigneeipt').val('');
        $('#telIpt').val('');
        $('#areaIpt').val('');
        $('#detailaddIpt').val('');

        $('#newAdd').fadeOut('fast');
    })
    // 声明一个用于获取地址栏信息的函数
    function GetQueryString(name) {

        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = decodeURIComponent(window.location.search).substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
});