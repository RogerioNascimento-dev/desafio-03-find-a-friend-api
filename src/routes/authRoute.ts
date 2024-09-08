import { FastifyInstance } from 'fastify'
import { login, refresh } from '~/http/controllers/authController'

export async function authRoute(app: FastifyInstance) {
  app.post('/login', login)
  app.post('/refresh', refresh)
}
