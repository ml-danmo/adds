

define(['jquery'],function($){
     function getBannerData(){
         return $.ajax('/api3/banner.php');
     }
     function getListData(){
         return $.ajax('/api3/list.php');
     }
     function getLoginData(){
         return $.ajax('/api3/login.php');
     }
     function getRegistertData(){
         return $.ajax('/api3/register.php');
     }
     function getregion(){
         return $.ajax('mock/address.json');
     }
     function getDetailData(id){
         return new Promise((resolve,rej)=>{
                    $.ajax('/api3/detail.php').then((res)=>{
                        var res = JSON.parse(res)
                       
                        for(var i=0;i<res.length;i++){
                            if(res[i].goodsId==id){
                                //console.log( res[i]);
                                resolve(res[i])
                            }
                        }
                    })          
         })
         
     }


     return{
        getBannerData,
        getListData,
        getregion,
        getDetailData,
        getLoginData,
        getRegistertData,
        
     }
});

