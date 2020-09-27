

define(['jquery'],function($){
     function getBannerData(){
         return $.ajax('/api3/banner.php');
     }
     function getListData(){
         return $.ajax('/api3/list.php');
     }
     return{
        getBannerData,
        getListData,
     }
});

