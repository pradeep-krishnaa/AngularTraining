import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { RegisterComponent } from './pages/register/register';
import { StudentsComponent } from './pages/students/students';

export const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full' },
    {path:'home' , component:HomeComponent},
    {path:'register' , component:RegisterComponent},
    {path:'students' , component:StudentsComponent},
    {path:'**' , redirectTo:'home'}
];
