import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  paginatedCategories: Category[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  categoryForm: FormGroup;
  editMode: boolean = false;

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      idCategorie: [null], // Field for the category ID
      nomCategorie: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
        this.updatePagination();
      },
      error: (err) => {
        console.error('Failed to load categories', err);
      }
    });
  }

  filterCategories(): void {
    const filtered = this.categories.filter(c =>
      c.nomCategorie?.toLowerCase().includes(this.searchTerm.toLowerCase()) || ''
    );
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.paginatedCategories = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.paginatedCategories = this.categories.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  addCategory(): void {
    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: (category: Category) => {
        this.categories.push(category);
        this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
        }
        this.updatePagination();
        this.resetForm();
        Swal.fire('Added!', 'Category has been added.', 'success');
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to add category.', 'error');
        console.error('Failed to add category', err);
      }
    });
  }

  editCategory(category: Category): void {
    this.editMode = true;
    this.categoryForm.patchValue(category);
  }

  updateCategory(): void {
    this.categoryService.updateCategorie(this.categoryForm.value).subscribe({
      next: (updatedCategory: Category) => {
        const index = this.categories.findIndex(c => c.idCategorie === updatedCategory.idCategorie);
        if (index !== -1) {
          this.categories[index] = updatedCategory;
          this.updatePagination();
          this.resetForm();
          Swal.fire('Updated!', 'Category has been updated.', 'success');
        }
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to update category.', 'error');
        console.error('Failed to update category', err);
      }
    });
  }

  deleteCategory(id: number | undefined): void {
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
          this.categoryService.deleteCategorie(id).subscribe({
            next: () => {
              this.categories = this.categories.filter(c => c.idCategorie !== id);
              this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
              if (this.currentPage > this.totalPages) {
                this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
              }
              this.updatePagination();
              Swal.fire('Deleted!', 'Category has been deleted.', 'success');
            },
            error: (err) => {
              Swal.fire('Error!', 'Failed to delete category.', 'error');
              console.error('Failed to delete category', err);
            }
          });
        }
      });
    } else {
      console.error('Category ID is undefined or invalid:', id);
    }
  }

  resetForm(): void {
    this.editMode = false;
    this.categoryForm.reset();
  }
}
