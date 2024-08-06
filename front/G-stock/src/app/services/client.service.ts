import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = `${environment.apiUrl}/user/client`;

  constructor(private http: HttpClient) {}

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.baseUrl}/add`, client);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/getAll`);
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/${id}`);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.baseUrl}/update`, client);
  }

  deleteClient(id: number): Observable<void> {
    console.log(`Deleting client with ID: ${id}`);
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
