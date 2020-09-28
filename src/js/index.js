requirejs.config({                    //配置别名
    paths : {
        "jquery" : "../lib/jquery3.5.1"   // 起了个别名
    }
})
define(['jquery' , '../api/server','./modules/banner'] ,function($ ,{ getBannerData },initBanner){
    getBannerData().then((res)=>{
        initBanner(JSON.parse(res))
    }).catch(()=>{});

    /* 最近浏览-轮播图 */
    ban2('banner_1');
    ban2('banner_2');
    function ban2(type){  
        var banner_imgs=$('#'+type+' .banner_imgs');
        var imgsLi=$('#'+type+' .banner_imgs li');
        var dotsLi=$('#'+type+' .banner_dots li');
        var rightBtn=$('#'+type+' .rightBtn');
        var leftBtn=$('#'+type+' .leftBtn');
        var n=0;
        $(rightBtn).click(function(){       
            if(n==$(dotsLi).length-1){
                n=($(dotsLi).length-1);
                console.log($(dotsLi).length-1)
                console.log(111)
                return
            }
            else{
                n++;
                $(banner_imgs).animate({
                    left:-1196 * n
                })
                console.log(22)
            }       
        });
        $(leftBtn).click(function(){      
            if(n==0){
                n=0;
            }
            else{
                n--;
                $(banner_imgs).animate({
                    left:-1196 * n
                })
            }       
        });  
        $(dotsLi).click(function(){
            $(banner_imgs).animate({
                left:-1196 * $(this).index()
            })
            n=$(this).index();
        })

    }









});