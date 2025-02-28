import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatFormFieldModule,
    MatButtonModule, MatTableModule, MatInputModule, MatCardModule, MatDividerModule, NgIf, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router)

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })

  login() {
    if (!this.loginForm.valid) {
      console.error("Form is invalid!");
      return;
    }
    const email = this.loginForm.value.email?.trim() || '';
    const password = this.loginForm.value.password || '';

    if (!email || !password) {
      console.error("All fields are required.");
      return;
    }

    this.authService.login(email, password).subscribe({
        next: (res) => {
          const token = res.token;
          localStorage.setItem('authToken', token);
          this.authService.setLoginStatus(true); // Update state
          this.router.navigate(['/recipelist']);
        },
        error: (error) => console.log("Error during Login", error),
        complete: () => console.info('complete')
      }
    )
  }

}
