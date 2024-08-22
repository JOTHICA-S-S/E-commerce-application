import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userData={email:"",password:"", role:"", gender:""};

  constructor(private authservice:AuthService,private navserv:NavigateService, private route:Router){}


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
            this.navserv.setRole(this.userData.role);
            
        },
        error: err=>{
          console.log(err);
          
        }
      })
    
      
  }

}
