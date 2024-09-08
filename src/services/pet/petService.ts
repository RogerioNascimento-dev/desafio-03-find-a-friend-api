import { Pet } from '@prisma/client'
import { CreatePetRequest } from '~/http/validators/pet/createPetRequest'
import { ListPetRequest } from '~/http/validators/pet/listPetRequest'
import { IOrganizationRepository } from '~/repositories/organization/IOrganizationRepository'
import { IPetRepository } from '~/repositories/pet/IPetRepository'
import { CommonService } from '../common/commonService'

export class PetService extends CommonService {
  constructor(
    private petRepository: IPetRepository,
    private organizationRepository: IOrganizationRepository,
  ) {
    super()
  }

  async create(
    payload: CreatePetRequest,
    organizationId: string,
  ): Promise<Pet> {
    const pet = await this.petRepository.create({
      about: payload.about,
      age: payload.age,
      energy: payload.energy,
      name: payload.name,
      size: payload.size,
      environment: payload.environment,
      independency_level: payload.independencyLevel,
      Organization: { connect: { id: organizationId } },
    })
    return pet
  }

  async list(params: ListPetRequest): Promise<Pet[]> {
    const pets = await this.petRepository.list(params)
    return pets
  }
}
