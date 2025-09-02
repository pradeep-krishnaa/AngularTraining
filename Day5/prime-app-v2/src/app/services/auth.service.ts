import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = "https://localhost:7128/api/Auth";

  constructor(private http: HttpClient) {}

  // Post login and save JWT
  login(username: string, password: string): Observable<any> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem("jwtToken", res.token);
      }),
      catchError((err) => {
        console.error("Error login", err);
        return throwError(() => new Error("Invalid credentials"));
      })
    );
  }

  // Logout
  logout() {
    localStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}
