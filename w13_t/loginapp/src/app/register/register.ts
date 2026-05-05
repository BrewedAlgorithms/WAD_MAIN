import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

   uname: string = "";
   uemail: string = "";
   upass: string = "";

   register() {

      localStorage.setItem("uname", this.uname);
      localStorage.setItem("uemail", this.uemail);
      localStorage.setItem("upass", this.upass);

      alert("Successfully registerd.")

      window.location.href = '/login'
    
   }
  
}
