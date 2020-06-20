// pages/order/index.js
import {request} from "../../request/index.js"

Page({
  //**页面的初始数据
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
       id: 1,
       value: "待付款",
       isActive: false
     },
     {
       id: 2,
       value: "代发货",
       isActive: false
     },
     {
      id: 3,
      value: "退款/退货",
      isActive: false
    }
    ],
    orders:[]
  },
  //发送请求渲染页面
  onShow(options){
    const token = wx.getStorageSync('token')
     if(!token){
       wx.navigateTo({
         url: 'pages/auth/index',
       })
       return;
     }
    //无法同onLoad一样直接获取,获取当前小程序页面栈,最近点击的页面都会被存入,先入后出
    let pages = getCurrentPages();
    //选索引最大的那个就是当前页面
    let currentPage = pages[pages.length-1];
    //获取option上的url的type参数
    const {type} = currentPage.options;
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
  },
  //获取订单列表的方法
  async getOrders(type){
     const res = await request({url:"/my/orders/all",data:{type}})
     this.setData({
     //  orders:res.orders  将时间戳改为日期
     orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleDateString())}))
     })
  },
  //根据标题索引激活选中
  changeTitleByIndex(index){
    let {tabs} = this.data;
    tabs.forEach((v,i) =>i === index ? v.isActive = true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  handleItemTap(e){
    const {index} = e.detail;
    this.changeTitleByIndex(index)
    //重新发送请求
    this.getOrders(index+1)
  }
})