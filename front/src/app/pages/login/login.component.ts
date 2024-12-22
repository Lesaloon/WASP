// src/app/login/login.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Import your AuthService

// Define an interface for the expected response
interface AuthResponse {
	success: boolean;
	// Add other properties if needed
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	error: string | null = null; // To store error messages

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required /*, Validators.minLength(6)*/]],
		});
	}

	ngOnInit(): void {}

	onSubmit(): void {
		if (!this.loginForm.valid) {
			return;
		}
		const { email, password } = this.loginForm.value;

		this.authService.login(email, password).subscribe({
			next: (response: AuthResponse) => {
				if (response.success) {
					// Navigate to the dashboard on successful login
					this.router.navigate(['/dashboard']);
				} else {
					// Handle unsuccessful login
					this.error = 'Identifiants invalides. Veuillez réessayer.';
				}
			},
			error: (err: any) => {
				// Handle error from AuthService
				this.error = 'Une erreur est survenue : ' + err.message;
			},
		});
	}
}
