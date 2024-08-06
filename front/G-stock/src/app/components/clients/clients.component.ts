import { Component, OnInit } from '@angular/core';
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
  newClient: Client = {nomClient: '',adresseClient: '',phone: '',mail: ''};

  constructor(private clientService: ClientService) {}

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
/*************delete****************** */
  deleteClient(client: Client): void {
    if (client.idClient) { // This check ensures client.idClient is defined and not 0
      this.clientService.deleteClient(client.idClient).subscribe({
        next: () => {
          // Remove the client from the local list
          this.clients = this.clients.filter(c => c.idClient !== client.idClient);
          // Recalculate total pages and adjust current page if necessary
          this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);
          if (this.currentPage > this.totalPages) {
            this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
          }
          // Update paginated clients
          this.updatePagination();
  
          Swal.fire('Deleted!', 'Client has been deleted.', 'success');
        },
        error: (err) => {
          Swal.fire('Error!', 'Failed to delete client.', 'error');
          console.error('Failed to delete client', err);
        }
      });
    } else {
      console.error('Client ID is undefined or invalid:', client.idClient);
    }
  }
/*************add****************** */
addClient(): void {
  this.clientService.addClient(this.newClient).subscribe({
    next: (client: Client) => {
      this.clients.push(client); // Add the new client to the array
      this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);

      // Adjust current page if it exceeds the total pages
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
      }

      this.updatePagination(); // Update paginated clients
      this.resetForm();
      Swal.fire('Added!', 'Client has been added.', 'success');
    },
    error: (err) => {
      Swal.fire('Error!', 'Failed to add client.', 'error');
      console.error('Failed to add client', err);
    }
  });
}
/*************update****************** */
  editClient(client: Client): void {
    this.editMode = true;
    this.showModal = true;
    this.newClient = { ...client };
  }

  updateClient(): void {
    this.clientService.updateClient(this.newClient).subscribe({
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
/******************************* */
  resetForm(): void {
    this.showModal = false;
    this.editMode = false;
    this.newClient = {nomClient: '',adresseClient: '',phone: '',mail: ''};
  }

  openAddClientModal(): void {
    this.editMode = false;
    this.showModal = true;
  }
}
