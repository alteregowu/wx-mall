const db = wx.cloud.database()
Page({
  data: {
      id:"",
      product_name:"",
      product_src:[],
      product_price:"",
      product_detail:"",
      product_num:"",
      product_xq_src:[],
      product_size:""
  },

  // 加入购物车
  into_cart:function(){
      let that = this
      db.collection('cart').where({
        product_id: that.data.id
      }).get({
        success:function(res){
          if(res.data == ""){
            db.collection('cart').add({
              data:{
                product_name:that.data.product_name,
                product_src:that.data.product_src[0],
                product_price:that.data.product_price,
                product_num:1,
                product_id:that.data.id,
                product_size:that.data.size
              },success:function(res){
                wx.showToast({
                  title: '加入成功'
                })
              },fail:function(res){
                console.log('商品加入失败',res)
              }
            })
          }else{
            wx.showToast({
              title: '已存在购物车',
              icon: 'none', 
            })
          }
        }
      })
  },
  // 立即购买
  buy:function(){
    let that = this
    db.collection('cart').where({
      product_id: that.data.id
    }).get({
      success:function(res){
        if(res.data == ""){
          db.collection('cart').add({
            data:{
              product_name:that.data.product_name,
              product_src:that.data.product_src[0],
              product_price:that.data.product_price,
              product_num:1,
              product_id:that.data.id,
              product_xq_src:that.data.product_xq_src[0],
              product_size:that.data.product_size
              
            },success:function(res){
              wx.switchTab({
                url: '../cart/index',
              })
            },fail:function(res){
              console.log('商品加入失败',res)
            }
          })
        }else{
          wx.switchTab({
            url: '../cart/index'
          })
        }
      }
    })
  },

  onLoad: function (e) {
    let that = this
    db.collection("product").doc(e.id).get({
      success: function(res){
        // console.log('商品获取成功',res)
        that.setData({
          product_name:res.data.name,
          product_src:res.data.src,
          product_price:res.data.price,
          product_detail:res.data.detail,
          product_num:res.data.num,
          product_xq_src:res.data.xq_src,
          id:res.data._id,
          product_size:res.data.size
        })
      }
    })
  }
})