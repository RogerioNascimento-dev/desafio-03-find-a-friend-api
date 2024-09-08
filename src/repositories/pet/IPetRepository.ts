import { Pet, Prisma } from '@prisma/client'

export interface IPetRepository {
  find(id: string): Promise<Pet | null>
  create(data: Prisma.PetCreateInput): Promise<Pet>
}
