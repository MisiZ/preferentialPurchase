// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //点击获取登录信息
  bandleGetUserInfo(e){
    const {userInfo} = e.detail;
    wx.setStorageSync('userinfo', userInfo)
    wx.navigateBack({
      delta:1
    })
  }
})