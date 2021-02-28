<?php
    $username = $_POST['username'];
    $password = $_POST['password'];


    
    // 链接数据库
    $con = mysqli_connect('localhost','root','123456','graduate');

    // 在数据库中的students表中找到用户名与密码都相同的数据
    $sql = "SELECT * FROM `students` WHERE `username` = '$username' AND `password` = '$password'";

    // 执行语句
    $res = mysqli_query($con,$sql);

    // 当数据库连接失败的时候报错
    if(!$res){
        die('数据库链接出错' . mysqli_error($con));
    }

    
    
    $row = mysqli_fetch_assoc($res);
    $uid = $row['id'];

    if($row){
        // print_r('登录成功');
        setcookie('login',1,time()+604800,'/');
        setcookie('username',$username,time()+604800,'/');
        setcookie('uid',$uid,time()+604800,'/');
        header('location:../html/sqtg.html');
    }else{
        print_r('用户名或者密码错误');
    }

?>