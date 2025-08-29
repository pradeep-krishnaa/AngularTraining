import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {}

  // Get all bugs
  getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.apiUrl).pipe(
      catchError((err) => {
        console.error("Error fetching bugs", err);
        return throwError(() => new Error("Failed to load bugs"));
      })
    );
  }
}
