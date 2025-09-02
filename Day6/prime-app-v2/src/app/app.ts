import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  action?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    SidebarModule,
    ButtonModule,
    MenubarModule,
    CardModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  protected readonly title = signal('BUG TRACKER');
  sidebarVisible = false;
  appName = "BugTracker";
  isAuthenticated = false;
  menuItems: MenuItem[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthenticationStatus();
    
    // Listen for route changes to update authentication status
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuthenticationStatus();
    });
  }

  checkAuthenticationStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.updateMenuItems();
  }

  updateMenuItems() {
    const baseItems: MenuItem[] = [
      { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/dashboard' },
      { label: 'Bugs', icon: 'pi pi-exclamation-triangle', routerLink: '/bugs' }
    ];

    if (this.isAuthenticated) {
      // When authenticated, only show navigation items (no logout in sidebar)
      this.menuItems = baseItems;
    } else {
      // When not authenticated, show login option
      this.menuItems = [
        ...baseItems,
        { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/login' }
      ];
    }
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.updateMenuItems();
    this.sidebarVisible = false;
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
    console.log('Sidebar toggled:', this.sidebarVisible);
  }
}
