// src/app/auth/authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationRequest } from '../models/registration-request';
import { AuthenticationRequest } from '../models/authentication-request';
import { AuthenticationResponse } from '../models/authentication-response';
import { ResetPasswordRequest } from '../models/reset-password-request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(request: RegistrationRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, request);
  }

  authenticate(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request);
  }

  activateAccount(token: string): Observable<void> {
    return this.http.get<void>(`${this.baseUrl}/activate-account?token=${token}`);
  }

  resetPassword(userId: number, request: ResetPasswordRequest): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/resetpass/${userId}`, request);
  }

  logOut(userId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout/${userId}`, {});
  }
}
