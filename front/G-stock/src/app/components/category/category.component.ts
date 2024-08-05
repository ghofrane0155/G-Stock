import { Component, OnInit } from '@angular/core';
import { Category } from '../../services/models';
import { CategorieService } from '../../services/services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { idCategorie: undefined, nomCategorie: '', produits: [] };
  selectedCategory: Category | null = null;

  // Properties for search and pagination
  searchTerm: string = '';
  paginatedCategories: Category[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  constructor(private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categorieService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
        this.updatePaginatedCategories();
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  addCategory(): void {
    if (this.newCategory.nomCategorie && this.newCategory.nomCategorie.trim()) {
      this.categorieService.addCategory(this.newCategory).subscribe(
        (category: Category) => {
          this.categories.push(category);
          this.newCategory = { idCategorie: undefined, nomCategorie: '', produits: [] };
          this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
          this.updatePaginatedCategories();
        },
        error => {
          console.error('Error adding category:', error);
        }
      );
    }
  }

  updateCategory(category: Category): void {
    this.categorieService.updateCategorie(category).subscribe(
      updatedCategory => {
        const index = this.categories.findIndex(c => c.idCategorie === updatedCategory.idCategorie);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
          this.updatePaginatedCategories();
        }
      },
      error => {
        console.error('Error updating category:', error);
      }
    );
  }

  deleteCategory(id?: number): void {
    if (id === undefined) {
      console.error('Category id is undefined.');
      return;
    }
  
    this.categorieService.deleteCategorie(id).subscribe(
      () => {
        this.categories = this.categories.filter(category => category.idCategorie !== id);
        this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
        this.updatePaginatedCategories();
      },
      error => {
        console.error('Error deleting category:', error);
      }
    );
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
  }

  clearSelection(): void {
    this.selectedCategory = null;
  }

  // Filter categories based on search term
  filterCategories(): void {
    this.updatePaginatedCategories();
  }

  // Update paginated categories based on the current page and search term
  updatePaginatedCategories(): void {
    const filteredCategories = this.categories.filter(category => 
      category.nomCategorie?.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      this.searchTerm.trim() === ''
    );

    this.totalPages = Math.ceil(filteredCategories.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCategories = filteredCategories.slice(startIndex, endIndex);
  }

  // Change the current page and update the paginated categories
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCategories();
    }
  }

  // Check if the page is active
  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }
}
