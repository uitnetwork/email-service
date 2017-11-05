import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserInfo } from './user-info';

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  getLoggedInUserInfo(): Promise<UserInfo> {
    return this.http.get("/api/user")
      .toPromise()
      .then(response => {
        let name = response.json().userAuthentication.details.name;
        return new UserInfo(name);
      }).catch(error => {
        return Promise.reject(error);
      });
  }

  logout(): Promise<Boolean> {
    return this.http.post("/logout", null)
      .toPromise()
      .then(response => {
        return true;
      }).catch(error => {
        return Promise.reject(error);
      });
  }
}
