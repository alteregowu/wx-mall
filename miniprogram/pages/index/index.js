const db = wx.cloud.database()
const _ = db.command

//Page Object
Page({
  data: {
    search:[],
    banner:[],
    classify:[],
    product:[],
    num:10,
    inputValue:'',
    scrollTop:0
  },
  
  search:function(e){
    let that = this
    // console.log(e)
    let key = e.detail.value
    if(key!==""){
      db.collection('product').where(_.or([{
        name: db.RegExp({
          regexp: key,
          options: 'i',
          })
        }
      ])).get({
      success:res=>{   
        that.setData({
            search:res.data
          })
          if(that.data.search == ""){
            wx.showToast({
              title: '未找到商品',
              icon: 'none',
            });
          }
        }
      })
    }else{
    that.setData({
      search:""
    })
  }
    // db.collection('product').where({
    //   name:e.detail.value
    // }).get({
    //   success:function(res){
    //     that.setData({
    //       search:res.data
    //     })
    //     if(that.data.search == ""){
    //       wx.showToast({
    //         title: '未找到商品',
    //         icon: 'none',
    //       });
    //     }
    //   },
    //   fail:function(res){
    //     console.log("获取失败",res)
    //   }
    // })
  },


  onPageScroll: function (ev) {
    this.setData({
      scrollTop: ev.scrollTop
    })
    // console.log(ev)
  },

  onLoad: function(){
    let that = this
    //轮播图
    db.collection('swiper').get({
      success: function(res){
        // console.log("111",res)
        that.setData({
          banner:res.data
        })
    }
    })

    //分类行
    db.collection('classify').get({
      success: function(res){
        that.setData({
          classify:res.data
        })
      }
    })

    //产品列表
    db.collection('product').get({
      success: function(res){
        that.setData({
          product:res.data
        })
      }
    })
  },

  onShow:function(){
    let that = this
    that.onLoad()
  },

  onReachBottom:function(){
    let that =this
    wx.showLoading({
      title: "刷新中",
      duration:1000
    })
    let old_data = that.data.product
    db.collection('product').skip(that.data.num)
    .get().then(res =>{
      this.setData({
        product:old_data.concat(res.data),
        num:that.data.num+10
      })
      if(res.data == ""){
        wx.showToast({
          title: "加载完毕",
          icon:"success"
        })
      }
    }).catch(err =>{
      console.err(err)
    })
  }
})