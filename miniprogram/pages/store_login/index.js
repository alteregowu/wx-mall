const db =wx.cloud.database()
Page({
  formsubmit:function(e){
    // console.log(e)
    if(e.detail.value.account!==""&& e.detail.value.pwd!==""){
      db.collection('user').where({
            account:e.detail.value.account,
            pwd:e.detail.value.pwd
          }).get({
            success:function(res){
              // console.log(res)
              if(res.data.length == 0){
                wx.showToast({
                  title: '账户或密码错误',
                  icon:"none"
                })
              }else{
                wx.redirectTo({
                  url:'../store_operation/index' ,
                })
              }
            }
          })
    }else{ 
      wx.showToast({
        title: '你还有信息未填',
        icon:"none"
      })
    }
  }
  
})