// pages/search/index.js
import {request} from "../../request/index.js"

Page({
  //页面的初始数据
  data: {
   goods:[],
   //取消按钮是否显示
   isFocus:false,
   //输入框默认值
   inpValue:""
  },
  timeId:-1,
  //输入框值改变事件
  handleInput(e){
    //获取输入框的值
    const {value} = e.detail;
    //检测合法性,输入框无值也能进入
    if(!value.trim()){
      clearTimeout(this.timeId)
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    //准备发送请求获取数据
    this.setData({
      isFocus:true
    })
    clearTimeout(this.timeId)
    this.timeId = setTimeout(()=>{
      this.qsearch(value)
    },1000)
  },
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}});
    this.setData({
      goods:res
    })
  },
  //取消按钮点击事件
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }

})