// pages/goods_list/index.js
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
     tabs: [
       {
         id: 0,
         value: "综合",
         isActive: true
       },
       {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
     ],
     goodsList:[]
  },
  //接口参数
  QueryParams:{
    query: "",
    cid: "",
    pagenum:1,
    pagesize:10
  },
  //定义总页数
  totalPages:1,
  //监听页面加载
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    console.log(this.QueryParams.cid);
    this.getGoodsList()
    
  },
  //头部导航
  handleItemTap(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) =>i === index ? v.isActive = true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
   //获取数据总条数
   const total = res.total;
   //计算总页数
   this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
   console.log(this.totalPages);
   
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    })
    //请求成功后关闭下拉刷新页面
    wx.stopPullDownRefresh();
  },
  //原生页面下滑触底事件
  onReachBottom(){
    if(this.QueryParams.pagenum>=this.totalPages){
      wx.showToast({
        title: '已经到底了哦亲',
      })
    }else{
      console.log("还有下一页");
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1
    this.getGoodsList();
  }
})