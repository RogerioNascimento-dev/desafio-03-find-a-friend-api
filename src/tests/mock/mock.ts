import { fakerPT_BR as fakerPtBr } from '@faker-js/faker'
import {
  Environment,
  IndependencyLevel,
  PetAge,
  PetEnergy,
  PetSize,
  Prisma,
} from '@prisma/client'
import { CreateOrganizationRequest } from '~/http/validators/organization/createOrganizationRequest'
import { CreatePetRequest } from '~/http/validators/pet/createPetRequest'

export function getCreateOrganizationRequestMock(
  knowZipCode: string,
): CreateOrganizationRequest {
  return {
    name: fakerPtBr.company.name(),
    zipCode: knowZipCode,
    street: fakerPtBr.location.street(),
    email: fakerPtBr.internet.email(),
    password: fakerPtBr.internet.password(),
    latitude: getCoordinateBr('latitude'),
    longitude: -50.3149852,
    whatsapp: fakerPtBr.phone.number(),
  }
}

export function getCreatePetMock(): CreatePetRequest {
  return {
    name: fakerPtBr.animal.dog(),
    about: fakerPtBr.lorem.lines(1),
    age: PetAge.SENIOR,
    size: PetSize.MEDIUM,
    energy: PetEnergy.LOW,
    independencyLevel: IndependencyLevel.MEDIUM,
    environment: Environment.APARTMENT,
  }
}

export function getOrganizationCreateInputMock(
  knowZipCode: string,
): Prisma.OrganizationCreateInput {
  const payload = getCreateOrganizationRequestMock(knowZipCode)
  return {
    name: payload.name,
    email: payload.email,
    zip_code: payload.zipCode,
    street: payload.street,
    password: payload.password,
    whatsapp: payload.whatsapp,
    latitude: payload.latitude,
    longitude: payload.longitude,
    state: fakerPtBr.location.state({ abbreviated: true }),
    city: fakerPtBr.location.city(),
    district: fakerPtBr.location.state(),
    address: fakerPtBr.location.streetAddress(),
  }
}

function getCoordinateBr(type: 'latitude' | 'longitude'): number {
  const types = {
    latitude: { min: -33.7508, max: 5.2722 },
    longitude: { min: -73.9922, max: -34.7917 },
  }
  return Math.random() * (types[type].max - types[type].min) + types[type].min
}
