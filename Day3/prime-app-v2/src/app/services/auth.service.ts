import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = "https://localhost:7128/api/Auth";

  constructor(private http: HttpClient) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      catchError((err) => {
        console.error("Error login", err);
        return throwError(() => new Error("Invalid credentials"));
      })
    );
  }
}
