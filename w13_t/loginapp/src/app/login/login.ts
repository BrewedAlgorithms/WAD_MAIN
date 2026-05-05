import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  uemail: string = "";
  upass: string = "";

  login() {
    let luemail = localStorage.getItem("uemail");
    let lupass = localStorage.getItem("upass");

    if(this.uemail == luemail && this.upass == lupass) {
      alert("Login Successful");

      window.location.href = '/dash'
    } else {
      alert("Invalid Email or Password");
    }
  }
  
}
