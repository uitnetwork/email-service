import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSlideToggleModule,
  MatSnackBarModule, MatSortModule, MatTableModule
} from '@angular/material';
import { TemplateComponent } from './template/template.component';
import { FormsModule } from '@angular/forms';
import { TemplateService } from './service/template.service';
import { NotificationService } from './service/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemplateManagementComponent,
    TemplateComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(APP_ROUTES, {useHash: true}),
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [
    LoginService,
    TemplateService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
