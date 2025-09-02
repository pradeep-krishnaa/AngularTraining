import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SidebarModule, ButtonModule, MenuModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  sidebarVisible = false;
  
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/'
    },
    {
      label: 'Education',
      icon: 'pi pi-graduation-cap',
      routerLink: '/education'
    },
    {
      label: 'Projects',
      icon: 'pi pi-briefcase',
      routerLink: '/projects'
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope',
      routerLink: '/contact'
    }
  ];
}
