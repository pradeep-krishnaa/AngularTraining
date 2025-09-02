import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { BugService, Bug } from '../../services/bug.service';

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

  constructor(private bugService: BugService) {}

  ngOnInit() {
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
      }
    });
  }
}
