import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ErrorHandler } from '~/errors/errorHandler'
import { env } from './env'
import { authRoute } from './routes/authRoute'
import { organizationRoute } from './routes/organizationRoute'
import { petRoute } from './routes/petRoute'

export const kernel = fastify()

kernel.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: 'refreshToken', signed: false },
  sign: { expiresIn: '5m' },
})
kernel.register(fastifyCookie)
kernel.register(organizationRoute)
kernel.register(authRoute, { prefix: '/auth' })
kernel.register(petRoute, { prefix: '/pet' })
kernel.setErrorHandler(ErrorHandler)
