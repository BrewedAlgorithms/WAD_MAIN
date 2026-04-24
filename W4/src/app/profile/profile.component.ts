import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authService.getProfile();
  }
}
