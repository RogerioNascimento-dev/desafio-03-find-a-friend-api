import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { SALT_HASH } from '~/configs/constants'
import { prisma } from '~/configs/prisma'
import { kernel } from '~/kernel'
import {
  getCreatePetMock,
  getOrganizationCreateInputMock,
  getPetCreateInputMock,
} from '../mock/mock'

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
  it('Should be able list pets by city', async () => {
    const orgMock = getOrganizationCreateInputMock('03017-000')
    const passwordHash = await hash(orgMock.password, SALT_HASH)
    await prisma.organization.create({
      data: { ...orgMock, password: passwordHash },
    })
    const responseToken = await request(kernel.server)
      .post('/auth/login')
      .send({ email: orgMock.email, password: orgMock.password })

    const token = responseToken.body.token
    const petMock = getCreatePetMock()
    await request(kernel.server)
      .post('/pet')
      .set('Authorization', `Bearer ${token}`)
      .send(petMock)

    const response = await request(kernel.server)
      .get(`/pet/${orgMock.city}`)
      .query({
        age: petMock.age,
        size: petMock.size,
        energy: petMock.energy,
        environment: petMock.environment,
        independency_level: petMock.independencyLevel,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: petMock.name, age: petMock.age }),
      ]),
    )
  })
  it('Should be able get pet by id', async () => {
    // create organization
    const orgMock = getOrganizationCreateInputMock('03017-000')
    const passwordHash = await hash(orgMock.password, SALT_HASH)
    const orgCreated = await prisma.organization.create({
      data: { ...orgMock, password: passwordHash },
    })

    // create pet
    const petMock = getPetCreateInputMock(orgCreated.id)
    const petCreated = await prisma.pet.create({ data: petMock })
    const response = await request(kernel.server).get(
      `/pet/${petCreated.id}/detail`,
    )
    expect(response.statusCode).toBe(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({ name: petCreated.name, age: petCreated.age }),
    )
  })
  it('Should not be able return details of a pet that does not exist', async () => {
    const response = await request(kernel.server).get(
      `/pet/PET_ID_NOT_EXISTS/detail`,
    )
    expect(response.statusCode).toEqual(404)
  })
  it('Should not be create pet without authentication.', async () => {
    const petMock = getCreatePetMock()
    const response = await request(kernel.server).post('/pet').send(petMock)
    expect(response.statusCode).toBe(401)
  })
})
