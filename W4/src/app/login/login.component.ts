import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.login(this.credentials.email, this.credentials.password)) {
      alert('Login Succeed');
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid credentials');
    }
  }
}
