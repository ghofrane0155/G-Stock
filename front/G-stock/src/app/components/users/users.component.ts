import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.filteredUsers = users;
        this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
        this.paginateUsers();
      },
      error: (err) => {
        console.error('Failed to load users', err);
      }
    });
  }

  filterUsers(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        (user.firstname?.toLowerCase() || '').includes(this.searchTerm.toLowerCase()) ||
        (user.lastname?.toLowerCase() || '').includes(this.searchTerm.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = [...this.users]; // Reset to original users if no search term
    }
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.paginateUsers();
  }

  paginateUsers(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
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

  deleteUser(userId: number | undefined): void {
    if (userId !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(userId).subscribe({
            next: () => {
              Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              );
              this.users = this.users.filter(user => user.id !== userId);
              this.filterUsers();
            },
            error: (err) => {
              Swal.fire(
                'Error!',
                'Failed to delete user.',
                'error'
              );
              console.error('Failed to delete user', err);
            }
          });
        }
      });
    }
  }

  
}
