import { fakerPT_BR } from '@faker-js/faker';
import { CreateOrganizationRequest } from '~/validators/organization/createOrganizationRequest';


export function getCreateOrganizationRequestMock(knowZipCode: string): CreateOrganizationRequest {
  return {
    name: fakerPT_BR.company.name(),
    zipCode: knowZipCode,
    street: fakerPT_BR.location.street(),
    email:  fakerPT_BR.internet.email(),
    password: fakerPT_BR.internet.password(),
    latitude: getCoordinateBr('latitude'),
    longitude: -50.3149852,
    whatsapp: fakerPT_BR.phone.number()
  }
}

function getCoordinateBr(type: 'latitude' | 'longitude'): number {  
  const types = {
    latitude: {min: -33.7508, max:5.2722},
    longitude: {min: -73.9922, max: -34.7917}
  }
  return Math.random() * (types[type].max - types[type].min) + types[type].min;
}
