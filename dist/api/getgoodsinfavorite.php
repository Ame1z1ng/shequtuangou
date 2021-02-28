<?php
    // 获取我的收藏中是否存在这一个商品
    $uid = $_GET['uid'];
    $gid = $_GET['gid'];

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    // sql语句 从收藏表中找到用户id相同的数据
    $sql = "SELECT * FROM `favorite` WHERE `uid` = '$uid' AND `goods_id` = '$gid'";

    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    $arr = array();
    $row = mysqli_fetch_assoc($res);
    
    array_push($arr,$row);
    
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>