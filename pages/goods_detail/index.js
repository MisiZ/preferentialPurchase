// pages/goods_detail/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },
  //商品对象
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
     //获取options
     let pages = getCurrentPages();
     let currentPage = pages[pages.length-1]
     options = currentPage.options

     let goods_id = options.goods_id;
     this.getGoodsDetail(goods_id);
  },
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}})
    console.log(goodsObj)
    this.GoodsInfo=goodsObj;
    //获取缓存中的商品收藏数据
    let collect = wx.getStorageSync('collect')||[]
    //判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id)

    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },
  //点击轮播图,放大预览
  handlePrevewImage(e){
    console.log(e);
    
    const current=e.currentTarget.dataset.url;
    const urls=this.GoodsInfo.pics.map(v=>v.pics_mid)
    wx.previewImage({
      current,
      urls: urls,
    })
  },

  //点击添加购物车
  handleCartAdd(){
    let cart = wx.getStorageSync('cart')||[];
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      this.GoodsInfo.num=1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '加入成功',
      icon:'success',
      mask:true
    })
  },
  //点击收藏
  handleCollect(){
    let isCollect=false;
    //获取缓存中的收藏商品数组
    let collect = wx.getStorageSync('collect')||[]
    //判断该商品是否被收藏过
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index!==-1){
      //已经收藏过,删除该商品
      collect.splice(index,1)
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon:'success',
        mask:true
      })
    }else{
      //没有收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon:'success',
        mask:true
      })
    }
    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect
    })
  }
})