import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    let user = JSON.parse(localStorage.getItem("user") || '{}');

    if (this.email === user.email && this.password === user.password) {
      localStorage.setItem("loggedIn", "true");
      this.router.navigate(['/profile']);
    } else {
      alert("Invalid login");
    }
  }
}