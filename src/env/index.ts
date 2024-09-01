import 'dotenv/config'
import { EnvValidator } from '../validators/env/envValidator'

const _env = EnvValidator.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables.', _env.error.format())
  throw new Error('❌ Invalid environment variables.')
}

export const env = _env.data
