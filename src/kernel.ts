import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ErrorHandler } from '~/errors/errorHandler'
import { OrganizationRoute } from '~/routes/organizationRoute'
import { env } from './env'
import { AuthRoute } from './routes/authRoute'

export const kernel = fastify()

kernel.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: { cookieName: 'refreshToken', signed: false },
  sign: { expiresIn: '10m' },
})
kernel.register(fastifyCookie)
kernel.register(new OrganizationRoute().register)
kernel.register(new AuthRoute().register, { prefix: '/auth' })
kernel.setErrorHandler(ErrorHandler)
