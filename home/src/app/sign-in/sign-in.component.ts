import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit{
  @ViewChild ('messageBar') messageBar!:ElementRef<HTMLElement>;
  messageBarInstance:any;
  userData={email:"",password:""};

  showPassword:boolean=false;
  isSubmitting:boolean=false;
  errorText:string='';


  constructor(private authService:AuthService, private route:Router){}

  ngOnInit(): void {
      const element = document.getElementById("messagebar-294578723");
      DDS.MessageBar(element, { timer: true, timerDuration: 40 });
        
    
  }

  ngAfterViewInit()
  {
    this.messageBarInstance =new DDS.MessageBar(this.messageBar.nativeElement);
  }

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
            this.route.navigate(["/Products"]);
            this.isSubmitting=true;
        }
        ,
        error:err=>{
          this.messageBar.nativeElement.style.display = 'block';

          console.log(`erroer while suigning in ${err.error}`);
          console.log(`status code ${err.status}`);
          console.log(`error  ${JSON.stringify(err)}`);
          if(!this.userData.email||!this.userData.password)
          {
            this.errorText="Please enter the credentials"
          }
          else{
            this.errorText = err.error||'Unknown error occoured';
          }
        }
      })
  }


  closeMessageBar()
  {
      this.messageBarInstance.nativeElement.style.display = 'none';
  }


}
