import { FastifyReply, FastifyRequest } from 'fastify'
import { OrganizationRepository } from '~/repositories/organization/organizationRepository'
import { PetRepository } from '~/repositories/pet/petRepository'
import { PetService } from '~/services/pet/petService'
import { createPetRequest } from '../validators/pet/createPetRequest'
import {
  listPetParamRequest,
  listPetRequest,
} from '../validators/pet/listPetRequest'

const petService = new PetService(
  new PetRepository(),
  new OrganizationRepository(),
)

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const payload = createPetRequest.parse(request.body)
  const organizationId = request.user.sub
  const pet = await petService.create(payload, organizationId)
  return reply.status(201).send({ pet })
}
export async function list(request: FastifyRequest, reply: FastifyReply) {
  const payload = listPetRequest.parse(request.query)
  const { city } = listPetParamRequest.parse(request.params)
  const pets = await petService.list(payload, city)
  return reply.status(200).send({ pets })
}
