import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  userData={email:"",password:""};

  showPassword:boolean=false;

  constructor(private authService:AuthService, private route:Router){}

  togglePasswordVisibility()
  {
    this.showPassword=!this.showPassword;
  }

  signIn()
  {
      this.authService.signIn(this.userData).subscribe({
        next:res=>{
            console.log(res);
            this.route.navigate(["/products-mfe"]);
        }
        ,
        error:err=>{
          console.log(err);
          
        }
      })
  }


}
