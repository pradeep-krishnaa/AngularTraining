import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.html',
  styleUrls: ['./education.css']
})
export class EducationComponent implements AfterViewInit {

  ngAfterViewInit() {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show'); // 👈 remove when out of view
        }
      });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
  }
}
