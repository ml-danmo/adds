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
        //    var goodsImg = v.goodsImg.split(",")[0].replace(`["`,"");
        //    var goodsImg = goodsImg.slice(0,goodsImg.indexOf("?"))
            return `<li >
                        <a href="http://localhost:4000/view/detail.html?name=${v.goodsName}&id=${v.goodsId}"  target="blank">
                            <div class="pic">                               
                                    <img src="${goodsImg}" alt="">                             
                                <div class="see">快速查看</div>
                            </div>
                            <div class="goodsContent">
                                <ul class="smallImg ">
                                    <li><img src="${goodsImg}" alt=""></li>
                                    <li><img src="${goodsImg}" alt=""></li>
                                </ul>                                
                                    <div class="goodsType">${v.goodsType}</div>
                                    <div class="goodsName">${v.goodsName}</div>
                                    <div class="goodsPrice">  
                                        <span>￥${v.goodsNPrice}</span> <span>￥${v.goodsOPrice}</span>
                                    </div>                             
                                <div class="start">⭐⭐⭐⭐⭐ 13</div>
                            </div>
                        </a>
                    </li> `;
            }).join('');
        $("#goodsList .list").html(tmp);
        
    }



});