import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: any = {};

  constructor(
    private router: Router,
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      this.tokenService.removeToken(); // Remove token on logout
      this.router.navigate(['/login']);
      // Add additional logout logic here if needed
    }
  }
}
