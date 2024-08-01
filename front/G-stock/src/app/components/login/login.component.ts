import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../../services/models';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private tokenService: TokenService
  ) {}

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        // Handle JSON response directly
        if (res && typeof res === 'object') {
          const jsonResponse = res as any;
          this.tokenService.token = jsonResponse.token as string;
          localStorage.setItem('user', JSON.stringify(jsonResponse.user));

          if (this.tokenService.token) {
            this.router.navigate(['dashboard']);
          } else {
            console.error('Failed to set the token');
          }
        } else {
          console.error('Unexpected response type:', res);
        }
      },
      error: (err) => {
        console.log('Error:', err); // Log the entire error object
        // Handle error response directly as JSON
        if (err.error && typeof err.error === 'object') {
          const errorJson = err.error as any;
          if (errorJson.validationErrors) {
            this.errorMsg = errorJson.validationErrors;
          } else {
            this.errorMsg.push(errorJson.error || 'An unknown error occurred.');
          }
        } else {
          this.errorMsg.push('An unknown error occurred.');
        }
        this.cdr.detectChanges(); // Trigger change detection manually
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
