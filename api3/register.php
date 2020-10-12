<?php
header("Content-type:text/html;charset=utf-8");
header('Access-Control-Allow-Origin: *');
@$con = mysqli_connect("localhost","root","root","adds");
if(!$con){
    echo "连接失败";
    return;
}
mysqli_query($con,'set names utf8');

$name = $_REQUEST["name"];
$pwd = $_REQUEST["pwd"];

$sql = "select * from user where userName='$name'";
$result = mysqli_query($con,$sql);

if(mysqli_num_rows($result)>0){
    echo "注册过了";
}
else{
    $sql = "insert into user (userName,pwd) values('$name','$pwd')";        
    $result = mysqli_query($con,$sql);
    if($result) {
        echo "注册成功";
        
    }
    else{
        echo "失败";
        
    }
    
}


?>