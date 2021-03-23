const db =wx.cloud.database() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
      product:[],
      name:"",
      option1: [
        { text: '全部商品', value: 0 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '销量排序', value: 'b' },
        { text: '价格排序', value: 'c' },
      ],
      value1: 0,
      value2: 'a'
  },

  
//比较
  compare:function(property){
    return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  },

  choose:function(e){
      let that = this
      if(e.detail =='a'){
        var res = that.data.product.sort(that.compare("_id"));
        that.setData({
          product:res
        })}
      if(e.detail =='b'){
      var res = that.data.product.sort(that.compare("num"));
      that.setData({
        product:res
      })}
      if(e.detail =='c'){
        var res = that.data.product.sort(that.compare("price"));
      that.setData({
        product:res
      })}
      
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
            console.log("111",res),
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