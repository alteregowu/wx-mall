const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    id:""
  },

  phone:function(){
    let that =this
    wx.makePhoneCall({
      phoneNumber:that.data.order.phone_number 
    })
  },

  service:function(){
    let that =this
    wx.cloud.callFunction({
      name:"order_service",
      data:{
        id:that.data.order._id
      },success:function(res){
        wx.showToast({
          title: '送达成功',
        })
        wx.redirectTo({
          url: '../store_operation_order/index'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      id:options.id
    })
    wx.cloud.callFunction({
      name:'order_detail',
      data:{
        id:options.id
      },success:function(res){
        that.setData({
          order:res.result.data
        })
      }
    })
  },

  onShow: function () {
      let that =this
      wx.cloud.callFunction({
        name:'order_detail',
        data:{
          id:that.data.id
        },success:function(res){
          that.setData({
            order:res.result.data
          })
        }
      })
  },

})