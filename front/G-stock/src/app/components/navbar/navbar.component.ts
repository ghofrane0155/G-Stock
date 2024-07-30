import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  currentUser: any = {};

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  }

  logout(){
    localStorage.removeItem('user');
  }
}
