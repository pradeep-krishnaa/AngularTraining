import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { BugDetailComponent } from './bug-detail';
import { AdminDashboardComponent } from './admin-dashboard';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Allow Developer and Admin on Dashboard
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { roles: ['Developer', 'Admin'] } 
  },

  // Allow Developer and Admin on Bugs
  { 
    path: 'bugs', 
    component: BugsComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { roles: ['Developer', 'Admin'] } 
  },

  // Allow Developer and Admin on Bug Detail
  { 
    path: 'bugs/:id', 
    component: BugDetailComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { roles: ['Developer', 'Admin'] } 
  },

  // Admin only - Admin Dashboard
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard, RoleGuard], 
    data: { roles: ['Admin'] } 
  },

  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: 'dashboard' }
];
