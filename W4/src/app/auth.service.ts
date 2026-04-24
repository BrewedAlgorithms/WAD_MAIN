import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private registeredUser: any = null;
  private loggedInUser: any = null;

  register(user: any) {
    this.registeredUser = user;
    this.loggedInUser = user;
    return true;
  }

  login(email: string, password: string) {
    if (
      this.registeredUser &&
      this.registeredUser.email === email &&
      this.registeredUser.password === password
    ) {
      this.loggedInUser = this.registeredUser;
      return true;
    }
    return false;
  }

  getProfile() {
    return this.loggedInUser;
  }
}
