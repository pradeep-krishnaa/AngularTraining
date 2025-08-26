import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { BugsComponent } from './pages/bugs/bugs';
import { LoginComponent } from './pages/login/login';


export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
    { path: 'bugs', component: BugsComponent, title: 'Bugs' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    {path:'**' , redirectTo:'dashboard'} //if ethachu thappana url poita it will redirect to dashboard.
];
