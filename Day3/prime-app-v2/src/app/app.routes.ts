// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bugs', component: BugsComponent },
  { path: 'login', component: LoginComponent },
  {path : '**' , redirectTo : 'dashboard'}
];
