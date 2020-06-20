// 分类页面
import {request} from "../../request/index.js"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单数据
   leftMenuList: [],
    //右侧商品数据
   rightContent: [],
    //左侧菜单点击下标
   currentIndex: 0,
   //右侧滚动条距离
   scrollTop:0
  },
  //接口返回数据
   Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储中的数据(小程序中的本地存储技术)
    const Cates = wx.getStorageSync('cates')
    //判断
    if(!Cates){
      //不存在 发送请求获取数据
       this.getCates()
    }else{
      //有旧的数据,定义过期事件,过期后重新请求
      if(Date.now()-Cates.time > 1000 * 100){
        this.getCates()
      }else{
        console.log("可以使用旧的数据");
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // //获取分类数据
  // getCates(){
  //   request({ url:"/categories"})
  //   .then(result =>{
  //     this.Cates = result.data.message;
  //     //把接口的数据存入到本地存储中
  //     wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
  //     //构造左侧的菜单数据
  //     let leftMenuList = this.Cates.map(v=>v.cat_name)
  //     //构造右侧的商品数据
  //     let rightContent = this.Cates[0].children;
  //     this.setData({
  //       leftMenuList,
  //       rightContent
  //     })
  //   })
  // },
    // //获取分类数据  //es7 async语法
   async getCates(){
     const result = await request({url:"/categories"});
    // request({ url:"/categories"})
    // .then(result =>{
      this.Cates = result
      //把接口的数据存入到本地存储中
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
      //构造左侧的菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      //构造右侧的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
  },

  //左侧的点击事件
  handleItemTap(e){
    const {index} =e.currentTarget.dataset;

    let rightContent = this.Cates[index].children;
      this.setData({
        rightContent,
        currentIndex:index,
        //重新设置右侧内容scroll-view标签距离顶部的距离
        scrollTop:0
      })
      
  }
})