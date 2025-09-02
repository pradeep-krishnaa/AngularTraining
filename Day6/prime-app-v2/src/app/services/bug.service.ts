import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Bug {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  projectId: number;
}

@Injectable({ providedIn: 'root' })
export class BugService {
  private apiUrl = "https://localhost:7128/api/Bug";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Get all bugs - only if logged in
  getBugs(): Observable<Bug[]> {
    const token = this.authService.getToken();
    
    if (!token) {
      return throwError(() => new Error("You must be logged in to view bugs"));
    }

    return this.http.get<Bug[]>(this.apiUrl).pipe(
      catchError((err) => {
        console.error("Error fetching bugs", err);
        if (err.status === 401) {
          // Token expired or invalid
          this.authService.logout();
          return throwError(() => new Error("Session expired. Please login again."));
        }
        return throwError(() => new Error("Failed to load bugs"));
      })
    );
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.authService.getToken() !== null;
  }
}
