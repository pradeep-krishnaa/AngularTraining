import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DropdownModule, InputTextModule, ButtonModule, CardModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  studentForm!: FormGroup;
  departments = [
    { label: 'Computer Science', value: 'CS' },
    { label: 'Electronics', value: 'ECE' },
    { label: 'Mechanical', value: 'ME' },
    { label: 'Civil', value: 'CE' },
  ];

  constructor(private fb: FormBuilder, private studentService: StudentService) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(45)]],
      department: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.studentService.addStudent(this.studentForm.value);
      alert('Student Registered!');
      this.studentForm.reset();
    }
  }
}
