import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [FormsModule],
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
