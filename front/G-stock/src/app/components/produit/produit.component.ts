import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../services/services/produit.service';
import { CategorieService } from '../../services/services/category.service';
import { Produit } from '../../services/models/produit';
import { Category } from '../../services/models/category';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  produits: Produit[] = [];
  categories: Category[] = [];
  produitForm: FormGroup;
  editingProduit: boolean = false;
  selectedProduit: Produit | null = null;

  // Properties for search and pagination
  searchTerm: string = '';
  paginatedProduits: Produit[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(
    private produitService: ProduitService,
    private categorieService: CategorieService,
    private fb: FormBuilder
  ) {
    this.produitForm = this.fb.group({
      nomProduit: ['', Validators.required],
      prixUnitaire: [0, [Validators.required, Validators.min(0)]],
      codeBarre: [''],
      description: [''],
      categorieId: [null, Validators.required],
      logo: ['']
    });
  }

  ngOnInit(): void {
    this.getProduits();
    this.getCategories();
  }

  getProduits(): void {
    this.produitService.getProduits().subscribe(
      (data: Produit[]) => {
        this.produits = data;
        this.updatePaginatedProduits();
      },
      error => {
        console.error('Error fetching produits:', error);
      }
    );
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addProduit(): void {
    if (this.produitForm.valid) {
      this.produitService.addProduit(this.produitForm.value).subscribe(
        (produit: Produit) => {
          this.produits.push(produit);
          this.produitForm.reset();
          this.updatePaginatedProduits();
        },
        error => {
          console.error('Error adding produit:', error);
        }
      );
    }
  }

  updateProduit(): void {
    if (this.selectedProduit && this.produitForm.valid) {
      const updatedProduit: Produit = { ...this.selectedProduit, ...this.produitForm.value };
      this.produitService.updateProduit(updatedProduit).subscribe(
        updated => {
          const index = this.produits.findIndex(p => p.idProduit === updated.idProduit);
          if (index !== -1) {
            this.produits[index] = updated;
            this.produitForm.reset();
            this.selectedProduit = null;
            this.editingProduit = false;
            this.updatePaginatedProduits();
          }
        },
        error => {
          console.error('Error updating produit:', error);
        }
      );
    }
  }

  deleteProduit(id?: number): void {
    if (id === undefined) {
      console.error('Produit id is undefined.');
      return;
    }

    this.produitService.deleteProduit(id).subscribe(
      () => {
        this.produits = this.produits.filter(produit => produit.idProduit !== id);
        this.updatePaginatedProduits();
      },
      error => {
        console.error('Error deleting produit:', error);
      }
    );
  }

  editProduit(produit: Produit): void {
    this.selectedProduit = produit;
    this.produitForm.patchValue(produit);
    this.editingProduit = true;
  }

  clearSelection(): void {
    this.selectedProduit = null;
    this.produitForm.reset();
    this.editingProduit = false;
  }

  // Filter produits based on search term
  filteredProduits(): void {
    this.updatePaginatedProduits();
  }

  // Update paginated produits based on the current page and search term
  updatePaginatedProduits(): void {
    const filteredProduits = this.produits.filter(produit => 
      produit.nomProduit?.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      this.searchTerm.trim() === ''
    );

    this.totalPages = Math.ceil(filteredProduits.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProduits = filteredProduits.slice(startIndex, endIndex);
  }

  // Change the current page and update the paginated produits
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProduits();
    }
  }

  // Check if the page is active
  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  // Handle file change
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload here
      this.produitForm.patchValue({ logo: file.name }); // Example, adjust based on actual upload logic
    }
  }
}
