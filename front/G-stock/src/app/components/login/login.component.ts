import { ChangeDetectorRef, Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationRequest } from '../../services/models';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private tokenService: TokenService
  ) {
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        // Check if the response is a Blob and handle accordingly
        if (res instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const responseText = reader.result as string;
            const jsonResponse = JSON.parse(responseText);
            console.log('Parsed JSON response:', jsonResponse); // Log the parsed JSON response
            this.tokenService.token = jsonResponse.token as string;
            console.log('Token set:', this.tokenService.token); // Log the token after setting it
            if (this.tokenService.token) {
              this.router.navigate(['dashboard']);
            } else {
              console.error('Failed to set the token');
            }
          };
          reader.readAsText(res);
        } else {
          console.error('Unexpected response type:', res);
        }
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
                this.errorMsg = errorJson.validationErrors;
              } else {
                this.errorMsg.push(errorJson.error);
              }
            } catch (e) {
              this.errorMsg.push('An unknown error occurred.');
            }
            this.cdr.detectChanges(); // Trigger change detection manually
          };
          reader.readAsText(err.error);
        } else {
          if (err.error.validationErrors) {
            this.errorMsg = err.error.validationErrors;
          } else {
            this.errorMsg.push(err.error.error);
          }
          this.cdr.detectChanges(); // Trigger change detection manually
        }
      }
    });
  }
  


  register() {
    this.router.navigate(['register']);
  }
}
