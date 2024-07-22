import {UserModel} from "./user.model";

export class IdentityModel {
  user: UserModel | null;

  constructor(user: UserModel | null = null) {
    this.user = user;
  }

  setUser(user: UserModel) {
    this.user = user;
  }

  getIsLoggedIn() {
    return this.user !== null;
  }

  getUser() {
    return this.user;
  }
}
