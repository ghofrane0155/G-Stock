import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/services';
import { Router } from 'express';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent implements OnInit {
  isEditing = false;  
  currentUser: any = {}; 
  //profileImageSrc: string = '../../../assets/img/profile.jpg'; // Default profile image
  //selectedProfileImage: File | null = null; // To store the selected file

  constructor(private router: Router,
    private userService: UserControllerService) { }

  ngOnInit(): void { 
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        this.currentUser = JSON.parse(userJson);
        //this.profileImageSrc = this.currentUser.profileImage || this.profileImageSrc;
        console.log('currentUser:', this.currentUser);
      } catch (error) {
        console.error('Failed to parse user data from local storage:', error);
      }
    } else {
      console.error('No user data found in local storage');
    }
  }
/*
  toggleEdit(): void {
    if (this.isEditing) {
      this.updateUser();
    }
    this.isEditing = !this.isEditing;
  }

  cancelEdit(): void {
    // Logic to handle canceling edits (e.g., reset form to original values)
    console.log('Edit canceled');
    this.isEditing = false;
  }

  changePhoto(): void {
    // Logic to handle photo change
    alert('Change Photo button clicked');
  }

  onFileChange(event: Event): void {
   /* const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageSrc = reader.result as string; // Update profile image source
      };
      reader.readAsDataURL(file); // Read file as data URL
      // You can also implement logic to upload the file to the server here
    }*/
 /* }

    private updateUser(): void {
      /*this.userService.updateUser({ body: this.currentUser }).subscribe({
        next: (updatedUser) => {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.currentUser = updatedUser; // Update local user data
          this.isEditing = false;
          console.log('User updated successfully:', updatedUser);
        },
        error: (err) => {
          console.error('Failed to update user:', err);
          // Optionally handle errors here
        }
      });*/
   // }
}
