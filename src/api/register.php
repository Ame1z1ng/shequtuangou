<?php
    // 接收注册页面来的数据，检查数据库中username是否有相同的，没有就在数据库中增加数据
    $user = $_POST['username'];
    $pass = $_POST['password'];
    


    // 链接数据库中的test
    $con = mysqli_connect('localhost','root','123456','graduate');
    // 在数据表中查找是否有username属性与注册页面传来的数据相同
    $sql = "SELECT * FROM `students` WHERE `username` = '$user'";
    
    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    };

    $row = mysqli_fetch_assoc($res);

    if($row){
        print_r('此用户名已存在');
    }else{
        // 在数据表中将传来的用户名密码加到数据库中
        $sqlUp = "INSERT INTO `students` (`username`,`password`) VALUES('$user','$pass')";
        // 在数据表中将传来的用户名密码加到数据库中
        $resu = mysqli_query($con,$sqlUp);
        print_r('注册成功，请登录！');
        setcookie('success','1',time()+5,'/');
    }
?>