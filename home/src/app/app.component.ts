import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'home';

  selectedItem:string='';
  ngOnInit(): void {
    //used for routes when initialized, not required as we are redirecting from beggining
    // this.setselectedItem(this.router.url);
    // console.log( this.router);

    this.router.events.subscribe(
   event=>{
        //NavigationEnd is the event that gets triggered when the routing is done
        //So need to check whether the event we captured is instance of navigation url
        //intancece of mean, checking whther the created one is of same type or cerated from same class deriving same properties.
        if(event instanceof NavigationEnd)
        {
          this.setselectedItem(event.urlAfterRedirects);
          console.log(event.urlAfterRedirects);
          console.log(event);
        }
    })

    window.addEventListener("AuthFromProductsMfe",()=>{
      let Data=localStorage.getItem("AuthInfo");
      { 
          if(Data==="false")
          {
            localStorage.removeItem("token");
            this.router.navigate(["/SignIn"]);
          }
      }
    });
    
  }

  constructor(private router:Router, public authService:AuthService){}
 

  setselectedItem(url:string)
  {
    if(url.includes("Ecommerce"))
      this.selectedItem="Ecommerce";
    if(url.includes("SignIn"))
      this.selectedItem="SignIn";
    if(url.includes("SignUp"))
      this.selectedItem="SignUp";
    if(url.includes("products"))
      this.selectedItem="products";
  }
 
  signOut()
  {
      localStorage.removeItem("token");
      this.router.navigate(["/Ecommerce"]);
  }

  navigateToProducts()
  {
    this.router.navigate(["/products-mfe"]);
  }


   
}
