export interface IExternalRequest {
  payload?: object
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  endpoint: string
}

export interface IAddress {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro: string
}
