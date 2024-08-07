import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  paginatedClients: Client[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showModal: boolean = false;
  editMode: boolean = false;
  clientForm: FormGroup;

  constructor(private clientService: ClientService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      idClient: [null], // Field for the client ID
      nomClient: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      adresseClient: [''],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]] // Phone number validation for exactly 8 digits
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (clients: Client[]) => {
        this.clients = clients;
        this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);
        this.updatePagination();
      },
      error: (err) => {
        console.error('Failed to load clients', err);
      }
    });
  }

  filterClients(): void {
    const filtered = this.clients.filter(c =>
      c.nomClient.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.mail.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.paginatedClients = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.paginatedClients = this.clients.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  deleteClient(id: number | undefined): void {
    if (id !== undefined) {
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
          this.clientService.deleteClient(id).subscribe({
            next: () => {
              this.clients = this.clients.filter(c => c.idClient !== id);
              this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);
              if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
              }
              this.updatePagination();
              Swal.fire('Deleted!', 'Client has been deleted.', 'success');
            },
            error: (err) => {
              Swal.fire('Error!', 'Failed to delete client.', 'error');
              console.error('Failed to delete client', err);
            }
          });
        }
      });
    } else {
      console.error('Client ID is undefined or invalid:', id);
    }
  }

  addClient(): void {
    this.clientService.addClient(this.clientForm.value).subscribe({
      next: (client: Client) => {
        this.clients.push(client);
        this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
        }
        this.updatePagination();
        this.resetForm();
        Swal.fire('Added!', 'Client has been added.', 'success');
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to add client.', 'error');
        console.error('Failed to add client', err);
      }
    });
  }

  editClient(client: Client): void {
    this.editMode = true;
    this.showModal = true;
    this.clientForm.patchValue(client);
  }

  updateClient(): void {
    this.clientService.updateClient(this.clientForm.value).subscribe({
      next: (updatedClient: Client) => {
        const index = this.clients.findIndex(c => c.idClient === updatedClient.idClient);
        if (index !== -1) {
          this.clients[index] = updatedClient;
          this.updatePagination();
          this.resetForm();
          Swal.fire('Updated!', 'Client has been updated.', 'success');
        }
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to update client.', 'error');
        console.error('Failed to update client', err);
      }
    });
  }

  resetForm(): void {
    this.showModal = false;
    this.editMode = false;
    this.clientForm.reset();
    this.clientForm.patchValue({ idClient: null }); // Ensure ID is reset
  }

  openAddClientModal(): void {
    this.editMode = false;
    this.clientForm.reset();
    this.clientForm.patchValue({ idClient: null }); // Ensure ID is reset
    this.showModal = true;
  }
}
