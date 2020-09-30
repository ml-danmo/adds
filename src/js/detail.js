requirejs.config({                    //配置别名
    paths : {
        "jquery" : "../lib/jquery3.5.1"   // 起了个别名
    }
})
define(['jquery' , '../api/server','./modules/banner'] ,function($ ,{ getBannerData,getDetailData },initBanner){
    getBannerData().then((res)=>{
        initBanner(JSON.parse(res))
    }).catch(()=>{});


   var name= window.location.search.match(/name=([^&]+)/)[1];
   var id= window.location.search.match(/id=([^&]+)/)[1];
   console.log(name)
   console.log(id)

   getDetailData(id).then((res)=>{
        //initdetail(res);
        console.log(res);
        initdetail(res);
    }).catch(()=>{});


    function initdetail(data){
        var goodsImg = JSON.parse(data.goodsImg);
        var goodsColor = JSON.parse(data.goodsColor);
        console.log(goodsImg)
        //左侧导航li
        var tmp1 =goodsImg.map((v,i,a)=>{
            return  ` <li><img src="${v}" alt=""></li> `;
        }).join('').repeat(3);
        $('#wrap .nav').html(tmp1);

        //放大镜
        var tmp2 = ` <div class="smallbox">
                            <img src="${goodsImg[0]}" alt="">
                            <div class="mask"></div>
                    </div>
                    <div class="bigbox"><img src="${goodsImg[0]}" alt=""></div> `;
        $('#wrap .fdj').html(tmp2);

        $('#wrap .nav li').click(function(){
            $('#wrap .smallbox img').attr('src',$(this).attr('src'));
        })

       //右侧商品信息
       var tmp3 =
                  ` <div class="con">
                            <p class="type">${data.goodsType}</p>
                            <h2 class="title">${data.goodsName}</h2>
                            <p class="xx">⭐⭐⭐⭐⭐ <a href="">共9条评价</a></p>
                            <p class="price">¥${data.goodsNPrice}</p>
                            <p class="color">${goodsColor[0]}</p>
                        </div>
                        <ul class="list clear">
                            <li><a href=""><img src="${goodsImg[0]}" alt=""></a></li>
                            <li><a href=""><img src="${goodsImg[1]}" alt=""></a></li>
                        </ul>
                        <p class="cha"> 👁‍🗨 <a href="">查看尺码对照表</a></p>
                        <div class="code">选择尺码 <span>↓</span></div>
                        <div class="num">选择尺码 <span>↓</span></div>
                        <a href=""><div class="buy">立即购买 <span>→</span></div></a>
                        <a href=""><div class="addcart">加入购物袋 <span>→</span></div></a>
                        <div class="free">
                            <a href="">该商品免运费 <span>💬√</span></a>
                            <a href="">在线客服 <span>💬</span></a>
                        </div>
                        <p class="info">价格说明：上文显示的划线价格系该商品的建议零售价（而非法律意义上的原价），仅供您参考。</p>
                        <div class="contact">
                            <div class="weibo"><a href=""><img src="../static/img/detail_03.png" alt=""></a></div>
                            <div class="weixin"><a href=""><img src="../static/img/detail_05.png" alt=""></a></div>
                        </div>  `;
        $('#wrap .pop').html(tmp3);
               
         //商品描述
            var tmp4 = `<h2 class="info-name">${data.goodsName}</h2>
                        <p class="info-describe">${data.goodsinfo}</p> `;
            $('#goodsinfo .content').html(tmp4);          
       

    }

});




fdj();
function fdj(){
    let small = document.querySelector("#wrap .smallbox");
    let mask = small.querySelector("#wrap .smallbox .mask");
    let big = document.querySelector("#wrap .bigbox");
    let bigImg = big.querySelector("img");

    small.onmouseover = function(){
        mask.style.display = 'block';
        big.style.display = 'block';
    }
    small.onmouseout = function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    }
    small.onmousemove = function(ev){
        let left = ev.pageX - this.offsetLeft - mask.offsetWidth;
        let top = ev.pageY - this.offsetTop - mask.offsetHeight*2;
        if(left<0){
            left = 0;
        }
        if(top<0){
            top = 0;
        }
        if(left>small.offsetWidth - mask.offsetWidth){
            left = small.offsetWidth - mask.offsetWidth;
        }
        if(top>small.offsetHeight - mask.offsetHeight){
            top = small.offsetHeight - mask.offsetHeight;
        }
        mask.style.left =left +'px';
        mask.style.top =top +'px';
        //找比例值
        let scaleX = left/(small.offsetWidth - mask.offsetWidth);
        let scaleY = top/(small.offsetHeight - mask.offsetHeight);
        //通过比例值控制另一个元素的值。
        bigImg.style.left = -scaleX*(bigImg.offsetWidth-big.offsetWidth)+'px';
        bigImg.style.top = -scaleY*(bigImg.offsetHeight-big.offsetHeight)+'px';  
    }
}