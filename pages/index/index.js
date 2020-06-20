import {request} from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    CateList: [],
    FloorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // })
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  getSwiperList(){
    request({url:'/home/swiperdata'})
    .then(result=>{
      this.setData({
          swiperList:result
      })
    })
  },
  getCateList(){
    request({url:'/home/catitems'})
    .then(result=>{
      this.setData({
        CateList:result
      })
    })
  },
  getFloorList(){
    request({url:'/home/floordata'})
    .then(result=>{
      this.setData({
        FloorList:result
      })
    })
  }
})