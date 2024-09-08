import { Prisma } from '@prisma/client'
import { prisma } from '~/configs/prisma'
import { IPetRepository } from './IPetRepository'

export class PetRepository implements IPetRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async find(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })
    return pet
  }
}
