import { config } from 'dotenv'
import { EnvValidator } from '~/validators/env/envValidator'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' })
  console.log(`🧪 Using ${process.env.NODE_ENV} environment variables`)
} else {
  config()
  console.log(`✅ Using ${process.env.NODE_ENV} environment variables`)
}
const _env = EnvValidator.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables.', _env.error.format())
  throw new Error('❌ Invalid environment variables.')
}

export const env = _env.data
