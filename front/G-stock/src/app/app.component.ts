import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentRoute: string | undefined;

  constructor(private authService: AuthenticationService,private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login if not logged in
    }
  }
  isLoginRoute(): boolean {
    return this.currentRoute === '/login' || this.currentRoute === '/register' || this.currentRoute ==='/activate-account';
  }
}
