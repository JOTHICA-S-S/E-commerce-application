import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent{
  userData={email:"",password:""};

  showPassword:boolean=false;
  isSubmitting:boolean=false;
  errorText:string='';
  showBar:boolean=false;
  userInfo:any=[];

  constructor(private authService:AuthService, private route:Router){}



 

  togglePasswordVisibility()
  {
    this.showPassword=!this.showPassword;
  }

  signIn()
  {
      this.authService.signIn(this.userData).subscribe({
        next:res=>{
            console.log(`res for signIn is ${JSON.stringify(res)}`);
            localStorage.setItem("token",res.token);
            this.route.navigate(["/home/Products"]);
            this.isSubmitting=true;


            //using service to get user Data
            this.authService.getUserData().subscribe({
              next:data=>{
                  this.userInfo=data;
                  console.log(`User data is ${JSON.stringify(this.userInfo)}`);
              }
            });
        }
        ,
        error:err=>{
          
          this.showBar = true;
          console.log(`erroer while suigning in ${err.error}`);
          console.log(`status code ${err.status}`);
          console.log(`error  ${JSON.stringify(err)}`);
          if(!this.userData.email||!this.userData.password)
          {
            this.errorText="Please enter the credentials"
          }
          else{
            this.errorText = JSON.stringify(err.error)||'Unknown error occoured';

          }
          this.userData.email='';
          this.userData.password='';
        }
      })
  }


  closeMessageBar()
  {
    
      this.showBar = false;
  }


}
