import { Component } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent {
  password = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  resetPassword(): void {
    if (this.password.newPassword === this.password.confirmNewPassword) {
      // Logic to reset password
      console.log('Resetting password:', this.password);
    } else {
      console.error('New passwords do not match.');
    }
  }
}
