import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  set token(token: string) {
    console.log('Setting token:', token); // Log token being set
    localStorage.setItem('token', token);
  }

  get token() {
    const token = localStorage.getItem('token');
    console.log('Getting token:', token); // Log token being retrieved
    return token as string;
  }

}
