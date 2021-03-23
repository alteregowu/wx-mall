const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:[],
    img:[],
    img_colletion:[],
    name:"",
    price:"",
    detail:"",
    id:"",
    img_xq:"",
    size:""
  },

//上传图片
  upload_img:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        // console.log("当前时间戳为：" + timestamp);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: 'img/product/swiper/'+timestamp+'.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              img:that.data.img.concat(res.fileID)
            })
          }
        })
      }
    })
  },
  
//上传详情图片
  upload_img_xq:function(){
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        var timestamp = Date.parse(new Date());
        timestamp = timestamp / 1000;
        // console.log("当前时间戳为：" + timestamp);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: 'img/product/xq/'+timestamp+'.png',
          filePath: tempFilePaths[0], // 文件路径
          success: function(res) {
            // get resource ID
            console.log(res.fileID)
            that.setData({
              img_colletion:that.data.img_colletion.concat(res.fileID)
            })
          }
        })
      }
    })
  },

//删除图片
  delete: function (e) {
    let that = this
    // console.log(that.data.img)
    // console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id;
    var img= that.data.img;
    var img_colletion = that.data.img_colletion;
    img.splice(id,1)
    img_colletion.splice(id,1)
    that.setData({
      img: img ,
      img_colletion: img_colletion
    })
    wx.cloud.deleteFile({
      fileList: [e.currentTarget.dataset.src],
      success: res => {
        console.log(res.fileList)
      },
      fail: err => {
      },
    })
    console.log(that.data.img)
  },

  //上传
  submit:function(e){
    let that = this
    console.log("121211",e)
    if(e.detail.value.name!==""&&e.detail.value.price!==""&&e.detail.value.category!==""&&e.detail.value.detail!==""&&that.data.img.length!==0&&e.detail.value.size!==""){
      db.collection('product').doc(that.data.id).update({
        data:{
          name:e.detail.value.name,
          price:e.detail.value.price,
          category:e.detail.value.category,
          detail:e.detail.value.detail,
          src:that.data.img,
          num:0,
          xq_src:that.data.img_colletion[0],
          size:e.detail.value.size
        },success:function(res){
          wx.showToast({
            title: '提交成功',
          })
          wx.redirectTo({
            url: '../store_operation_update/index',
          })
        }
      })
    }else{
      wx.showToast({
        title: '你还有未填信息',
        icon:"none"
      })
    }
  },

  //删除商品
  delete_product:function(e){
    let that = this
    wx.showModal({
      title: '提示',
      content: '你想删除这个商品',
      success: (result) => {
        if(result.confirm){
            db.collection('product').doc(that.data.id).remove({
              success: function(res) {
                console.log('删除成功',res.data)
                wx.showToast({
                  title: '删除成功',
                })
                wx.cloud.deleteFile({
                  fileList: that.data.img,
                  success: res => {
                    // handle success
                    console.log(res.fileList)
                  },
                  fail: err => {
                    // handle error
                  },
                })
                wx.redirectTo({
                  url: '../store_manage/index',
                })
              }
            })}
        }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log("id",options)
    that.setData({
      id:options.id
    })
    db.collection('classify').get({
      success:function(res){
        console.log('分类获取成功',res)
        that.setData({
          classify:res.data
        })
      }
    })
    db.collection('product').doc(options.id).get({
      success:function(res){
        console.log('信息获取成功',res)
        that.setData({
          name:res.data.name,
          price:res.data.price,
          size:res.data.size,
          detail:res.data.detail,
          img:res.data.src,
          img_xq:res.data.xq_src,
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    wx.redirectTo({
      url: '../store_operation_update/index',
    })
  },

})