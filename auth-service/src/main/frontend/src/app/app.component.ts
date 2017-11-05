import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loginRequired = false;
  loggedIn = false;
  loggedInUser = null;

  constructor(private http: Http) {
  }


  ngOnInit(): void {
    this.http.get("/api/user").toPromise()
      .then(response => {
        console.log("Response: " + response)
        let username = response.json().userAuthentication.details.name;
        console.log("Username: " + username);
        this.loggedIn = true;
        this.loginRequired = false;
        this.loggedInUser = username;
      })
      .catch(error => {
        console.error(error);
        this.loginRequired = true;
        this.loggedIn = false;
      })
  }

  logout() {
    console.log("logout");
    this.http.post("/logout", null).toPromise()
      .then(response => {
        this.loggedIn = false;
        this.loginRequired = true;
      }).catch(error => {
      console.error(error)
    });
  }
}

class User {

}
