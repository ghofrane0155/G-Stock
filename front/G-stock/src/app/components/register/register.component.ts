import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationRequest } from '../../models/registration-request';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Corrected 'styleUrl' to 'styleUrls'
})
export class RegisterComponent {
  registerRequest: RegistrationRequest = {
    email: '', firstname: '', lastname: '', password: '',
    dateOfBirth: '',
    phone: ''
  };
  errorMsg: string = '';
  errorMsgs: Array<string> = [];
  currentErrorIndex: number = 0;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  register() {
    this.errorMsg = '';
    this.errorMsgs = [];
    this.currentErrorIndex = 0;
    this.authService.register(this.registerRequest) // Corrected service method call
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          console.log('Error:', err); // Log the entire error object
          if (err.error && typeof err.error === 'object') {
            const errorJson = err.error;
            if (errorJson.validationErrors) {
              this.errorMsgs = errorJson.validationErrors;
              this.displayNextError();
            } else {
              this.errorMsg = errorJson.error || 'An unknown error occurred.';
            }
          } else {
            this.errorMsg = 'An unknown error occurred.';
          }
          this.cdr.detectChanges(); // Trigger change detection manually
        }
      });
  }

  displayNextError() {
    if (this.currentErrorIndex < this.errorMsgs.length) {
      this.errorMsg = this.errorMsgs[this.currentErrorIndex];
      this.currentErrorIndex++;
      this.cdr.detectChanges(); // Trigger change detection manually
    } else {
      this.errorMsg = '';
    }
  }

  login() {
    this.router.navigate(['login']);
  }
}
