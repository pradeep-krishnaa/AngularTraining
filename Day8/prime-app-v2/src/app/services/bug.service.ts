import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Bug {
  id?: number; // Optional for create
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
  createdAt?: string; // Optional for create
  projectId: number;
  priority: 'High' | 'Medium' | 'Low'; 
  assignedToUserId: number;
}

@Injectable({ providedIn: 'root' })
export class BugService {
  private apiUrl = 'https://localhost:7128/api/Bug';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Get all bugs
  getBugs(): Observable<Bug[]> {
    const token = this.authService.getToken();
    if (!token) {
      return throwError(() => new Error('You must be logged in to view bugs'));
    }

    return this.http.get<Bug[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('Error fetching bugs', err);
        if (err.status === 401) {
          this.authService.logout();
          return throwError(() => new Error('Session expired. Please login again.'));
        }
        if (err.status === 403) {
          return throwError(() => new Error('Access denied. You do not have permission to view bugs.'));
        }
        return throwError(() => new Error('Failed to load bugs'));
      })
    );
  }

  // Create a new bug
  createBug(bug: Omit<Bug, 'id' | 'createdAt'>): Observable<Bug> {
    return this.http.post<Bug>(this.apiUrl, bug, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('Error creating bug', err);
        return throwError(() => new Error('Failed to create bug'));
      })
    );
  }

  // Update an existing bug
  updateBug(id: number, bug: Omit<Bug, 'id' | 'createdAt'>): Observable<Bug> {
    return this.http.put<Bug>(`${this.apiUrl}/${id}`, bug, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('Error updating bug', err);
        return throwError(() => new Error('Failed to update bug'));
      })
    );
  }

  // Delete a bug
  deleteBug(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }).pipe(
      catchError((err) => {
        console.error('Error deleting bug', err);
        return throwError(() => new Error('Failed to delete bug'));
      })
    );
  }

  // Check authentication
  isAuthenticated(): boolean {
    return this.authService.getToken() !== null;
  }
}
