import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userData={email:"",password:"", role:"", gender:""};

constructor(private authservice:AuthService, private route:Router){}

  showPassword:boolean=false;

  togglePasswordVisibility()
  {
    this.showPassword=!this.showPassword;
  }

  signUp()
  {
      console.log(this.userData);
      this.authservice.signUp(this.userData).subscribe({
        next:res=>{
            console.log(res);
            localStorage.setItem("token",res.token);
            this.route.navigate(["/Products"]);
            
        },
        error: err=>{
          console.log(err);
          
        }
      })
    
      
  }

}
