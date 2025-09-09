import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface RegisterRequest {
  userName: string;
  password: string;
  role: string;
}

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
  
  // Register new user
  register(userName: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { userName, password, role }).pipe(
      catchError((err) => {
        console.error("Error registering user", err);
        return throwError(() => new Error(err.error?.message || "Registration failed. Please try again."));
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

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Check for Microsoft identity role claim format
      const msRoleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      return payload[msRoleClaim] || payload.role || null; // Try Microsoft format first, then fallback to simple 'role'
    } catch {
      return null;
    }
  }
}
