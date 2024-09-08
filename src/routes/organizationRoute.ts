import { FastifyInstance } from 'fastify'
import { create } from '~/http/controllers/organizationController'

export async function organizationRoute(app: FastifyInstance) {
  app.post('/organizations', create)
}
