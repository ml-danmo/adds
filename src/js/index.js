requirejs.config({                    //配置别名
    paths : {
        "jquery" : "../lib/jquery3.5.1"   // 起了个别名
    }
})
define(['jquery' , '../api/server','./modules/banner'] ,function($ ,{ getBannerData },initBanner){
    getBannerData().then((res)=>{
        //console.log(res);
        // if(res.code==0){
        //     initBanner(res.banner_list)
        // }
        initBanner(JSON.parse(res))
    }).catch(()=>{});
});