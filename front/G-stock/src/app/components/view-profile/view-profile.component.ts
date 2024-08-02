import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
  currentUser: User = {} as User;
  originalUser: User = {} as User;
  isEditing = false;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService, // Adjusted service name
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
        this.originalUser = { ...this.currentUser }; // Store original user data
      }
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  saveProfile(form: NgForm) {
    if (form.valid) {
      this.userService.updateUser(this.currentUser) // Corrected service method call
        .subscribe(
          (updatedUser) => {
            this.currentUser = updatedUser;
            this.originalUser = { ...this.currentUser }; // Update original data
            this.isEditing = false;
            this.errorMessage = null;
          },
          (error) => {
            // Handle error
            console.error('Error updating profile:', error);
            this.errorMessage = 'An error occurred while updating the profile. Please try again later.';
          }
        );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  cancelEditing() {
    this.currentUser = { ...this.originalUser }; // Revert to original data
    this.isEditing = false;
    this.errorMessage = null;
  }
}
