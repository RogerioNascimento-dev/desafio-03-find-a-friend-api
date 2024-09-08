import { FastifyReply, FastifyRequest } from 'fastify'
import { loginRequest } from '~/http/validators/auth/loginRequest'
import { OrganizationRepository } from '~/repositories/organization/organizationRepository'
import { AuthService } from '~/services/auth/authService'

const authService = new AuthService(new OrganizationRepository())

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const payload = loginRequest.parse(request.body)
  const organization = await authService.login(payload)

  const token = await reply.jwtSign({}, { sign: { sub: organization.id } })

  const refreshToken = await reply.jwtSign(
    {},
    { sign: { sub: organization.id, expiresIn: '7d' } },
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

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify({ onlyCookie: true })
    const token = await reply.jwtSign({}, { sign: { sub: request.user.sub } })
    const refreshToken = await reply.jwtSign(
      {},
      { sign: { sub: request.user.sub, expiresIn: '7d' } },
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
  } catch (e) {
    return reply.status(401).send({ message: 'Refresh token is missing.' })
  }
}
