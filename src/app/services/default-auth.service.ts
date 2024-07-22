import {IAuthService} from "../interfaces/auth.service.interface";
import { IdentityModel } from "../models/identity.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {
    private identity: IdentityModel;

    constructor() {
      this.identity = new IdentityModel();
    }

    setIdentity(identity: IdentityModel): void {
        this.identity = identity;
    }
    logout(): void {
        throw new Error("Method not implemented.");
    }
    getIdentity(): IdentityModel {
      return new IdentityModel(null);
    }
}
