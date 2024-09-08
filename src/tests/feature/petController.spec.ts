import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { SALT_HASH } from '~/configs/constants'
import { prisma } from '~/configs/prisma'
import { kernel } from '~/kernel'
import { getCreatePetMock, getOrganizationCreateInputMock } from '../mock/mock'

describe('Organization Controller', async () => {
  beforeAll(async () => {
    await kernel.ready()
  })
  afterAll(async () => {
    await kernel.close()
  })
  it('Should be able create pet.', async () => {
    const orgMock = getOrganizationCreateInputMock('42717-120')
    const passwordHash = await hash(orgMock.password, SALT_HASH)
    await prisma.organization.create({
      data: { ...orgMock, password: passwordHash },
    })
    const responseToken = await request(kernel.server)
      .post('/auth/login')
      .send({ email: orgMock.email, password: orgMock.password })

    const token = responseToken.body.token
    const petMock = getCreatePetMock()
    const response = await request(kernel.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send(petMock)

    expect(response.statusCode).toBe(201)

    expect(response.body.pet).toEqual(
      expect.objectContaining({ name: petMock.name, age: petMock.age }),
    )
  })
})
