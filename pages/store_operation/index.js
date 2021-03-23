// pages/store_operation/index.js
Page({

  operation:function(e){
    console.log(e)
    wx.navigateTo({
      url: e.currentTarget.dataset.page,
    })
  }
  
})