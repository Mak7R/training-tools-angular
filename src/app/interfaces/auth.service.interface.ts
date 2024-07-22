import {IdentityModel} from "../models/identity.model";


export interface IAuthService {
  getIdentity() : IdentityModel
  setIdentity(identity : IdentityModel) : void
  logout() : void
}
