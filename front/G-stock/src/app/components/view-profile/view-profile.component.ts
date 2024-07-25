import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent implements OnInit {
  isEditing = false;  
  currentUser: any = {}; 

  constructor() { }

  ngOnInit(): void { 
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        this.currentUser = JSON.parse(userJson);
        console.log('currentUser:', this.currentUser);
      } catch (error) {
        console.error('Failed to parse user data from local storage:', error);
      }
    } else {
      console.error('No user data found in local storage');
    }
  }

  toggleEdit(): void {
    if (this.isEditing) {
      // Logic to save changes
      console.log('Saving changes:', this.currentUser);
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
}
