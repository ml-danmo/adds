requirejs.config({                    //配置别名
    paths : {
        "jquery" : "../lib/jquery3.5.1"   // 起了个别名
    }
})
define(['jquery' , '../api/server','./modules/banner',] ,function($ ,{ getBannerData,getregion },initBanner,){
    // getregion().then((res)=>{
    //     console.log(res)
    // }).catch(()=>{});

    var d= JSON.parse(window.localStorage.getItem('cart')) || [];
    var allCb =$('#cart #allCb');
   
    initCart(d)
    function initCart(data){
        var aLLn = 0;
        var tmp =  data.map((v)=>{
            // console.log(v);
            aLLn +=Number(v.num);
            return ` <div class="goods">
                            <div class="check">
                            ${v.check?'<input type="checkbox" checked >':'<input type="checkbox" >'} 
                            </div>
                            <div class="goodsContent clear">
                                <div class="pic fl"><a href=""><img src="${v.img}" alt=""></a></div>
                                <div class="goodsContent_right fl">
                                    <div class="name">${v.name}</div>
                                    <div class="type">${v.type}</div>
                                    <div class="detailinfo clear">
                                        <div class="detailinfo_left fl">
                                            <div class="color">颜色：<span>${v.color}</span></div>
                                            <div class="code">尺码：<span>${'36'}</span></div>
                                        </div>
                                        <div class="detailinfo_right fr">
                                            <p class="price">￥ <span>${v.price}</span> X </p>
                                            <div class="num"><input type="number" value="${v.num}"> <span class="fr"> </span> </div>
                                            <p></p>
                                        </div>
                                    </div>
                                    <div class="oper">
                                        <a href="">编辑</a> <span style="margin: 0 5px;">|</span>
                                        <a href="" class="remove">删除</a>
                                        <span class="fr"> ￥<strong class="totalPrice">${v.price * v.num}</strong></span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>`;
        }).join('');

        $('#cart .cart_list').html(tmp);
        $('#cart .title h2 span').html(aLLn);
        

        isAllchecked();
        allCbCheck()
        allComput();
        chooseCb();
        changeNum();
        del();
        buyNow()

    }

    function allCbCheck(){
        var cbs =$('.goods .check input');
        allCb.click(function(){
            if( allCb.prop('checked') ){
                cbs.each(function(i,elem){
                    $(this).prop('checked',true);
                })
            }
        })
       
    }

    function isAllchecked(){
        var cbs =$('.goods .check input');
        var flag = true;

        cbs.each(function(i,elem){
            if( $(elem).prop('checked') == false ){
                flag = false;
            }
        })
        
        if(flag){ //所有的复选框都选中
            allCb.prop('checked',true);
        }
        else{   //有 没有选中 的复选框
            allCb.prop('checked',false);
        }
        
    }

    function allComput(){
        var cbs =$('.goods .check input');
        var num =$('.goods .num input');
        var totalPrice =$('.goods .totalPrice');
        var oallnum =$('#right #allNum');
        var oallprice =$('#right #allPrice');
        var allP =$('#right #allP');
        allNum = 0;
        allPrice = 0;
        cbs.each(function(i,elem){
            if( $(elem).prop('checked') == true ){
               allNum += Number(num.eq(i).val())
               allPrice += Number(totalPrice.eq(i).html())
            }
            oallnum.html(`共 ${allNum} 件`);
            oallprice.html(`￥${allPrice}`);
            allP.html(`￥${allPrice}`);
        })
        $('#cart .xuan p span').html(allNum);
    }   
    function chooseCb(){  //操作复选框
        var cbs =$('.goods .check input');
        cbs.click(function(){  //点击复选框，相应的数据发生改变

            var index  = $(this).closest('.goods').index();
            //console.log(index)
            if( $(this).prop('checked') ){
                d[index].check=true;
            }
            else{
                d[index].check=false;
            }
            window.localStorage.setItem('cart',JSON.stringify(d));
            initCart(d);

        })


    }
        
    function changeNum(){
        var num =$('.goods .num input');
        num.blur(function(){
            if(num.val<=0){
                return
            }
            var index  = $(this).closest('.goods').index();
            d[index].num=num.val();
            window.localStorage.setItem('cart',JSON.stringify(d));
            initCart(d);
            allComput()
        })

    }

    function del(){
        var remove =$('.goods .remove');
        remove.click(function(){
            var index  = $(this).closest('.goods').index();
            d.splice(index,1);
            window.localStorage.setItem('cart',JSON.stringify(d));
            initCart(d);
            allComput()
        })
    }

    function buyNow(){      //点击结算购买
        var settlement = $('#right .order .settlement');
        var wrap_order = $('#wrap_order');
        var wrap_order_zhifuBtn = $('#wrap_order .zhifuBtn');
        var mask = $('#mask');

        settlement[0].onclick = function(){
            wrap_order[0].style.display = 'block';
            mask[0].style.display = 'block';

            var Province,City,District;
		    Province = document.getElementById("Province");
		    City = document.getElementById("City");
		    District = document.getElementById("District");
		    // 初始化
		    (function(){
		        var ProvinceHtml = "";
		        region.forEach(function(index){
		            ProvinceHtml += "<option value='"+index.provinceCode+"'>"+index.provinceName+"</option>";
		        });
		        Province.innerHTML = ProvinceHtml;
		    })()
		    Province.onchange = function(){
		        var that = this;
		        var CityHtml = "";
		        // 初始化县
		        District.innerHTML = "<option value=''>请先选择市</option>";
		        region.forEach(function(index){
		            if(index.provinceCode == that.value){
		                index.mallCityList.forEach(function(child){
		                    CityHtml += "<option value='"+child.cityCode+"'>"+child.cityName+"</option>";
		                });
		                City.innerHTML = CityHtml;
		                return ;
		            }
		        });
		    };
		    City.onchange = function(){
		        var that = this;
		        var DistrictHtml = "";
		        region.forEach(function(index){
		            if(index.provinceCode == Province.value){
		                index.mallCityList.forEach(function(child){
		                    if(child.cityCode == that.value){
		                        child.mallAreaList.forEach(function(sun){
		                            DistrictHtml += "<option value='"+sun.areaCode+"'>"+sun.areaName+"</option>";
		                        });
		                        District.innerHTML = DistrictHtml;
		                        return ;
		                    } 
		                });
		            }
		        });
		    };
			
			
			var way = document.querySelectorAll('#wrap_order .way span');
			var wrap_order_name = document.querySelector('#wrap_order_name');
			var wrap_order_call = document.querySelector('#wrap_order_call');
			var address = '';
			for(let i =0;i<way.length;i++){
				way[i].onclick = function(){
					for(let i =0;i<way.length;i++){
						way[i].style.color = '';
					}
					this.style.color = 'red';
				}
			}
        }
        wrap_order_zhifuBtn[0].onclick = function(){
            wrap_order[0].style.display = 'none';
            mask[0].style.display = 'none';

            address = Province[Province.selectedIndex].innerHTML +'_'+ City[City.selectedIndex].innerHTML +'_'+ District[District.selectedIndex].innerHTML;
            //console.log(address,wrap_order_call.value,wrap_order_name.value);
           
            a = d.map((v,i)=>{
                var arrI = []
                if(v.check==true){
                    arrI.push(v)
                }     
                return arrI;
            })
            console.log(a)
            
            orderData = {
                "orderName":wrap_order_name.value,
                "orderCall":wrap_order_call.value,
                "orderaddress":address,
                "ordergoods":a
            }
            //console.log(orderData)
            window.localStorage.setItem('orderData',JSON.stringify(orderData));
            alert('购买成功');
        }

    }


});