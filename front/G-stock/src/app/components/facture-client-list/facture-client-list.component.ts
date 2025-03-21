import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FactureClientService } from '../../services/facture-client.service';
import { FactureClient } from '../../models/factureClient';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facture-client-list',
  templateUrl: './facture-client-list.component.html',
  styleUrls: ['./facture-client-list.component.scss']
})
export class FactureClientListComponent implements OnInit {
  factureClients: FactureClient[] = [];
  paginatedFactureClients: FactureClient[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showModal: boolean = false;
  factureForm: FormGroup;

  constructor(
    private factureClientService: FactureClientService,
    private fb: FormBuilder
  ) {
    this.factureForm = this.fb.group({
      idFactureClient: [null], // Field for the facture ID
      dateFactureClient: ['', Validators.required],
      prixTotal: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadFactureClients();
  }

  loadFactureClients(): void {
    this.factureClientService.getAllFactureClients().subscribe({
      next: (data: FactureClient[]) => {
        this.factureClients = data;
        this.totalPages = Math.ceil(this.factureClients.length / this.itemsPerPage);
        this.updatePagination();
      },
      error: (err) => console.error('Failed to load facture clients', err)
    });
  }

  filterFactureClients(): void {
    const filtered = this.factureClients.filter(f =>
      f.prixTotal.toString().includes(this.searchTerm) || 
      f.dateFactureClient.includes(this.searchTerm)
    );
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.paginatedFactureClients = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.paginatedFactureClients = this.factureClients.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  deleteFactureClient(id: number | undefined): void {
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
          this.factureClientService.deleteFactureClient(id).subscribe({
            next: () => {
              Swal.fire('Deleted!', 'The facture has been deleted.', 'success');
              this.loadFactureClients();
            },
            error: (err) => console.error('Failed to delete facture', err)
          });
        }
      });
    }
  }

  openAddFactureModal(): void {
    this.factureForm.reset();
    this.showModal = true;
  }

  addFacture(): void {
    if (this.factureForm.valid) {
      const factureClient: FactureClient = this.factureForm.value;
      const bonCommandeId: number = this.getBonCommandeId(); // Replace with your logic to get the bonCommandeId
  
      this.factureClientService.addFactureClient(factureClient, bonCommandeId).subscribe({
        next: () => {
          Swal.fire('Success!', 'Facture added successfully.', 'success');
          this.resetForm();
          this.loadFactureClients();
        },
        error: (err) => console.error('Failed to add facture', err)
      });
    }
  }
  
  getBonCommandeId(): number {
    return 123; // Replace with actual logic
  }
  
  resetForm(): void {
    this.showModal = false;
    this.factureForm.reset();
  }
}
