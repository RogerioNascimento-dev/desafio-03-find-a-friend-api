import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { SALT_HASH } from '~/configs/constants'
import { EmailAlreadyExistsError } from '~/errors/emailAlreadyExistsError'
import { IOrganizationRepository } from '~/repositories/organization/IOrganizationRepository'
import { CreateOrganizationRequest } from '~/validators/organization/createOrganizationRequest'
import { CommonService } from '../common/commonService'

export class OrganizationService extends CommonService {
  constructor(private organizationRepository: IOrganizationRepository) {
    super()
  }

  async create(payload: CreateOrganizationRequest) {
    const password = await hash(payload.password, SALT_HASH)
    const address = await this.getAddress(payload.zipCode)

    const organizationExists = await this.organizationRepository.findByEmail(
      payload.email,
    )
    if (organizationExists) {
      throw new EmailAlreadyExistsError()
    }

    const org: Prisma.OrganizationCreateInput = {
      name: payload.name,
      email: payload.email,
      zip_code: payload.zipCode,
      street: payload.street,
      password,
      whatsapp: payload.whatsapp,
      latitude: payload.latitude,
      longitude: payload.longitude,
      state: address.uf,
      city: address.localidade,
      district: address.bairro,
      address: address.logradouro,
    }

    const organization = await this.organizationRepository.create(org)
    return { organization }
  }
}
