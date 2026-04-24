import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.authService.register(this.user)) {
      alert('Registration Successful');
      this.router.navigate(['/profile']);
    }
  }
}
