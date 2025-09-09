import { Component } from '@angular/core';
import { TokenDisplayComponent } from './token-display';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TokenDisplayComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

}
