<?php
    // 获取购物车
    $gid = $_GET['gid'];

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    // sql语句 从收货地址表中找到用户id相同的数据
    $sql = "SELECT * FROM `goods` WHERE `id` = '$gid'";

    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    // 声明一个数组用于接收数据
    
    $row = mysqli_fetch_assoc($res);
    
    print_r(json_encode($row,JSON_UNESCAPED_UNICODE));
?>