// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"alterxxx-5gmsuhqw57de94b8"
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('order').where({
    state:event.state
  }).get()
}