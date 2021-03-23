const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[],
    state:"送货中"
  },

  choose: function(e){
    let that = this
    that.setData({
      state: e.currentTarget.dataset.state
    })
    that.onLoad()
  },

  onLoad: function (options) {
    let that = this
    db.collection('order').where({
      state:that.data.state
    }).get({
      success:function(res){
        that.setData({
          order:res.data
        })
      }
    })
  },

  onShow:function(){
    let that = this
    that.onLoad()
  }
})