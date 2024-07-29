import { Component, OnInit } from '@angular/core';
import { User } from '../../services/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  // Static user data
  private staticUsers: User[] = [
    { id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
    // Add more static users if needed
    ,{ id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
    ,{ id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
    ,{ id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
    ,{ id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
    ,{ id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
    ,{ id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
    ,{ id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
    ,{ id: 1, firstname: 'Tiger', lastname: 'Nixon', email: 'tiger.nixon@example.com', dateOfBirth: '1962-04-25', phone: '123-456-7890', accountLocked: false },
    { id: 2, firstname: 'Garrett', lastname: 'Winters', email: 'garrett.winters@example.com', dateOfBirth: '1960-07-25', phone: '098-765-4321', accountLocked: true },
    { id: 3, firstname: 'Ashton', lastname: 'Cox', email: 'ashton.cox@example.com', dateOfBirth: '1984-01-12', phone: '555-123-4567', accountLocked: false }
   
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.staticUsers;
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.paginateUsers();
  }

  filterUsers(): void {
    if (this.searchTerm) {
      this.users = this.staticUsers.filter(user =>
        (user.firstname?.toLowerCase() || '').includes(this.searchTerm.toLowerCase()) ||
        (user.lastname?.toLowerCase() || '').includes(this.searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.users = this.staticUsers;
    }
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    this.paginateUsers();
  }

  paginateUsers(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateUsers();
    }
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }
}
