import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { StudentService, Student } from '../../services/student.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, TableModule, DialogModule, DropdownModule, CardModule, InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './students.html',
  styleUrls: ['./students.css'],
})
export class StudentsComponent {
  students: Student[] = [];
  dialogVisible = false;
  editForm!: FormGroup;

  departments = [
    { label: 'Computer Science', value: 'CS' },
    { label: 'Electronics', value: 'ECE' },
    { label: 'Mechanical', value: 'ME' },
    { label: 'Civil', value: 'CE' },
  ];

  constructor(private fb: FormBuilder, private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.students$.subscribe((students) => {
      this.students = students;
    });

    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(16), Validators.max(45)]],
      department: ['', Validators.required],
    });
  }

  showStudentDialog(student: Student) {
    this.dialogVisible = true;
    this.editForm.patchValue(student);
  }
}
