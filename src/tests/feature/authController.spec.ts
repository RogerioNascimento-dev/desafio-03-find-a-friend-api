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
  it('Should not be able authenticate with invalid email.', async () => {
    const response = await request(kernel.server)
      .post('/auth/login')
      .send({ email: 'abc@gmail.com', password: 'asdas' })
    expect(response.statusCode).toBe(401)
  })
  it('Should not be able authenticate with invalid password.', async () => {
    const orgMock = getOrganizationCreateInputMock('42717-120')
    const passwordHash = await hash(orgMock.password, SALT_HASH)
    await prisma.organization.create({
      data: { ...orgMock, password: passwordHash },
    })
    const response = await request(kernel.server)
      .post('/auth/login')
      .send({ email: orgMock.email, password: 'ABX-XPTO' })
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
  it('Should not be able to refresh an access token without sending a token refresh', async () => {
    const response = await request(kernel.server).post('/auth/refresh').send()
    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ message: 'Refresh token is missing.' })
  })
  it('Should be able refresh token', async () => {
    const orgMock = getOrganizationCreateInputMock('42717-120')
    const passwordHash = await hash(orgMock.password, SALT_HASH)
    await prisma.organization.create({
      data: { ...orgMock, password: passwordHash },
    })
    const responseAuth = await request(kernel.server)
      .post('/auth/login')
      .send({ email: orgMock.email, password: orgMock.password })

    const cookies = responseAuth.get('Set-Cookie') ?? []

    const response = await request(kernel.server)
      .post('/auth/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
  it('should not be able login without email or password', async () => {
    const response = await request(kernel.server).post('/auth/login').send()
    expect(response.statusCode).toBe(422)
  })
})
