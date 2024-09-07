import { FastifyReply, FastifyRequest } from 'fastify'
import { createOrganizationRequest } from '~/http/validators/organization/createOrganizationRequest'
import { OrganizationRepository } from '~/repositories/organization/organizationRepository'
import { OrganizationService } from '~/services/organization/organizationService'

const organizationService = new OrganizationService(
  new OrganizationRepository(),
)

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const payload = createOrganizationRequest.parse(request.body)
  const organization = await organizationService.create(payload)
  return reply.status(201).send(organization)
}
