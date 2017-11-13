import { Routes } from '@angular/router';
import { TemplateManagementComponent } from './template-management/template-management.component';
import { LoginComponent } from './login/login.component';
import { TemplateComponent } from './template/template.component';

export const APP_ROUTES: Routes = [
  {
    path: 'template-management',
    component: TemplateManagementComponent
  },
  {
    path: 'template',
    component: TemplateComponent
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
