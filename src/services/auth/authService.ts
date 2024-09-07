import { Organization } from '@prisma/client'
import { compareSync } from 'bcryptjs'
import { InvalidCredentialsError } from '~/errors/invalidCredentialsError'
import { IOrganizationRepository } from '~/repositories/organization/IOrganizationRepository'
import { LoginRequest } from '~/validators/auth/loginRequest'
import { CommonService } from '../common/commonService'

export class AuthService extends CommonService {
  constructor(private organizationRepository: IOrganizationRepository) {
    super()
  }

  async login(payload: LoginRequest): Promise<Organization> {
    const organization = await this.organizationRepository.findByEmail(
      payload.email,
    )
    if (!organization) {
      throw new InvalidCredentialsError()
    }
    const passwordMatch = compareSync(payload.password, organization.password)
    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }
    return organization
  }
}
