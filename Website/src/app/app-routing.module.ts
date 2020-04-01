import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../app/pages/Dashboard/app-dashboard.component';
import { UsersComponent } from './pages/Users/app-users.component';
import { PageNotFoundComponent } from './pages/PageNotFound/app-page-not-found.component';
import { LoginPageComponent } from './pages/LoginPage/app-login-page.component';
import { ProductDefinitionComponent } from './pages/ProductDefinition/app-product-definition.component';
import { ProductComponent } from './pages/Product/app-product.component';
import { CreateUserComponent } from './pages/Users/AddNewUser/app-create-user.component';
import { AuthGuard } from './auth/auth-guard.service';
import { InactivePageComponent } from './pages/Inactive/app-inactive-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'inactive',
    component: InactivePageComponent
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'definition/:id',
    pathMatch: 'full',
    component: ProductDefinitionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:id',
    pathMatch: 'full',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    pathMatch: 'full',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: CreateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
