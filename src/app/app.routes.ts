import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './screens/public/login/login.component';
import { ErrorComponent } from './screens/public/error/error.component';
import { HomeComponent } from './screens/private/home/home.component';
import { ServicesComponent } from './screens/private/services/services.component';
import { NewServiceComponent } from './screens/private/new-service/new-service.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      }
    ]
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'services',
        component: ServicesComponent
      },
      {
        path: 'new-service',
        component: NewServiceComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];
