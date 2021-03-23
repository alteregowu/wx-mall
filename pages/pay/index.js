const db = wx.cloud.database()
const _ = db.command
const util  = require("../../utils/util")

Page({
  data: {
      product:[],
      money:0,
      name:"",
      phone_number:"",
      address:"",
      remarks:""

  },
  //备注
  remarks:function(e){
    let that = this
    console.log(e)
    that.setData({
      remarks:e.detail.value
    })
  },

  backcart:function(){
    wx.reLaunch({
      url: '../cart/index'
    })
  },


  //支付
  pay:function(e){
    let that = this
    //获取当前时间
    var date = util.formatDate(new Date());
    if(that.data.name!==""&&that.data.address!==""&&that.data.phone_number!==""){
      //添加微信支付函数
      db.collection('order').add({
            data:{
              name:that.data.name,
              phone_number:that.data.phone_number,
              address:that.data.address,
              remarks:that.data.remarks,
              money:that.data.money,
              product:that.data.product,
              time:date,
              state:"送货中"
            },success:function(res){
              console.log('下单成功',res)
              wx.cloud.callFunction({
                name:"cart_delete",
                data:{
                },
                success:function(res){
                  console.log('购物车删除成功',res)
                  for(var i = 0; i<that.data.product.length;i++){
                    wx.cloud.callFunction({
                      name:"product_num_add",
                      data:{
                        product_id: that.data.product[i].product_id
                      },success:function(res){
                          console.log("商品销量增加",res)
                      }
                    })
                  }
                  wx.switchTab({
                    url: '../cart/index',
                  })
                }
              })
            }
          })
    }else{
      wx.showToast({
        title: '地址信息有误',
        icon:"none"
      })
    }
  },


  address:function(e){
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.address']) {
          wx.authorize({
            scope: 'scope.address',
            success () {
              wx.chooseAddress({
                success (res) {
                  console.log(res)
                  that.setData({
                    name:res.userName,
                    phone_number:res.telNumber,
                    address:res.provinceName+res.cityName+res.countyName+res.detailInfo
                  })
                }
              })
            }
          })
        }else{
          wx.openSetting({
            success (res) {
              console.log(res.authSetting)
            }
          })
        }
      }
    })
  },

  money_sum() {
    let that = this
    let moneysum = 0
    for(var x = 0;x<that.data.product.length;x++){
      moneysum = moneysum+(that.data.product[x].product_num*that.data.product[x].product_price)
    }
    that.setData({
      money:moneysum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('cart').where({
      product_checked:"true"
    }).get({
      success:function(res){
        console.log('获取商品成功',res)
        that.setData({
          product:res.data
        })
        that.money_sum()
      }
    })
  },
})

  