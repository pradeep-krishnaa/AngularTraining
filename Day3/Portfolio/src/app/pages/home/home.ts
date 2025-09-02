import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show'); // 👈 enables fade-in every scroll
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }
}
