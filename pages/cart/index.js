// pages/cart/index.js
import{getSetting,chooseAddress,openSetting,showModal,showToast}from "../../utils/asyncWx.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  onShow(){
    //获取缓存中的收获地址信息
   const address = wx.getStorageSync('address');
   this.setData({address})
   //获取缓存中的购物车数据
   const cart = wx.getStorageSync('cart')||[]
   this.setCart(cart)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  //点击收货地址
  // handleChooseAddress(){
  //   //微信获取权限状态API
  //   wx.getSetting({
  //     success:(result)=>{
  //        const scopedAddress = result.authSetting["scope.address"];
  //       if(scopedAddress===true||scopedAddress===undefined){
  //         wx.chooseAddress({
  //           success: (res1) => {
  //             console.log(res1);
              
  //           }
  //         });
  //       }else{
  //         wx.openSetting({
  //           complete: (res2) => {
  //             wx.chooseAddress({
  //               success: (res1) => {
  //                 console.log(res1);
                  
  //               }
  //             });
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
   async handleChooseAddress(){
     try{
          //获取权限状态
          const res1 = await getSetting();
          const scopedAddress = res1.authSetting["scope.address"];
          //判断权限状态
          if(scopedAddress===false){
             await openSetting();    
          }
          //调用获取收获地址API
          let address = await chooseAddress();
          address.all1=address.provinceName + address.cityName + address.countyName + address.detailInfo;
          //存入缓存
          wx.setStorageSync('address', address)
        }catch (err){
           console.log(err);
        }
   },
   //商品栏的选中事件
   handleItemChange(e){
     //获取标签传递的商品ID
     const goods_id = e.currentTarget.dataset.id;
     //获取购物车数组
     let {cart} = this.data
     //根据ID找被修改商品对象的索引
     let index = cart.findIndex(v=>v.goods_id===goods_id);
     //找到索引对象将值取反
     cart[index].checked = !cart[index].checked;
     //重新计算
     this.setCart(cart)
   },
   //封装设置购物车状态且重新计算数据
   setCart(cart){
    let allChecked = true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
       allChecked = false
      }
    })
    allChecked=cart.length!=0?allChecked:false;
    //将结果返回Data
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    //将数据重新返回data和缓存
    wx.setStorageSync("cart",cart);
   },
   //购物车商品全选功能
   handleItemAllChecked(){
    //获取data中的数据
    let {cart,allChecked} = this.data;
    //修改值
    allChecked = !allChecked
    //循环修改cart数组中商品选中数据
    cart.forEach(v=>v.checked=allChecked)
    //调用封装函数重新填充并计算
    this.setCart(cart);
   },
   //按钮编辑商品数量
  async handleItemNum(e){
      //获取传递的商品ID和按钮属性
      const {operation,id}=e.currentTarget.dataset;
      //获取购物车数组
      let {cart} = this.data
      //根据ID找被修改商品对象的索引
      let index = cart.findIndex(v=>v.goods_id===id);
      //判断是否要删除
      if(cart[index].num===1&&operation==-1){
        const res = await showModal({content:"确定要删除吗"})
        if(res.confirm){
               cart.splice(index,1)
               this.setCart(cart)
              }
      }else{
         //找到索引对象修改Num值
         cart[index].num+=operation;
         //重新计算
         this.setCart(cart)
      }
   },
   //商品结算功能
  async handlePay(){
     //判断收货地址是否存在
      const {address,totalNum} = this.data
      if(!address.userName){
        await showToast({title:'您还没有选择收货地址'})
        return
      }
     //判断用户有没有选购商品
      if(totalNum===0){
        await showToast({title:'您还没有选择商品'})
        return
      }
     //通过后跳转到支付页面
      wx.navigateTo({
        url: '/pages/pay/index',
      })
   }
})