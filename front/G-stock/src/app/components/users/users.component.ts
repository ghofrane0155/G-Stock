import { Component, OnInit } from '@angular/core';
import { User } from '../../services/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';

  // Static user data
  private staticUsers: User[] = [
    { id: 1, firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com', dateOfBirth: '1990-01-01', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Jane', lastname: 'Smith', email: 'jane.smith@example.com', dateOfBirth: '1985-05-15', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Alice', lastname: 'Johnson', email: 'alice.johnson@example.com', dateOfBirth: '1992-07-20', phone: '555-123-4567', accountLocked: false },
    { id: 4, firstname: 'Bob', lastname: 'Brown', email: 'bob.brown@example.com', dateOfBirth: '1988-11-30', phone: '555-987-6543', accountLocked: false }
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Mock loading users from an API
    this.users = this.staticUsers;
  }

  updateUser(user: User): void {
    console.log('Update user:', user);
    // Implement update logic here
  }

  deleteUser(userId: number): void {
    console.log('Delete user with ID:', userId);
    // Implement delete logic here
  }

  lockUnlockUser(userId: number, lock: boolean): void {
    console.log('Lock/Unlock user with ID:', userId, 'Lock:', lock);
    // Implement lock/unlock logic here
  }
}
