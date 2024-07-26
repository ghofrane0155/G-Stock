import { ChangeDetectorRef, Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
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
    this.authService.register({body: this.registerRequest})
      .subscribe({
        next: (res) => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          console.log('Error:', err); // Log the entire error object
          if (err.error instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
              const errorText = reader.result as string;
              try {
                const errorJson = JSON.parse(errorText);
                if (errorJson.validationErrors) {
                  this.errorMsgs = errorJson.validationErrors;
                  this.displayNextError();
                } else {
                  this.errorMsg = errorJson.error;
                }
              } catch (e) {
                this.errorMsg = 'An unknown error occurred.';
              }
              this.cdr.detectChanges(); // Trigger change detection manually
            };
            reader.readAsText(err.error);
          } else {
            if (err.error.validationErrors) {
              this.errorMsgs = err.error.validationErrors;
              this.displayNextError();
            } else {
              this.errorMsg = err.error.error;
            }
            this.cdr.detectChanges(); // Trigger change detection manually
          }
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
