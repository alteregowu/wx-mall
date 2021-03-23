// pages/about_us/index.js
const db =wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers:[],
    longitude:113.428807,
    latitude:22.492762,
    name:["企业简介","企业文化","企业荣誉","总裁致辞"],
    tit_num:0,
    list:[]
  },

  state(e){
    let that =this
    console.log(e)
    that.setData({
      tit_num:e.currentTarget.dataset.index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that =this
      that.setData({
        markers:[{
          longitude:113.428807,
          latitude:22.492762,
          iconPath:"../../images/icons/my.png"
        }]
      })
  }

})