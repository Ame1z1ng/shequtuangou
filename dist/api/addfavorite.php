<?php
    // 增加地址
    $uid = $_GET['uid'];
    $goods_id = $_GET['fid'];
    $listpic = $_GET['listpic'];
    $listdescribe = $_GET['listdescribe'];
    
    

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    // sql语句 从收货地址表中找到用户id相同的数据
    $sql = "INSERT INTO `favorite` VALUES (null,'$uid','$goods_id','$listpic','$listdescribe')";
    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    
    print_r(json_encode(array('code'=>$res,'msg'=>'增加成功'),JSON_UNESCAPED_UNICODE));
?>