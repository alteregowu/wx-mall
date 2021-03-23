// pages/login/index.js
Page({

  handlegetUserInfo(e){
    // console.log(e)

    const {userInfo} = e.detail
    wx.setStorageSync("userinfo", userInfo);

    wx.navigateBack({
      delta: 1
    });
  }

})