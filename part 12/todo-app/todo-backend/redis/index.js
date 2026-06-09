const redis = require('redis')

const { REDIS_URL } = process.env

let redisClient = null

if (REDIS_URL && REDIS_URL.match(/redis/)) {
  redisClient = redis.createClient({ url: REDIS_URL })
  redisClient.connect()
}

const setAsync = async (key, value) => {
  if (!redisClient) return null
  return await redisClient.set(key, value)
}

const getAsync = async (key) => {
  if (!redisClient) return null
  return await redisClient.get(key)
}

module.exports = {
  getAsync,
  setAsync
}
