import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { EducationComponent } from './pages/education/education';
import { ProjectsComponent } from './pages/projects/projects';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'education', component: EducationComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' } // fallback
];
