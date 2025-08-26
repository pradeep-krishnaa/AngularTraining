import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
    
// app component decorator
@Component({
  selector: 'app-root', 
  standalone : true,
  imports: [RouterOutlet , CommonModule , RouterLink , RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('day2-project');
  appName = 'Day 2 Project';
}
