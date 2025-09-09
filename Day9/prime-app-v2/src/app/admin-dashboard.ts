import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { BugService, BugStats } from './services/bug.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule, ProgressSpinnerModule, MessageModule, ButtonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  stats?: BugStats;
  openResolvedData: any;
  bugsByProjectData: any;
  bugsByStatusData: any;
  loading = true;
  error?: string;

  constructor(private bugService: BugService) {}

  ngOnInit() {
    this.loadBugStats();
  }

  loadBugStats() {
    this.loading = true;
    this.error = undefined;
    
    // Get all bugs and calculate statistics from them
    this.bugService.getBugs().subscribe({
      next: (bugs) => {
        this.stats = this.calculateStatsFromBugs(bugs);
        this.prepareChartData();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  private calculateStatsFromBugs(bugs: any[]): BugStats {
    // Calculate open vs resolved
    const openBugs = bugs.filter(bug => bug.status === 'Open').length;
    const resolvedBugs = bugs.filter(bug => bug.status === 'Closed').length;

    // Calculate bugs by project
    const projectMap = new Map<number, number>();
    bugs.forEach(bug => {
      const projectId = bug.projectId;
      projectMap.set(projectId, (projectMap.get(projectId) || 0) + 1);
    });
    const bugsByProject = Array.from(projectMap.entries()).map(([projectId, count]) => ({
      projectId,
      count
    }));

    // Calculate bugs by status
    const statusMap = new Map<string, number>();
    bugs.forEach(bug => {
      const status = bug.status;
      statusMap.set(status, (statusMap.get(status) || 0) + 1);
    });
    const bugsByStatus = Array.from(statusMap.entries()).map(([status, count]) => ({
      status,
      count
    }));

    return {
      openVsResolved: {
        open: openBugs,
        resolved: resolvedBugs
      },
      bugsByProject,
      bugsByStatus
    };
  }

  private prepareChartData() {
    if (!this.stats) return;

    // Open vs Resolved Doughnut Chart
    this.openResolvedData = {
      labels: ['Open', 'Resolved'],
      datasets: [{
        data: [this.stats.openVsResolved.open, this.stats.openVsResolved.resolved],
        backgroundColor: ['#ff6384', '#36a2eb'],
        hoverBackgroundColor: ['#ff6384', '#36a2eb'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };

    // Bugs by Project Doughnut Chart
    this.bugsByProjectData = {
      labels: this.stats.bugsByProject.map(item => `Project ${item.projectId}`),
      datasets: [{
        data: this.stats.bugsByProject.map(item => item.count),
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', 
          '#9966ff', '#ff9f40', '#ff6384', '#c9cbcb'
        ],
        hoverBackgroundColor: [
          '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', 
          '#9966ff', '#ff9f40', '#ff6384', '#c9cbcb'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };

    // Bugs by Status Doughnut Chart
    this.bugsByStatusData = {
      labels: this.stats.bugsByStatus.map(item => item.status),
      datasets: [{
        data: this.stats.bugsByStatus.map(item => item.count),
        backgroundColor: [
          '#ff6384', '#ffce56', '#4bc0c0'
        ],
        hoverBackgroundColor: [
          '#ff6384', '#ffce56', '#4bc0c0'
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };
  }

  getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const label = context.label || '';
              const value = context.parsed;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      },
      cutout: '60%'
    };
  }

  getPercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return (value / total) * 100;
  }

  getTotalBugs(): number {
    if (!this.stats) return 0;
    return this.stats.openVsResolved.open + this.stats.openVsResolved.resolved;
  }

  getProjectColor(index: number): string {
    const colors = ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40', '#ff6384', '#c9cbcb'];
    return colors[index % colors.length];
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'open':
        return '#ff6384';
      case 'in progress':
        return '#ffce56';
      case 'closed':
        return '#4bc0c0';
      default:
        return '#36a2eb';
    }
  }
}
