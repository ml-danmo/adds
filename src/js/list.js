requirejs.config({                    //配置别名
    paths : {
        "jquery" : "../lib/jquery3.5.1"   // 起了个别名
    }
})
define(['jquery' , '../api/server','./modules/banner',] ,function($ ,{ getBannerData,getListData },initBanner){
    getBannerData().then((res)=>{
        //console.log(res);
        if(res.code==0){
            initBanner(res.banner_list)
        }
    }).catch(()=>{});

    getListData().then((res)=>{
       //console.log(JSON.parse(res));
        initGoodsList(JSON.parse(res));
    }).catch(()=>{});


    function initGoodsList(data){
        
        var tmp = data.map(function(v,i,a){
           // var goodsImg = JSON.parse(v.goodsImg)[0];
            return `<li >
                        <div class="pic">
                            <a href="">
                                <img src="" alt="">
                            </a>
                            <div class="see">快速查看</div>
                        </div>
                        <div class="goodsContent">
                            <ul class="smallImg ">
                                <li>12312321<a href=""><img src="" alt=""></a></li>
                                <li><a href=""><img src="" alt=""></a></li>
                            </ul>
                            <a href="">
                                <div class="goodsType">${v.goodsType}</div>
                                <div class="goodsName">${v.goodsName}</div>
                                <div class="goodsPrice">  
                                    <span>${v.goodsNPrice}</span> <span>${v.goodsOPrice}</span>
                                </div>
                            </a>
                            <div>⭐⭐⭐⭐⭐ 13</div>
                        </div>
                    </li> `;
            }).join('');
        $("#goodsList .list").html(tmp);
        
    }



});