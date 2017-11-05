import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { UserInfo } from './user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequired = false;
  loggedIn = false;
  loggedInUserInfo = null;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.getLoggedInUserInfo()
      .then(loggedInUserInfo => this.setLoggedInUserInfo(this.loggedInUserInfo))
      .catch(error => this.handleErrorWhileGettingLoggedInUserInfo(error))
  }

  private setLoggedInUserInfo(loggedInUserInfo: UserInfo) {
    this.loginRequired = false;
    this.loggedIn = true;
    this.loggedInUserInfo = loggedInUserInfo;
  }

  private clearLoggedInUserInfo() {
    this.loginRequired = true;
    this.loggedIn = false;
    this.loggedInUserInfo = null;
  }

  private handleErrorWhileGettingLoggedInUserInfo(error: any) {
    console.error(error);

    this.clearLoggedInUserInfo();
  }

  logout() {
    this.loginService.logout()
      .then(success => this.handleLoggedOut(success))
      .catch(error => {
        console.error(error);
        this.handleLoggedOut(false);
      });
  }

  private handleLoggedOut(success: Boolean) {
    if (success) {
      console.info("User: " + this.loggedInUserInfo.name + " logged out.");
      this.clearLoggedInUserInfo()
    } else {
      console.error("Having problem logging out user: " + this.loggedInUserInfo.name);
    }
  }
}
