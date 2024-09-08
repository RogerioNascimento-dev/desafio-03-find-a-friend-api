import { Pet, Prisma } from '@prisma/client'
import { ListPetRequest } from '~/http/validators/pet/listPetRequest'

export interface IPetRepository {
  find(id: string): Promise<Pet | null>
  create(data: Prisma.PetCreateInput): Promise<Pet>
  list(petParams: ListPetRequest, city: string): Promise<Pet[]>
}
