<?php
    // 增加和修改收货地址
    $uid = $_GET['uid'];
    $id = $_GET['id'];
    $name = $_GET['name'];
    $tel = $_GET['tel'];
    $region = $_GET['region'];
    $address = $_GET['address'];
    $isDefault = '否';
    

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    if($uid){
        // sql语句 从收货地址表中找到用户id相同的数据
        $sql = "INSERT INTO `deliveryaddress` VALUES (null,'$uid','$name','$tel','$region','$address','$isDefault')";
    }else{
        // sql语句 从收货地址表中找到用户id相同的数据
        $sql = "UPDATE `deliveryaddress` SET `name`='$name', `tel`='$tel',`region`='$region',`address`='$address',`isDefault`='$isDefault' WHERE `id`='$id'";
    }

    
    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    
    print_r(json_encode(array('code'=>$res,'msg'=>'成功'),JSON_UNESCAPED_UNICODE));
?>