import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuantiteCommande } from '../models/quantite-commande';

@Injectable({
  providedIn: 'root'
})
export class QuantiteCommandeService {
  private baseUrl = `${environment.apiUrl}/user/QuantiteCommande`;

  constructor(private http: HttpClient) {}

  addQuantiteCommande(quantiteCommande: QuantiteCommande, produitId: number, bonCommandeId: number): Observable<QuantiteCommande> {
    return this.http.post<QuantiteCommande>(`${this.baseUrl}/add/${produitId}/${bonCommandeId}`, quantiteCommande);
  }

  getAllQuantiteCommandes(): Observable<QuantiteCommande[]> {
    return this.http.get<QuantiteCommande[]>(`${this.baseUrl}/getAll`);
  }

  updateQuantiteCommande(quantiteCommande: QuantiteCommande): Observable<QuantiteCommande> {
    return this.http.put<QuantiteCommande>(`${this.baseUrl}/update`, quantiteCommande);
  }

  deleteQuantiteCommande(id: number): Observable<void> {
    console.log(`Deleting QuantiteCommande with ID: ${id}`);
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
