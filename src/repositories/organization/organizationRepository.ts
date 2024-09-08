import { Prisma } from '@prisma/client'
import { prisma } from '~/configs/prisma'
import { IOrganizationRepository } from './IOrganizationRepository'

export class OrganizationRepository implements IOrganizationRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({ data })
    return organization
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: { email },
    })
    return organization
  }
}
