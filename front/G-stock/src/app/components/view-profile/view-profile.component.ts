import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/services';
import { Router } from 'express';
import { User } from '../../services/models';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent implements OnInit {
  currentUser: User = {} as User;
  originalUser: User = {} as User;
  isEditing = false;

  constructor(private userControllerService: UserControllerService) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.originalUser = { ...this.currentUser }; // Store original user data
    }
  }

  enableEditing() {
    this.isEditing = true;
  }

  saveProfile() {
    this.userControllerService.updateUser({ body: this.currentUser })
      .subscribe(
        (updatedUser) => {
          this.currentUser = updatedUser;
          this.originalUser = { ...this.currentUser }; // Update original data
          this.isEditing = false;
        },
        (error) => {
          // Handle error
          console.error('Error updating profile:', error);
        }
      );
  }

  cancelEditing() {
    this.currentUser = { ...this.originalUser }; // Revert to original data
    this.isEditing = false;
  }

}
