import { FastifyInstance } from 'fastify'
import { login } from '~/http/controllers/authController'

export class AuthRoute {
  async register(app: FastifyInstance) {
    app.post('/login', login)
  }
}
