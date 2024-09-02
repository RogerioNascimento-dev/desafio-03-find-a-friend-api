import axios from 'axios'
import { InvalidZipCodeError } from '~/errors/invalidZipCodeError'
import { IAddress, IExternalRequest } from './ICommonService'

export abstract class CommonService {
  async externalRequest<T>(request: IExternalRequest) {
    const { payload, method, endpoint } = request
    const { data } = await axios.request({
      method: 'GET',
      url: endpoint,
      data: method !== 'GET' ? payload : undefined,
      params: method === 'GET' ? payload : undefined,
      timeout: 1000,
    })
    return data as T
  }

  async getAddress(zipCode: string) {
    try {
      zipCode = zipCode.replace(/\D/g, '')

      return await this.externalRequest<IAddress>({
        method: 'GET',
        endpoint: `https://viacep.com.br/ws/${zipCode}/json`,
      })
    } catch (e) {
      throw new InvalidZipCodeError()
    }
  }
}
