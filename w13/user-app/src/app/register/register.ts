import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  register() {

    if (!this.user.name || !this.user.email || !this.user.password) {
      alert("All fields required");
      return;
    }

    localStorage.setItem("user", JSON.stringify(this.user));

    alert("Registered Successfully");
    this.router.navigate(['/login']);
  }
}