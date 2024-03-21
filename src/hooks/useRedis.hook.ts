import { createClient } from 'redis'

export const useRedis = () => {
  const client = createClient({
    url: 'redis://localhost:6379',
  })

  client.on('connect', () => {
    console.log('Connected to Redis server successfully!')
  })

  client.on('error', (error) => {
    console.error('Redis client encountered an error:', error)
  })
  ;(async () => {
    await client.connect()
  })()

  return { redisClient: client }
}
