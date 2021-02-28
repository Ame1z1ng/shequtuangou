<?php
    // 获取登录用户信息
    $uid = $_GET['uid'];

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    // sql语句 从用户中找到用户id相同的数据
    $sql = "SELECT * FROM `students` WHERE `id` = '$uid'";

    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    // 转化数据
    $row = mysqli_fetch_assoc($res);
    
    print_r(json_encode($row,JSON_UNESCAPED_UNICODE));
?>