requirejs.config({                    //配置别名
    paths : {
        "jquery" : "../lib/jquery3.5.1"   // 起了个别名
    }
})
define(['jquery' , '../api/server','./modules/banner'] ,function($ ,{ getBannerData },initBanner){
    // getBannerData().then((res)=>{
    //     initBanner(JSON.parse(res))
    // }).catch(()=>{});

    var d= JSON.parse(window.localStorage.getItem('orderData')) || [];

    initCart(d)
    function initCart(data){
        var ordergoods = data.ordergoods
        console.log(ordergoods)
        var tmp =  ordergoods.map((v)=>{
           // console.log(v[0].name)
            return `<div class="goods">
            <div class="goodsContent clear">
                        <div class="pic fl"><a href=""><img src="${v[0].img}" alt=""></a></div>
                        <div class="goodsContent_right fl">
                            <div class="name">${v[0].name}</div>
                            <div class="type">${v[0].type}</div>
                            <div class="detailinfo clear">
                                <div class="detailinfo_left fl">
                                    <div class="color">颜色：<span>${v[0].color}</span></div>
                                    <div class="code">尺码：<span>${'36'}</span></div>
                                </div>
                                <div class="detailinfo_right fr">
                                    <p class="price">￥ <span>${v[0].price}</span> X </p>
                                    <div class="num"><input type="text" value="${v[0].num}"> </div>
                                    <p></p>
                                </div>
                            </div>
                            <div class="oper">
                                <a href="javascript:;">编辑</a> <span style="margin: 0 5px;">|</span>
                                <a href="javascript:;">删除</a>
                                <span class="fr"> ￥${v[0].price * v[0].num}</span>
                            </div>
                            
                        </div>
                        </div>
                    </div>`;
        }).join('');

        var tmp0 = `<p>姓名： ${data.orderName}</p>
                    <p>电话：${data.orderCall}</p>
                    <p> 收货地址：${data.orderaddress}</p>`;

        $('#cart .cart_list').html(tmp);
        $('#cart .info').html(tmp0);
        // $('#cart .goods .oper a').eq(1).click(function(){
            
        //     var orderData=  JSON.parse(window.localStorage.getItem('orderData'));
        //     var ordergoods = orderData.ordergoods;
        //     var index = $(this).closest('.goods').index();
        //     ordergoods.splice(index,1);
        //     console.log(index)
        //     window.localStorage.setItem('orderData',JSON.stringify(orderData))
        // })
    }






});