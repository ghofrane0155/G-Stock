import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit'; // Make sure to create this model
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiUrl = `${environment.apiUrl}/user/produit`;

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/getAll`);
  }

  getProduitById(id: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.apiUrl}/getProduitById/${id}`);
  }

  getProduitsSortedByPrixUnitaire(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.apiUrl}/sortedByPrixUnitaire`);
  }

  addProduit(formData: FormData): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/add`, formData);
}

  

  updateProduit(produit: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiUrl}/update`, produit);
  }

  deleteProduit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
