import { FastifyReply, FastifyRequest } from 'fastify'
import { OrganizationRepository } from '~/repositories/organization/organizationRepository'
import { OrganizationService } from '~/services/organization/organizationService'
import { createOrganizationRequest } from '~/validators/organization/createOrganizationRequest'

const organizationService = new OrganizationService(
  new OrganizationRepository(),
)

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const payload = createOrganizationRequest.parse(request.body)
  const organization = await organizationService.create(payload)
  return reply.status(201).send(organization)
}
