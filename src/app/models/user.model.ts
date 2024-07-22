
export class UserModel {
  userName: string;
  roles: string[];
  authToken: string;

  constructor(userName: string, roles: string[], authToken: string) {
    this.userName = userName;
    this.roles = roles;
    this.authToken = authToken;
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasRoles(roles: string[], hasAllOf : boolean = false){
    if (hasAllOf){
      for (let role of roles){
        if (!this.hasRole(role)){
          return false;
        }
      }
      return true;
    }
    else{
      for (let role of roles){
        if (this.hasRole(role)){
          return true;
        }
      }
      return false;
    }
  }
}
