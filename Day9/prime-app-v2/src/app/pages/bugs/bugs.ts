import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

import { BugService, Bug } from '../../services/bug.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bugs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule,
    MessageModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    TooltipModule
  ],
  templateUrl: './bugs.html',
  styleUrls: ['./bugs.css']
})
export class BugsComponent implements OnInit {
  bugs: Bug[] = [];
  filteredBugs: Bug[] = [];
  error: string = '';
  loading: boolean = false;
  isAuthenticated: boolean = false;
  userRole: string | null = null;
  sortDirection: { [key: string]: 'asc' | 'desc' } = {}; // track sort state per column

  statuses = [
  { label: 'All Statuses', value: null },
  { label: 'Open', value: 'Open' },
  { label: 'In Progress', value: 'In Progress' }, // match backend exactly
  { label: 'Closed', value: 'Closed' }
];

priorities = [
  { label: 'All Priorities', value: null },
  { label: 'High', value: 'High' },
  { label: 'Medium', value: 'Medium' },
  { label: 'Low', value: 'Low' }
];

  selectedStatus: string | null = null;
  selectedPriority: string | null = null;
  private statusOrder = ['Open', 'In Progress', 'Closed'];
  private priorityOrder = ['Low', 'Medium', 'High'];

  showDialog: boolean = false;
  isEditMode: boolean = false;
  bugData: Partial<Bug> = {};
  
  statusOptions = [
    { label: 'Open', value: 'Open' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Closed', value: 'Closed' }
  ];
  
  priorityOptions = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
  ];

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
    this.userRole = this.authService.getUserRole();

    if (!this.isAuthenticated) {
      this.error = 'You must be logged in to view bugs';
      return;
    }

    this.loadBugs();
  }

  loadBugs() {
    this.loading = true;
    this.error = '';

    // 🔹 Reset filters and sorting
    this.selectedStatus = null;
    this.selectedPriority = null;
    this.sortDirection = {}; // reset sorting state

    this.bugService.getBugs().subscribe({
      next: (bugs) => {
        this.bugs = bugs;
        this.filteredBugs = [...bugs]; // fresh data
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;

        // If session expired, redirect to login
        if (
          err.message.includes('Session expired') ||
          err.message.includes('must be logged in')
        ) {
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

  filterBugs() {
    this.filteredBugs = this.bugs.filter((bug) => {
      const statusMatch = this.selectedStatus ? bug.status === this.selectedStatus : true;
      const priorityMatch = this.selectedPriority ? bug.priority === this.selectedPriority : true;
      return statusMatch && priorityMatch;
    });
  }
  sortBugs(column: keyof Bug) {
    // Toggle sort direction
    this.sortDirection[column] = this.sortDirection[column] === 'asc' ? 'desc' : 'asc';
    const direction = this.sortDirection[column];

    this.filteredBugs.sort((a, b) => {
      let compare = 0;

      if (column === 'status') {
        compare = this.statusOrder.indexOf(a.status) - this.statusOrder.indexOf(b.status);
      } else if (column === 'priority') {
        compare = this.priorityOrder.indexOf(a.priority) - this.priorityOrder.indexOf(b.priority);
      } else {
        const valA = (a[column] ?? '').toString().toLowerCase();
        const valB = (b[column] ?? '').toString().toLowerCase();
        compare = valA.localeCompare(valB);
      }

      return direction === 'asc' ? compare : -compare;
    });
  }

  getStatusClass(status: string): string {
    if (!status) return '';
    return 'status-' + status.toLowerCase().replace(/\s+/g, '-');
  }

  getPriorityClass(priority: string): string {
    if (!priority) return '';
    return 'priority-' + priority.toLowerCase().replace(/\s+/g, '-');
  }

  createBug() {
    if (!this.canCreate()) return;
    this.isEditMode = false;
    this.bugData = {
      title: '',
      description: '',
      status: 'Open',
      priority: 'Medium',
      projectId: 1
    };
    this.showDialog = true;
  }

  editBug(bug: Bug) {
    if (!this.canEdit()) return;
    this.isEditMode = true;
    this.bugData = { ...bug };
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.bugData = {};
  }

  saveBug() {
    if (this.isEditMode) {
      this.bugService.updateBug(this.bugData.id!, this.bugData as Bug).subscribe({
        next: () => {
          this.loadBugs();
          this.closeDialog();
        },
        error: (err) => this.error = err.message
      });
    } else {
      this.bugService.createBug(this.bugData as Omit<Bug, 'id' | 'createdAt'>).subscribe({
        next: () => {
          this.loadBugs();
          this.closeDialog();
        },
        error: (err) => this.error = err.message
      });
    }
  }

  deleteBug(bug: Bug) {
    if (!this.canDelete() || !bug.id) return;
    if (confirm(`Are you sure you want to delete bug "${bug.title}"?`)) {
      this.bugService.deleteBug(bug.id).subscribe({
        next: () => this.loadBugs(),
        error: (err) => this.error = err.message
      });
    }
  }

  viewBugDetails(bug: Bug) {
    if (bug.id) {
      this.router.navigate(['/bugs', bug.id]);
    }
  }

  canCreate(): boolean {
    return this.userRole === 'Developer' || this.userRole === 'Admin';
  }

  canEdit(): boolean {
    return this.userRole === 'Admin';
  }

  canDelete(): boolean {
    return this.userRole === 'Admin';
  }
}
