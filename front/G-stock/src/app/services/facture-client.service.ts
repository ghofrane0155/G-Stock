import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactureClient } from '../models/factureClient';

@Injectable({
  providedIn: 'root'
})
export class FactureClientService {
  private baseUrl = `${environment.apiUrl}/user/FactureClient`;

  constructor(private http: HttpClient) {}

  addFactureClient(factureClient: FactureClient, bonCommandeId: number): Observable<FactureClient> {
    return this.http.post<FactureClient>(`${this.baseUrl}/add/${bonCommandeId}`, factureClient);
  }

  getAllFactureClients(): Observable<FactureClient[]> {
    return this.http.get<FactureClient[]>(`${this.baseUrl}/getAll`);
  }

 }
