export interface IAuthRealtorContextData {
  realtor: IRealtor | null
  isLogged: boolean
  isSignIn: boolean
  signIn: (username: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  accessDenied: () => void
}

export interface IRealtor {
  _id: string
  username: string
  password: string
  name: string
  surname: string
  cpf: number
  celphone: string
  email: string
  trainee: boolean
  creci: IS3File
  rg: IS3File
  imageProfile?: IS3File
  supervisorCrecci: string
}

interface IS3File {
  name: string
  size: number
  key: string
  url: number
}

export interface IAuthRealtorResponse {
  token: string
  realtor: IRealtor
}

export interface IAuthorizationResponse {
  params: {
    code?: string
    error?: string
  }
  type?: string
}

export interface IApiAuthRealtorResponse {
  realtor: IRealtor
  token: string
}
