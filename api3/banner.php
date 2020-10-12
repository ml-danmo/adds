<?php
header("Content-type:text/html;charset=utf-8");
@$con = mysqli_connect("localhost","root","root","adds");
if(!$con){
    echo "连接失败";
    return;
}
mysqli_query($con,'set names utf8');

$sql = "select * from banner";
$result = mysqli_query($con,$sql);

while($rows =mysqli_fetch_assoc($result)){     //json
    $arr[] = $rows;
}
echo (json_encode($arr));

?>