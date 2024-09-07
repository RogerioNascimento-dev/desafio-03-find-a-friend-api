import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { kernel } from '~/kernel'
import { getCreateOrganizationRequestMock } from '../mock/mock'

describe('Organization Controller', async () => {
  beforeAll(async () => {
    await kernel.ready()
  })
  afterAll(async () => {
    await kernel.close()
  })
  it('Should be able create organization.', async () => {
    const orgMock = getCreateOrganizationRequestMock('42717-120')
    const response = await request(kernel.server)
      .post('/organizations')
      .send(orgMock)
    expect(response.statusCode).toBe(201)
    expect(response.body.organization).toEqual(
      expect.objectContaining({
        name: orgMock.name,
        email: orgMock.email,
        zip_code: orgMock.zipCode,
      }),
    )
  })
  it('Should not be able create organization with invalid zip code.', async () => {
    const orgMock = getCreateOrganizationRequestMock('123')
    const response = await request(kernel.server)
      .post('/organizations')
      .send(orgMock)
    expect(response.statusCode).toBe(400)
  })
  it('Should not be able create organization with duplicated email.', async () => {
    const orgMock = getCreateOrganizationRequestMock('42717-110')
    await request(kernel.server).post('/organizations').send(orgMock)
    const response = await request(kernel.server)
      .post('/organizations')
      .send(orgMock)
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe(
      'Already exists an organization with this email.',
    )
  })
})
