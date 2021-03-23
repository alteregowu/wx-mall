// pages/store_manage/index.js
const db = wx.cloud.database()
Page({

  data: {
      product:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that = this
      db.collection('product').get({
        success: function(res){
          that.setData({
            product:res.data
          })
        }
      })
  },

  onShow: function(){
    let that = this
      db.collection('product').get({
        success: function(res){
          that.setData({
            product:res.data
          })
        }
      })
  }
})