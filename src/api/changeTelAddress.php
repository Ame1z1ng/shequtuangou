<?php
    // 修改密码
    $uid = $_GET['uid'];
    $tel = $_GET['tel'];
    $address = $_GET['address'];

    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    
    // sql语句 从用户表中找到用户id相同的数据
    $sql = "UPDATE `students` SET `tel`='$tel',`address`='$address' WHERE `id`='$uid'";
    

    
    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    
    print_r(json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE));
?>