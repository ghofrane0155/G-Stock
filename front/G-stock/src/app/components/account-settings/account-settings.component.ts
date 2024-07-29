import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthenticationService } from '../../services/services';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent {
  password = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthenticationService,
    private router: Router, // Inject Router
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef) 
    ) { }

  resetPassword(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    if (this.password.newPassword !== this.password.confirmNewPassword) {
      this.errorMessage = 'New passwords do not match.';
      return;
    }

    // Retrieve userId from localStorage or another source
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;

    if (userId) {
      const params = {
        userId: userId,
        body: {
          currentPassword: this.password.oldPassword,
          newPassword: this.password.newPassword
        }
      };
      this.authService.resetPassword(params).subscribe(
        () => {
          this.successMessage = 'Password reset successfully';
          this.errorMessage = '';
          localStorage.removeItem('user');
          this.router.navigate(['login']);
          form.reset();  // Reset form after successful submission
        },
        (error: any) => {
          this.errorMessage = 'Old Password is incorrect';
          this.successMessage = '';
          console.error('Error resetting password', error);
        }
      );
    } else {
      this.errorMessage = 'User ID not found.';
    }
  }
}
