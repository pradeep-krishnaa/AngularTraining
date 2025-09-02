import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  name = '';
  email = '';
  subject = '';
  message = '';

  constructor(private messageService: MessageService) {}

  sendEmail() {
    // Create mailto link
    const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(this.subject)}&body=${encodeURIComponent(
      `Name: ${this.name}\nEmail: ${this.email}\n\nMessage:\n${this.message}`
    )}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    this.messageService.add({
      severity: 'success',
      summary: 'Email Sent',
      detail: 'Your email client should open with the message ready to send.'
    });
    
    // Reset form
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}
