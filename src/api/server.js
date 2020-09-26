

define(['jquery'],function($){
     function getBannerData(){
         return $.ajax('/api3/banner.php');
     }

    // function getaa(){
    //     return $.ajax("/api3/1.php");
    // }
    // getaa().then((res)=>{
    //     console.log(JSON.parse(res))
    // }).catch(()=>{});


     return{
        getBannerData
     }
});

