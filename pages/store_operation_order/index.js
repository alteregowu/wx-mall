const db = wx.cloud.database()
Page({

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
    wx.cloud.callFunction({
      name:'get_state',
      data:{
        state:that.data.state
      },success:function(res){
        console.log('订单获取成功',res)
        that.setData({
          order:res.result.data
        })
      }
  })
}, 

  onShow:function(){
    let that =this
    that.onLoad()
  }  
})