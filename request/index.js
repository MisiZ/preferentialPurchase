//用作限制请求完之后删除加载标识
let ajaxTimes = 0;
export  const request=(params)=>{
  //判断url中是否带有/my/路径,有则带上header token
  let header = {...params.header}
  if(params.url.includes("/my/")){
    header["Authorization"]=wx.getStorageSync('token')
  }
  ajaxTimes++;
  //请求前调用内置加载功能
  wx.showLoading({
    title: "别急等等",
    mask: true
  });
    
  //定义公共的URL
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header:header,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result.data.message);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes===0){
          wx.hideLoading();
        }
      }
    })
  })
}