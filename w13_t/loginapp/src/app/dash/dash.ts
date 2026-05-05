import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dash',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './dash.html',
  styleUrl: './dash.css',
})
export class DashComponent {

  uname: string = localStorage.getItem("uname") || "";

  constructor(private router: RouterOutlet) {
    this.uname = localStorage.getItem("uname") || "";
  }


  
}
