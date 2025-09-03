import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-token-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="token-display">
      <h3>JWT Token Information</h3>
      <div *ngIf="token; else noToken">
        <div class="token-section">
          <h4>Token</h4>
          <div class="token-value">{{ token }}</div>
        </div>
        <div class="token-section">
          <h4>User Role</h4>
          <div class="role-value">{{ userRole || 'No role found' }}</div>
        </div>
        <div class="token-section">
          <h4>Decoded Payload</h4>
          <pre class="payload-value">{{ decodedPayload }}</pre>
        </div>
      </div>
      <ng-template #noToken>
        <div class="no-token">No token found. Please login first.</div>
      </ng-template>
    </div>
  `,
  styles: [`
    .token-display {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin: 20px 0;
      background-color: #f9f9f9;
    }
    .token-section {
      margin-bottom: 15px;
    }
    h3, h4 {
      margin-top: 0;
    }
    .token-value {
      word-break: break-all;
      background-color: #eee;
      padding: 10px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 12px;
    }
    .role-value {
      font-weight: bold;
      color: #2c3e50;
      font-size: 16px;
    }
    .payload-value {
      background-color: #eee;
      padding: 10px;
      border-radius: 3px;
      white-space: pre-wrap;
      font-family: monospace;
    }
    .no-token {
      color: #e74c3c;
      font-weight: bold;
    }
  `]
})
export class TokenDisplayComponent implements OnInit {
  token: string | null = null;
  userRole: string | null = null;
  decodedPayload: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.token = this.authService.getToken();
    this.userRole = this.authService.getUserRole();
    
    if (this.token) {
      try {
        // Decode the token payload (middle part)
        const payload = this.token.split('.')[1];
        const decodedJson = atob(payload);
        this.decodedPayload = JSON.stringify(JSON.parse(decodedJson), null, 2);
      } catch (error) {
        this.decodedPayload = 'Error decoding token';
      }
    }
  }
}