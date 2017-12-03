import { Routes } from '@angular/router';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { LoginComponent } from './login/login.component';

export const APP_ROUTES: Routes = [
  {
    path: 'template-management',
    component: TemplateManagementComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
