import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { Stock } from '../../models/stock';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  paginatedStocks: Stock[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  showModal: boolean = false;
  editMode: boolean = false;
  stockForm: FormGroup;

  constructor(private stockService: StockService, private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      idStock: [null], // Field for the stock ID
      label: ['', Validators.required],
      quantite: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadStocks();
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe({
      next: (stocks: Stock[]) => {
        this.stocks = stocks;
        this.totalPages = Math.ceil(this.stocks.length / this.itemsPerPage);
        this.updatePagination();
      },
      error: (err) => {
        console.error('Failed to load stocks', err);
      }
    });
  }

  filterStocks(): void {
    const filtered = this.stocks.filter(s =>
      s.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    this.paginatedStocks = filtered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    this.paginatedStocks = this.stocks.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  isActivePage(page: number): boolean {
    return this.currentPage === page;
  }

  deleteStock(id: number | undefined): void {
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
            this.stockService.deleteStock(id).subscribe({
              next: () => {
                this.stocks = this.stocks.filter(c => c.idStock !== id);
                this.totalPages = Math.ceil(this.stocks.length / this.itemsPerPage);
                if (this.currentPage > this.totalPages) {
                  this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
                }
                this.updatePagination();
                Swal.fire('Deleted!', 'Stock has been deleted.', 'success');
              },
              error: (err) => {
                Swal.fire('Error!', 'Failed to delete Stock.', 'error');
                console.error('Failed to delete Stock', err);
              }
            });
          }
        });
      } else {
        console.error('Category ID is undefined or invalid:', id);
      }
    }

  addStock(): void {
    this.stockService.addStock(this.stockForm.value).subscribe({
      next: (stock: Stock) => {
        this.stocks.push(stock);
        this.totalPages = Math.ceil(this.stocks.length / this.itemsPerPage);
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages > 0 ? this.totalPages : 1;
        }
        this.updatePagination();
        this.resetForm();
        Swal.fire('Added!', 'Stock has been added.', 'success');
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to add stock.', 'error');
        console.error('Failed to add stock', err);
      }
    });
  }

  editStock(stock: Stock): void {
    this.editMode = true;
    this.showModal = true;
    this.stockForm.patchValue(stock);
  }

  updateStock(): void {
    this.stockService.updateStock(this.stockForm.value).subscribe({
      next: (updatedStock: Stock) => {
        const index = this.stocks.findIndex(s => s.idStock === updatedStock.idStock);
        if (index !== -1) {
          this.stocks[index] = updatedStock;
          this.updatePagination();
          this.resetForm();
          Swal.fire('Updated!', 'Stock has been updated.', 'success');
        }
      },
      error: (err) => {
        Swal.fire('Error!', 'Failed to update stock.', 'error');
        console.error('Failed to update stock', err);
      }
    });
  }

  resetForm(): void {
    this.showModal = false;
    this.editMode = false;
    this.stockForm.reset();
    this.stockForm.patchValue({ idStock: null }); // Ensure ID is reset
  }

  openAddStockModal(): void {
    this.editMode = false;
    this.stockForm.reset();
    this.stockForm.patchValue({ idStock: null }); // Ensure ID is reset
    this.showModal = true;
  }
}
