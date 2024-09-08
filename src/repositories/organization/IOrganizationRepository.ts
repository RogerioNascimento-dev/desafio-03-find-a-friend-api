import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  findByEmail(findByEmail: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization | null>
}
