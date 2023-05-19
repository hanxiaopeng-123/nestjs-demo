// 引入 ioredis 包
const redis = require('ioredis')
// 引入配置文件 需要传入给实例对象
import {getConfig} from './index'
// 创建实例 连接NoSQL服务器
const client = new redis({
    port: getConfig('REDIS_CONFIG').port,
    host: getConfig('REDIS_CONFIG').host,
   })
// module.exports={
//   client
// }
export default client
