import { Component, OnInit } from '@angular/core';
import { FournisseurService } from '../../services/fournisseur.service';
import { Fournisseur } from '../../models/fournisseur';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  paginatedFournisseurs: Fournisseur[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showModal: boolean = false;
  editMode: boolean = false;
  fournisseurForm: FormGroup;

  constructor(private fournisseurService: FournisseurService, private fb: FormBuilder) {
    this.fournisseurForm = this.fb.group({
      idFournisseur: [null],
      matriculeFiscale: ['', Validators.required],
      nomFournisseur: ['', Validators.required],
      adresseFournisseur: [''],
      phone: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // 8-digit phone number
      mail: ['', [Validators.required, Validators.email]],
      fax: ['']
    });
  }

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
              this.fournisseurs = this.fournisseurs.filter(f => f.idFournisseur !== id);
              this.totalPages = Math.ceil(this.fournisseurs.length / this.itemsPerPage);
              
              if (this.currentPage > this.totalPages && this.totalPages > 0) {
                this.currentPage = this.totalPages;
              }

              this.updatePagination();
              Swal.fire('Deleted!', 'Fournisseur has been deleted.', 'success');
            },
            error: (err) => {
              Swal.fire('Error!', 'Failed to delete fournisseur.', 'error');
              console.error('Failed to delete fournisseur', err);
            }
          });
        }
      });
    }
  }

  addFournisseur(): void {
    if (this.fournisseurForm.valid) {
      this.fournisseurService.addFournisseur(this.fournisseurForm.value).subscribe({
        next: (fournisseur: Fournisseur) => {
          this.fournisseurs.push(fournisseur);
          this.totalPages = Math.ceil(this.fournisseurs.length / this.itemsPerPage);
          
          if (this.currentPage > this.totalPages && this.totalPages > 0) {
            this.currentPage = this.totalPages;
          }

          this.updatePagination();
          this.resetForm();
          Swal.fire('Added!', 'Fournisseur has been added.', 'success');
        },
        error: (err) => {
          Swal.fire('Error!', 'Failed to add fournisseur.', 'error');
          console.error('Failed to add fournisseur', err);
        }
      });
    }
  }

  editFournisseur(fournisseur: Fournisseur): void {
    this.editMode = true;
    this.showModal = true;
    this.fournisseurForm.patchValue(fournisseur);
  }

  updateFournisseur(): void {
    if (this.fournisseurForm.valid) {
      this.fournisseurService.updateFournisseur(this.fournisseurForm.value).subscribe({
        next: (updatedFournisseur: Fournisseur) => {
          const index = this.fournisseurs.findIndex(f => f.idFournisseur === updatedFournisseur.idFournisseur);
          if (index !== -1) {
            this.fournisseurs[index] = updatedFournisseur;
            this.updatePagination();
            this.resetForm();
            Swal.fire('Updated!', 'Fournisseur has been updated.', 'success');
          }
        },
        error: (err) => {
          Swal.fire('Error!', 'Failed to update fournisseur.', 'error');
          console.error('Failed to update fournisseur', err);
        }
      });
    }
  }

  resetForm(): void {
    this.showModal = false;
    this.editMode = false;
    this.fournisseurForm.reset({
      matriculeFiscale: '',
      nomFournisseur: '',
      adresseFournisseur: '',
      phone: '',
      mail: '',
      fax: ''
    });
  }
}
