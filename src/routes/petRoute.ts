import { FastifyInstance } from 'fastify'
import { create, detail, list } from '~/http/controllers/petController'
import { authMiddleware } from '~/http/middlewares/authMiddleware'

export async function petRoute(app: FastifyInstance) {
  app.post('', { onRequest: [authMiddleware] }, create)
  app.get('/:city', list)
  app.get('/:petId/detail', detail)
}
