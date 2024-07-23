import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent implements OnInit {
  isEditing = false;
  user = {
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '1234 Main St, Anytown, USA',
    dateOfBirth: '1990-01-01',
    oldPassword: '',
    newPassword: ''
  };

  constructor() { }

  ngOnInit(): void { }

  toggleEdit(): void {
    if (this.isEditing) {
      // Logic to save changes
      console.log('Saving changes:', this.user);
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
