// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'alterxxx-5gmsuhqw57de94b8'
})

const db = cloud.database()
const _ = db.command

// 删除数据
exports.main = async (event, context) => {
  const s =cloud.getWXContext()
  try {
    return await db.collection('cart').where({
      _openid:s.OPENID,
      product_checked: "true"
    }).remove()
  } catch(e) {
    console.error(e)
  } 
} 