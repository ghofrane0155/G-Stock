import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonCommande } from '../models/bon-commande';

@Injectable({
  providedIn: 'root'
})
export class BonCommandeService {

  private baseUrl = `${environment.apiUrl}/user/BonCommande`;

  constructor(private http: HttpClient) {}

  addBonCommande(bonCommande: BonCommande, clientId: number): Observable<BonCommande> {
    return this.http.post<BonCommande>(`${this.baseUrl}/add/${clientId}`, bonCommande);
  }

  getAllBonCommandes(): Observable<BonCommande[]> {
    return this.http.get<BonCommande[]>(`${this.baseUrl}/getAll`);
  }

  updateBonCommande(bonCommande: BonCommande): Observable<BonCommande> {
    return this.http.put<BonCommande>(`${this.baseUrl}/update`, bonCommande);
  }

}
