import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'token';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  set token(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Setting token:', token); // Log token being set
      localStorage.setItem(this.tokenKey, token);
    }
  }

  get token(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.tokenKey);
      console.log('Getting token:', token); // Log token being retrieved
      return token;
    }
    return null;
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Removing token'); // Log token removal
      localStorage.removeItem(this.tokenKey);
    }
  }

  clear(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Clearing all tokens'); // Log token clearing
      localStorage.clear();
    }
  }
}
