import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitService } from '../../services/produit.service';
import { CategoryService } from '../../services/category.service';
import { StockService } from '../../services/stock.service';
import { Produit } from '../../models/produit';
import { Category } from '../../models/category';
import { Stock } from '../../models/stock';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html', // Adjust the path as necessary
})
export class ProduitComponent implements OnInit {
  produits: Produit[] = [];
  categories: Category[] = [];
  stocks: Stock[] = [];

  produitForm: FormGroup;
  editingProduit: boolean = false;
  selectedProduit: Produit | null = null;


  // Properties for search and pagination
  paginatedProduits: Produit[] = [];
  filteredProduits: Produit[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(
    private fb: FormBuilder,
    private produitService: ProduitService,
    private categoryService: CategoryService,
    private stockService: StockService
  ) {
    this.produitForm = this.fb.group({
      nomProduit: ['', Validators.required],
      description: ['', Validators.required],
      prixUnitaire: [null, [Validators.required, Validators.min(0)]],
      categorieId: [null, Validators.required],
      stockId: [null, Validators.required],
      logo: [null, Validators.required],
      quantite: ['', Validators.required], // New field
    });
  }

  ngOnInit(): void {
    this.loadProduits();
    this.loadCategories();
    this.loadStocks();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadStocks() {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    });
  }

  loadProduits() {
    this.produitService.getProduits().subscribe({
      next: (produits: Produit[]) => {
        this.produits = produits;
        this.filteredProduits = produits;
        this.totalPages = Math.ceil(this.filteredProduits.length / this.itemsPerPage);
        this.paginateProducts();
      },
      error: (err) => {
        console.error('Failed to load produits', err);
      }
    });
  }
    
  paginateProducts() {
    this.paginatedProduits = this.filteredProduits.slice(
      (this.currentPage - 1) * this.itemsPerPage, 
      this.currentPage * this.itemsPerPage
    );
  }
  
  filterProducts() {
    if (this.searchTerm) {
      this.filteredProduits = this.produits.filter(p =>
        p.nomProduit?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.codeAB?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        //p.categorie.nomCategorie?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredProduits = [...this.produits]; // Reset to original users if no search term
    }
    this.totalPages = Math.ceil(this.filteredProduits.length / this.itemsPerPage);
    this.paginateProducts();
  }
  
/**********addProduit************** */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.produitForm.patchValue({ logo: file });
    }
  }

  addProduit(): void {
    if (this.produitForm.valid) {
      const formData = new FormData();
      formData.append('nomProduit', this.produitForm.get('nomProduit')?.value);
      formData.append('description', this.produitForm.get('description')?.value);
      formData.append('prixUnitaire', this.produitForm.get('prixUnitaire')?.value);
      formData.append('quantite', this.produitForm.get('quantite')?.value);
      formData.append('categorieId', this.produitForm.get('categorieId')?.value);
      formData.append('stockId', this.produitForm.get('stockId')?.value);
      formData.append('logo', this.produitForm.get('logo')?.value);

      this.produitService.addProduit(formData).subscribe(
        response => {
          console.log('Product added successfully', response);
          Swal.fire('Success', 'Product added successfully', 'success');
          this.loadProduits(); // Reload products after adding
          this.produitForm.reset();
        },
        error => {
          Swal.fire('Error',error.error.error, 'error');
        }
      );
    } else {
      Swal.fire('Warning', 'Form is not valid', 'warning');
    }
  }
/*********************************** */
  editProduct(produit: Produit) {
    this.editingProduit = true;
    this.selectedProduit = produit;
    this.produitForm.patchValue(produit);
  }

  clearSelection(): void {
    this.selectedProduit = null;
    this.produitForm.reset();
    this.editingProduit = false;
  }

  updateProduit() {
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
            this.paginateProducts();
          }
        },
        error => {
          console.error('Error updating produit:', error);
        }
      );
    }
  }

  deleteProduct(id: number|undefined) {
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
          this.produitService.deleteProduit(id).subscribe({
            next: () => {
              this.produits = this.produits.filter(p => p.idProduit !== id);
              // Update pagination
              this.totalPages = Math.ceil(this.produits.length / this.itemsPerPage);
              if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
              }
              this.paginateProducts();

              // this.produits = this.produits.filter(c => c.idProduit !== id);
              // this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
              // if (this.currentPage > this.totalPages) {
              //   this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
              // }
              // this.paginateProducts();

              Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            },
            error: (err) => {
              Swal.fire('Error!', 'Failed to delete product.', 'error');
              console.error('Failed to delete product', err);
            }
          });
        }
      });
    } else {
      console.error('Product ID is undefined or invalid:', id);
    }
  }
/******************************** */
changePage(page: number) {
  if (page > 0 && page <= this.totalPages) {
    this.currentPage = page;
    this.paginateProducts();
  }
}

isActivePage(page: number): boolean {
  return this.currentPage === page;
}

resetForm() {
  this.produitForm.reset();
  this.editingProduit = false;
  this.selectedProduit = null;
}

}
