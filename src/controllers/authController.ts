import { FastifyReply, FastifyRequest } from 'fastify'
import { OrganizationRepository } from '~/repositories/organization/organizationRepository'
import { AuthService } from '~/services/auth/authService'
import { loginRequest } from '~/validators/auth/loginRequest'

const authService = new AuthService(new OrganizationRepository())

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const payload = loginRequest.parse(request.body)
  const organization = await authService.login(payload)

  const token = await reply.jwtSign({}, { sign: { sub: organization.id } })
  const refreshToken = await reply.jwtSign(
    {},
    { sign: { sub: organization.id } },
  )
  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({ token })
}
