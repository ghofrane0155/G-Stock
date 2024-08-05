import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../../services/fournisseur.service';
import { Fournisseur } from '../../models/fournisseur';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit {
addFournisseur() {
throw new Error('Method not implemented.');
}
  fournisseurs: Fournisseur[] = [];
  paginatedFournisseurs: Fournisseur[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private fournisseurService: FournisseurService) {}

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs().subscribe({
      next: (fournisseurs: Fournisseur[]) => {
        this.fournisseurs = fournisseurs;
        this.totalPages = Math.ceil(this.fournisseurs.length / this.itemsPerPage);
        this.updatePagination();
      },
      error: (err) => {
        console.error('Failed to load fournisseurs', err);
      }
    });
  }

  filterFournisseurs(): void {
    const filtered = this.fournisseurs.filter(f => 
      f.nomFournisseur.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      f.mail.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.paginatedFournisseurs = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.paginatedFournisseurs = this.fournisseurs.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }
  
  deleteFournisseur(id: number | undefined): void {
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
          this.fournisseurService.deleteFournisseur(id).subscribe({
            next: () => {
              this.fournisseurs = this.fournisseurs.filter(f => f.id !== id);
              Swal.fire('Deleted!', 'Fournisseur has been deleted.', 'success');
            },
            error: (err) => {
              Swal.fire(
                'Error!', 'Failed to delete fournisseur.', 'error');
                console.error('Failed to delete fournisseur', err);
              }
          });
        }
      });
    }
  }



}
