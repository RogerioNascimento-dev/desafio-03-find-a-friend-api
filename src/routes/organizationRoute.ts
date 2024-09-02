import { FastifyInstance } from 'fastify'
import { create } from '~/controllers/organizationController'

export class OrganizationRoute {
  async register(app: FastifyInstance) {
    app.post('/organizations', create)
  }
}
