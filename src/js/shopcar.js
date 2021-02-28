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
        alert('请先登录');
        location.href = "./register.html";
        $('#username').css('display', 'none');
        $('#login').css('display', 'block');
        $('#exit').css('display', 'none');
        

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

    // 向数据库请求这个账号的购物车数据渲染这个页面
    $.ajax({
        url: '../api/getShopcar.php',
        method: 'get',
        dataType: 'json',
        data: {
            uid: $('#username').attr('uid')
        },
        success: function (res) {
            if (res.length == 0) {
                $('#shopcarNull').css('display', 'block');
                return
            } else {
                $('#shopcarNull').css('display', 'none');
            }
            console.log(res);
            $('#listNum').html(res.length);
            let str = ``;
            res.forEach(function (item) {
                str += `<tr class="shopcar_list">
                <td class="tdfirst">
                    <input type="checkbox" class="shopcar_listckb" sid="${item.id}">
                </td>
                <td class="tdsecond">
                    <div class="shopcar_listcontent" sid="${item.goods_id}">
                        <img src="${item.img}" alt="">
                        <div class="shopcar_listmsg">
                            ${item.name}
                        </div>
                    </div>
                </td>
                <td class="tdthird">${item.price}</td>
                <td class="tdfourth">
                        <div>
                            <input type="number" min="1" max="999" step="1" class="listnum" uid="${item.id} "sid="${item.goods_id}" value="${item.goods_num}">
                        </div>      
                </td>
                <td class="tdfifth">
                    ${(item.price*1)*(item.goods_num*1)}
                </td>
                <td class="tdsixth">
                    <a href="#" class="delshopcar"  sid="${item.id}">删除</a>
                </td>
            </tr>`

            })

            $('tbody').html(str);

            let obj = {};
            // 这个obj的属性为购物车表中这个商品的id
            // 属性值也是一个对象 这个属性值存储这个商品的小计金额
            // 点击全选按钮使所有按钮被选中
            $('#allcheck').click(function () {
                // 当全选按钮没有被选中时，把obj清空
                // 被选中时把所有数据都写进去
                if ($('#allcheck').prop('checked') == false) {
                    obj = {};
                    $('.shopcar_listckb').prop('checked', '').parent().parent().css('backgroundColor', '');

                } else if ($('#allcheck').prop('checked') == true) {
                    $('.shopcar_listckb').prop('checked', 'checked').parent().parent().css('backgroundColor', '#e2f3e3');
                    for (var i = 0; i < res.length; i++) {
                        obj[$($('.shopcar_listckb')[i]).attr('sid')] = {
                            listtotal: $($('.tdfifth')[i]).html() * 1
                        }
                    }
                }
                console.log(obj);
                Totalprice()
            })


            $('.shopcar_listckb').click(function () {
                // 当下面的多选按钮全部选中时 全选按钮也会被选中
                // 当没有全部选中时全选按钮不会被选中
                for (let i = 0; i < $('.shopcar_listckb').length; i++) {
                    if ($($('.shopcar_listckb')[i]).prop('checked') == true) {
                        $('#allcheck').prop('checked', true);
                    } else if ($($('.shopcar_listckb')[i]).prop('checked') == false) {
                        $('#allcheck').prop('checked', false);
                        break
                    }
                }

                // idx是点击的input在数组中的索引
                console.log($(this));
                // let idx = $.inArray($(this)[0], $('.shopcar_listckb'));
                let thisckb = $(this);
                // console.log(idx);
                if (thisckb.prop('checked') == false) {
                    thisckb.parent().parent().css('backgroundColor', '');
                    for (let key in obj) {
                        if (key == thisckb.attr('sid')) {
                            delete obj[key]
                        }
                    }
                } else if (thisckb.prop('checked') == true) {
                    // 此件商品显示变色
                    thisckb.parent().parent().css('backgroundColor', '#e2f3e3');
                    // idx是点击的input在数组中的索引
                    let idx = $.inArray(thisckb[0], $('.shopcar_listckb'));
                    obj[thisckb.attr('sid')] = {
                        // 这是那一条商品的小计
                        listtotal: $($('.tdfifth')[idx]).html() * 1,

                    }


                }
                Totalprice()
            })
            // 点击数量变化时的事件
            $('.tdfourth input').bind('input propertychange', function () {
                console.log(1);
                // 把修改的商品数量传递到数据库里
                $.ajax({
                    url: '../api/changeCarlistsnum.php',
                    method: 'get',
                    dataType: 'json',
                    data: {
                        goods_num: $(this).val(),
                        id: $(this).attr('uid')
                    },
                    success: function (res) {
                        console.log(res);
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
                let idx = $.inArray($(this)[0], $('.tdfourth input'));
                // 让num等于商品的数量
                let num = $(this).val();
                // p等于商品的单价
                let p = $($('.tdthird')[idx]).html()
                // 把结果输出到小计上面
                $($('.tdfifth')[idx]).html(num * p);
                // 再调用一下计算总金额的函数
                obj[$(this).attr('uid') * 1]['listtotal'] = num * p;
                Totalprice();

            });
            // 删除商品的事件
            $('.delshopcar').click(function () {
                let a = $(this).attr('sid');
                let thisdel = $(this);
                if (confirm('确定要删除吗？')) {
                    $.ajax({
                        url: '../api/delShopcar.php',
                        method: 'get',
                        dataType: 'json',
                        data: {
                            sid: $(this).attr('sid')
                        },
                        success: function (res) {
                            alert(res.msg);
                            thisdel.parent().parent().remove();
                            delete obj[a * 1];
                            Totalprice();
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                }


            })
            // 点击批量删除的事件
            // 把obj里有的全部删除

            $('#dellists').click(function () {
                // let thisdel= $(this);

                if (confirm('确定要删除吗？')) {
                    let arr = Object.keys(obj);
                    arr.forEach(function (item) {
                        $.ajax({
                            url: '../api/delShopcar.php',
                            method: 'get',
                            dataType: 'json',
                            data: {
                                sid: item * 1
                            },
                            success: function (res) {
                                console.log(res);
                            },
                            error: function (err) {
                                console.log(err);
                            }
                        })
                    })
                    obj = {};
                    // 重新加载页面
                    window.location.reload();

                }
            })








            // 把obj的小计金额加到下方总计里面
            // 每次商品数据发生改动都要调用一次这个函数
            function Totalprice() {
                let a = 0;
                for (let key in obj) {
                    a += obj[key]['listtotal'];
                }
                $('#sb_right span').html(a);
                if ($('#sb_right span').html() != 0) {
                    $('#sb_right button').prop('disabled', '').css({
                        'background-color': '#4caf50',
                        'color': '#fff'
                    })
                } else {
                    $('#sb_right button').prop('disabled', true).css({
                        'background-color': '#f5f5f5',
                        'color': 'rgba(0,0,0,.25)'
                    })
                }
            }



        },
        error: function (err) {
            console.log(err);
        }
    })
    $('#allcheck').click(function () {

    })


});