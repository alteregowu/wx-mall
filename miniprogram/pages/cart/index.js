// pages/cart/index.js
const db = wx.cloud.database()
const _ = db.command

Page({

  data: {
      product:[],
      money:0,
      product_now:[],
      product_id:[],
      delete_id:[],
      hiddens:true
  },
   
  //金额计算
  money_sum:function(){
    let that = this
    let moneysum = 0
    for(var x = 0;x<that.data.product.length;x++){
      if(that.data.product[x].product_checked == "true"){
        moneysum =moneysum+(that.data.product[x].product_num*that.data.product[x].product_price)
      }
    } 
    that.setData({
      money:moneysum
    })
  },

  //选择
  choose:function(e){
    let that = this
    console.log(e) 
    that.setData({
      delete_id:that.data.delete_id.concat(e.detail.value[0])
    })
    if(e.detail.value.length !== 0){
      db.collection('cart').doc(e.target.dataset.id).update({
        data:{
          product_checked:"true"
        },success:function(res){
          that.onLoad()
        }
      }) 
    }else{
      db.collection('cart').doc(e.target.dataset.id).update({
        data:{
          product_checked:""
        },success:function(){
          that.onLoad()
        }
      })
    }
  },

  //删除商品
  delete:function(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除商品',
      success: (result) => {
        if(result.confirm){
          wx.cloud.callFunction({
            name:"cart_delete",
            success:function(res){
              console.log('删除商品成功',res)
              that.onLoad()
            },fail:function(res){
              console.log('删除商品失败',res)
            }
          })
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    // wx.cloud.callFunction({
    //   name:"cart_delete",
    //   success:function(res){
    //     console.log('删除商品成功',res)
    //     that.onLoad()
    //   },fail:function(res){
    //     console.log('删除商品失败',res)
    //   }
    // })
  },

  // 商品数量增加
  add_num:function(e){
    let that = this
    // console.log(e)
    db.collection('cart').doc(e.target.dataset.id).update({
      data: { 
        product_num: _.inc(1)
      }, success:res=>{
        console.log('商品数量加一',res)
        that.onLoad()
      },fail:function(res){
        console.log('获取商品价格失败',res)
      }
    })
  },  

  // 商品数量减少
  reduce_num:function(e){
    let that = this
    // console.log(e)
    if(e.target.dataset.product_num<2){
      wx.showToast({
        title: '不能再减少了',
        icon:"none"
      })
    }else{
      db.collection('cart').doc(e.target.dataset.id).update({
        data: {
          product_num: _.inc(-1)
        }, success:function(res){
          console.log('商品数量加一',res)
          that.onLoad()
        },fail:function(res){
          console.log('获取商品价格失败',res)
        }
      })
    }
  }, 

  //支付
  pay:function(e){ 
    let that = this
    db.collection('cart').where({
      product_checked:"true"
    }).get({
      success:function(res){
        console.log("订单成功",res)
        if(res.data.length == 0){
          wx.showToast({
            title: '你还未选商品',
            image:"../../images/icons/cry-filling.png",
          })
        }else{
          wx.redirectTo({
            url: '../pay/index'
          })
        }
      }
    })
  }, 

  onLoad: function (options) {
    let that = this
    console.log("12212121",options)
    db.collection('cart').get({
      success: function(res){
        console.log('购物车商品获取成功',res)
        that.setData({
          product:res.data
        })
        that.money_sum()
    }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function(){ 
    let that = this
    that.onLoad()
  }
})