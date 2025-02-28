import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,MatCardModule,MatButtonModule,MatDividerModule,NgIf,MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService)

  formSignUp = this.formBuilder.group({
    username: ['',[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required,Validators.minLength(4)]],
  })

  signup() {
    if (!this.formSignUp.valid) {
        console.error("Form is invalid!");
        return;
    }
    // Ensure values are not null or undefined
    const username = this.formSignUp.value.username?.trim() || '';  // Prevent null usernames
    const email = this.formSignUp.value.email?.trim() || '';
    const password = this.formSignUp.value.password || '';

    if (!username || !email || !password) {
        console.error("All fields are required.");
        alert("Please fill in all fields before signing up.");
        return;
    }
    
    this.authService.signup(username, email, password).subscribe({
        next: (response) => (console.log("Signup successful!", response)),
        error: (error) => {
            console.error("Signup failed:", error);
            alert(error.error?.message || "Signup failed! Try again.");
        },
        complete: () => console.info("Signup process completed."),
    });
}


}