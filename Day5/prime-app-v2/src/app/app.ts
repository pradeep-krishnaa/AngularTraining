import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    CardModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('BUG TRACKER');
  sidebarVisible = false;
  appName = "BugTracker";

  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
    { label: 'Bugs', icon: 'pi pi-exclamation-triangle', routerLink: '/bugs' },
    { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' }
  ];
}
