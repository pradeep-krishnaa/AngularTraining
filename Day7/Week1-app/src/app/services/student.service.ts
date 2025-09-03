import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Student {
  name: string;
  email: string;
  age: number;
  department: string;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private studentsSubject = new BehaviorSubject<Student[]>([
    { name: 'John Doe', email: 'john@example.com', age: 22, department: 'CS' },
    { name: 'Jane Smith', email: 'jane@example.com', age: 20, department: 'ECE' },
  ]);

  students$ = this.studentsSubject.asObservable();

  getStudents(): Student[] {
    return this.studentsSubject.value;
  }

  addStudent(student: Student) {
    const current = this.studentsSubject.value;
    this.studentsSubject.next([...current, student]);
  }
}
