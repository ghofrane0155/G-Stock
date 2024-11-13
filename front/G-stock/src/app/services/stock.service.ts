import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = `${environment.apiUrl}/user/Stock`;

  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/getAll`);
  }

  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${this.apiUrl}/add`, stock);
  }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put<Stock>(`${this.apiUrl}/update`, stock);
  }

  deleteStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }}
