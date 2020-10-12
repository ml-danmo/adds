


define(['require'], function($) {
    
    function addCartStorage(data,cb){

        var goodsId = data.id;
        var goodsColor = data.color;
        var cartData = JSON.parse(getStorage('cart')) || [];
        var flag = true;
        var index = 0;
        for(let i =0;i<cartData.length;i++){
            //判断本地存储中有没有相同的数据
            if(cartData[i].id==goodsId &&cartData[i].color==goodsColor){
                flag = false;
                index = i;  //找到同类型数据在本地存储中是第几项
            }
        }
        if(flag){  //没有相同的，新添加一条数据
            cartData.push(data);

            setStorage('cart',JSON.stringify(cartData))
        }
        else{  //有相同的，累加，在原来基础上进行数量的累加
            cartData[index].num += data.num;
            setStorage('cart',JSON.stringify(cartData))
        }
        if(cb){
            cb()
        }
        
    }

    function setStorage(key,value){
        window.localStorage.setItem(key,value);
    }

    function getStorage(key){
        return window.localStorage.getItem(key)
    }






    return {
        addCartStorage,
        setStorage,
        getStorage
    }
    
});