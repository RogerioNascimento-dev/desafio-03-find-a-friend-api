import { FastifyInstance } from 'fastify'
import { create } from '~/http/controllers/petController'
import { authMiddleware } from '~/http/middlewares/authMiddleware'

export async function petRoute(app: FastifyInstance) {
  // app.addHook('onRequest', authMiddleware)
  app.post('', { onRequest: [authMiddleware] }, create)
}
