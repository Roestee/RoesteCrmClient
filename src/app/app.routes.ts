import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutsComponent } from './components/layouts/layouts.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { LeadsComponent } from './components/leads/leads.component';
import { LeadDetailsComponent } from './components/lead-details/lead-details.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutsComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [() => inject(AuthService).isPermitted('/roles')],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [() => inject(AuthService).isPermitted('/users')],
      },
      {
        path: 'leads',
        component: LeadsComponent,
        canActivate: [() => inject(AuthService).isPermitted('/leads')],
      },
      {
        path: 'lead-details/:id',
        component: LeadDetailsComponent,
        canActivate: [() => inject(AuthService).isPermitted('/leads')],
      },
      {
        path: 'accounts',
        component: AccountsComponent,
        canActivate: [() => inject(AuthService).isPermitted('/accounts')],
      },
      {
        path: 'account-details/:id',
        component: AccountDetailsComponent,
        canActivate: [() => inject(AuthService).isPermitted('/accounts')],
      },
    ],
  },
];
