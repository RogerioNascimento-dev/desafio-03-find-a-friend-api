import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { SALT_HASH } from '~/configs/constants'
import { prisma } from '~/configs/prisma'
import { kernel } from '~/kernel'
import { getOrganizationCreateInputMock } from '../mock/mock'

describe('Organization Controller', async () => {
  beforeAll(async () => {
    await kernel.ready()
  })
  afterAll(async () => {
    await kernel.close()
  })
  it('Should be able authenticate with organization.', async () => {
    const orgMock = getOrganizationCreateInputMock('42717-120')
    const passwordHash = await hash(orgMock.password, SALT_HASH)
    await prisma.organization.create({
      data: { ...orgMock, password: passwordHash },
    })
    const response = await request(kernel.server)
      .post('/auth/login')
      .send({ email: orgMock.email, password: orgMock.password })
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
  it('Should not be able authenticate with invalid credentials.', async () => {
    const response = await request(kernel.server)
      .post('/auth/login')
      .send({ email: 'abc@gmail.com', password: 'asdas' })
    expect(response.statusCode).toBe(401)
  })
  it('Should be able return cookie refresh token on login.', async () => {
    const orgMock = getOrganizationCreateInputMock('42717-120')
    const passwordHash = await hash(orgMock.password, SALT_HASH)
    await prisma.organization.create({
      data: { ...orgMock, password: passwordHash },
    })
    const response = await request(kernel.server)
      .post('/auth/login')
      .send({ email: orgMock.email, password: orgMock.password })
    expect(response.statusCode).toBe(200)
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
