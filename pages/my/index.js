// pages/my/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{}
  },

  onShow() {
    let that = this
    
    const userinfo=wx.getStorageSync("userinfo")
    that.setData({userinfo})
  },
  address:function(e){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                }
              })
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                }
              })
            }
          })
        }
      }
    })
  }
})