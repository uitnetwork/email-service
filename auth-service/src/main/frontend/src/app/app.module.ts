import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
