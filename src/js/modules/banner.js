


define(['jquery'],function($){


    function initBanner(data){
       
        init(data);
        bind();
    }

    function init(data){
        console.log(data)
        var tmp=`
            <ul class="banner_imgs">
                ${data.map((v,i,a)=>{
                    if(i==0){
                        return `<li class="show"><a href="${v.imgLink}"><img src=${v.imgUrl} alt=""></a></li>`;
                    }
                    else{
                        return `<li ><a href="${v.imgLink}"><img src=${v.imgUrl} alt=""></a></li>`;
                    }
                }).join('') }
            </ul>
            <ol class="banner_dots">
                ${data.map((v,i,a)=>{
                    if(i==0){
                        return `<li class="active"></li>`;
                    }
                    else{
                        return `<li></li>`;
                    }
                }).join('') }
            </ol>
        `;
        $("#banner").html(tmp);
    }

    function bind(){
        var $dotLis = $("#banner .banner_dots li");
        var $imgLis = $("#banner .banner_imgs li");
        $dotLis.click(function(){
            $(this).attr('class','active').siblings().attr('class','');
            $imgLis.eq($(this).index()).attr('class','show').siblings().attr('class','');
        })
    }

    return initBanner

});