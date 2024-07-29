import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/services';
import { Router } from 'express';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrl: './view-profile.component.scss'
})
export class ViewProfileComponent implements OnInit {
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
}
