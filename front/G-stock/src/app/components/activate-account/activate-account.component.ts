import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {
  message = '';
  isOkay = true;
  submitted = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  private confirmAccount(token: string) {
    this.authService.activateAccount(token)
      .subscribe({
        next: () => {
          this.message = 'Your account has been successfully activated. Now you can proceed to login.';
          this.submitted = true;
        },
        error: () => {
          this.message = 'The token has expired or is invalid.';
          this.submitted = true;
          this.isOkay = false;
        }
      });
  }
  

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  //protected readonly skipUntil = skipUntil;
}
