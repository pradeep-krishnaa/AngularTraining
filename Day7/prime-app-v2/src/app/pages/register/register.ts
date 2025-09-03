import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';
  isLoading = false;
  roles = ['Developer', 'Tester'];

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['Developer', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = '';
      
      const { username, password, role } = this.registerForm.value;
      this.auth.register(username!, password!, role!).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Registration Successful! Please login.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.message || 'Registration failed. Please try again.';
        }
      });
    }
  }
}