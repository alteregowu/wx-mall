const db =wx.cloud.database() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      product:[],
      name:""
  },

  compare:function(property){
    return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },

  choose:function(e){
      let that = this
      console.log(e)
      var res = that.data.product.sort(that.compare(e.currentTarget.dataset.choose));
      that.setData({
        product:res
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that =this
      that.setData({
        name:options.name
      })
      db.collection('product').where({
        category:options.name
      }).get({
          success:function(res){
            that.setData({
              product:res.data
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})