import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { BugService, Bug } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule
  ],
  templateUrl: './bugs.html',
  styleUrls: ['./bugs.css']
})
export class BugsComponent implements OnInit {
  bugs: Bug[] = [];
  error: string = '';
  loading: boolean = false;
  isAuthenticated: boolean = false;

  constructor(
    private bugService: BugService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.isAuthenticated = this.bugService.isAuthenticated();
    
    if (!this.isAuthenticated) {
      this.error = 'You must be logged in to view bugs';
      return;
    }
    
    this.loadBugs();
  }

  loadBugs() {
    this.loading = true;
    this.error = '';
    
    this.bugService.getBugs().subscribe({
      next: (bugs) => {
        this.bugs = bugs;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        
        // If session expired, redirect to login
        if (err.message.includes('Session expired') || err.message.includes('must be logged in')) {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
