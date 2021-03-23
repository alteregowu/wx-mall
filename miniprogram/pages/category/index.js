const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei:[],
    product:[],
    fenlei_now:""
  },
  get_product_category:function(e){
    let that = this
    that.setData({
      fenlei_now:e.currentTarget.dataset.name
    })
    that.get_product()
  },
  // 获取当前分类的商品
  get_product:function(){
    let that = this
    db.collection('product').where({
      category:that.data.fenlei_now
  }).get({
    success:function(res){
      // console.log('获取分类成功',res)
      that.setData({
        product:res.data
      })
    }
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(options)
    db.collection('classify').get({
      success:function(res){
        // console.log('获取分类成功',res)
        that.setData({
          fenlei:res.data
        })
      }
    })
    db.collection('product').where({
        category:"蹲便器"
    }).get({
      success:function(res){
        // console.log('获取分类成功',res)
        that.setData({
          product:res.data
        })
      }
    })
  },

  onShow:function(){
    let that = this
    that.onLoad()
  }
})