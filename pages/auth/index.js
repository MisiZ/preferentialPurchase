// pages/auth/index.js
import {
  login
} from "../../utils/asyncWx.js"
import {
  request
} from "../../request/index.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
   handleGetUserInfo() {
      //获取用户信息
     // const {encryptedData,rawData,iv,signature} = e.detail;
      //获取小程序登录后的code值
    //  const {code} = await login();
      //打包
    //  const loginParams = {encryptedData,rawData,iv,signature,code}
      //发送请求 获取用户的token
    //  const {token} = await request({url: "/users/wxlogin", data: loginParams,method: "post"})
      //没有权限,值为null
    //  console.log(token);
      //存入缓存并回到上一页
      console.log('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
      
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      wx.setStorageSync('token',token)
      wx.navigateBack({
        delta: 1
      })
  }
})