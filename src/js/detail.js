requirejs.config({                    //配置别名
    paths : {
        "jquery" : "../lib/jquery3.5.1"   // 起了个别名
    }
})
define(['jquery' , '../api/server','./modules/banner'] ,function($ ,{ getBannerData },initBanner){
    getBannerData().then((res)=>{
        initBanner(JSON.parse(res))
    }).catch(()=>{});
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
        let left = ev.pageX - this.offsetLeft - mask.offsetWidth/2;
        let top = ev.pageY - this.offsetTop - mask.offsetHeight/2;
        // if(left<0){
        //     left = 0;
        // }
        // if(top<0){
        //     top = 0;
        // }
        // if(left>small.offsetWidth - mask.offsetWidth){
        //     left = small.offsetWidth - mask.offsetWidth;
        // }
        // if(top>small.offsetHeight - mask.offsetHeight){
        //     top = small.offsetHeight - mask.offsetHeight;
        // }
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