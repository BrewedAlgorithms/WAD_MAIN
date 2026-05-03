import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {

  user: any = {};

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user") || '{}');

    if (!localStorage.getItem("loggedIn")) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem("loggedIn");
    this.router.navigate(['/login']);
  }
}