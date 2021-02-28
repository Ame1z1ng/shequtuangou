<?php
    // 模糊搜索
    $first = $_GET['first'];
    $num = $_GET['num']*1;

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    // sql语句 从商品表中找到有关键字的数据
    $sql = "SELECT * FROM `goods` WHERE `cate_2nd` = '$first' LIMIT $num,20";

    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    // 声明一个数组用于接收数据
    $arr = array();
    $row = mysqli_fetch_assoc($res);
    while($row){
        array_push($arr,$row);
        $row = mysqli_fetch_assoc($res);
    }
    print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));
?>