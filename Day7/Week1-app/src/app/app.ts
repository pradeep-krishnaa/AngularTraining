import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule , RouterLink, RouterLinkActive, SidebarModule,
    ButtonModule,
    MenubarModule,
    CardModule
    // BrowserAnimationsModule,
    // BrowserModule,
  
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('Week1-app');
  appName = "Student Regsiter Portal";
  sidebarVisible = false;
  menuItems = [
    { label: 'Home', icon: 'pi pi-home', routerLink: '/home' },
    { label: 'Register', icon: 'pi pi-user', routerLink: '/register' },
    { label: 'Students', icon: 'pi pi-graduation-cap', routerLink: '/students' },
  ];
}
