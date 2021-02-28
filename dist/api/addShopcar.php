<?php
    // 增加地址
    $uid = $_GET['uid'];
    $goods_id = $_GET['fid'];
    $goods_num = $_GET['goods_num'];
    $listname = $_GET['listname'];
    $listpic = $_GET['listpic'];
    $price = $_GET['price'];
    $marketprice = $_GET['marketprice'];
    
    

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    // sql语句 从收货地址表中找到用户id相同的数据
    $sql = "INSERT INTO `carts` VALUES (null,'$uid','$goods_id','$goods_num','$listname','$listpic','$price','$marketprice')";
    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    
    print_r(json_encode(array('code'=>$res,'msg'=>'增加成功'),JSON_UNESCAPED_UNICODE));
?>