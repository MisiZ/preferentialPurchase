// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
       id: 1,
       value: "商品商家投诉",
       isActive: false
     }
    ],
    //被选中的图片路径数组
    chooseImgs:[],
    //文本域的内容
    textVal:""
  },
  //外网图片路径数组
   UpLoadImgs:[],

  handleItemTap(e){
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) =>i === index ? v.isActive = true:v.isActive=false);
    this.setData({
      tabs
    })
  },
  //加号按钮点击事件
  handleChooseImg(){
   wx.chooseImage({
     //同时选中图片的数量
     count: 9,
     //图片的格式
     sizeType: ['original', 'compressed'],
     //图片的来源
     sourceType: ['album', 'camera'],
     success: (result) => {
       console.log(result);
       this.setData({
         chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
       })
       
     },
     fail: () => {},
     complete: () => {}
   });
     
  },
  //点击图片删除图片事件
  handleRemoveImg(e){
    //获取图片索引
    const {index} = e.currentTarget.dataset;
    //获取数组
    let {chooseImgs} = this.data;
    //删除元素
    chooseImgs.splice(index,1)
    //重新赋值
    this.setData({
      chooseImgs
    })
  },
  //文本域的输入事件
  handleTextInput(e){
   this.setData({
     textVal:e.detail.value
   })
  },
  //提交按钮的点击
  handleFromSubmit(){
    //获取文本域内容
   const {textVal,chooseImgs} = this.data;
    //验证合法性
    if(!textVal.trim()){
      wx.showToast({
        title: '输入不合法',
        icon:'none',
        mask:true
      });
      return;
    }
    wx.showLoading({
      title: '正在上传中',
      mask:true
    })
     //判断有没有需要上传的图片数组
     if(chooseImgs.length!=0){
          //上传文件api不支持多个文件上传 遍历数组 挨个上传
        chooseImgs.forEach((v,i)=>{
          //准备上传图片 到专门的服务器 通过土豆图床
           wx.uploadFile({
             filePath: v,
             name: 'file',
             url: 'https://images.ac.cn/Home/Index/UploadAction/',
             success:(res)=>{
               let url = JSON.parse(res.data).url;
               this.UpLoadImgs.push(url)
               //所有图片上传完毕后触发
               if(i===chooseImgs.length-1){
                 //关闭弹窗
                 wx.hideLoading();
                 //无法模拟,省略步骤
                 console.log("把文本的内容和外网的图片数组提交到后台中");
                 //清空页面
                 this.setData({
                   chooseImgs:[],
                   textVal:""
                 })
                 //返回上个页面
                 wx.navigateBack({
                   delta:1
                 })
               }
             }
           })
         })
     }else{
       //关闭弹窗
       wx.hideLoading();
       //返回上个页面
       wx.navigateBack({
        delta:1
      })
       console.log("只是提交了文本");
     }
  }
})