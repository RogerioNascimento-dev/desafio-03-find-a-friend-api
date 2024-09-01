import { env } from './env'
import { kernel } from './kernel'

kernel.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
  console.log(`🚀 HTTP find-a-friend-api running on port ${env.PORT}`)
})
