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

$sql = "select * from user where userName='$name' and pwd='$pwd'";
$result = mysqli_query($con,$sql);

if(mysqli_num_rows($result)>0){
    echo "登录成功";
}
else{
    echo "登录失败";
    
}



?>