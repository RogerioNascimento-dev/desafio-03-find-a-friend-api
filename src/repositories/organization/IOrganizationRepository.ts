import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationRepository {
  find(id: string): Promise<Organization | null>
  findByEmail(findByEmail: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization | null>
}
