// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'bugs', component: BugsComponent, canActivate: [AuthGuard, RoleGuard('Admin')] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'dashboard' }
];
