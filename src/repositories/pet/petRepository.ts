import { Prisma } from '@prisma/client'
import { prisma } from '~/configs/prisma'
import { ListPetRequest } from '~/http/validators/pet/listPetRequest'
import { IPetRepository } from './IPetRepository'

export class PetRepository implements IPetRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async find(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        Organization: {
          select: {
            id: true,
            name: true,
            city: true,
            state: true,
            address: true,
            whatsapp: true,
          },
        },
      },
    })
    return pet
  }

  async list(petParams: ListPetRequest, city: string) {
    const pets = await prisma.pet.findMany({
      where: {
        Organization: {
          city,
        },
        ...petParams,
      },
    })
    return pets
  }
}
