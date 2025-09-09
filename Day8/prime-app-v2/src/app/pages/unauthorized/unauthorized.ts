import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <h2>Unauthorized</h2>
    <p>You don't have access</p>
  `,
  styles: []
})
export class UnauthorizedComponent {}