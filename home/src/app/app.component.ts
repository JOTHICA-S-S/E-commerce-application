import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NavigateService } from './navigate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'home';

  productInCart=0;
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


    //subscribe to the behavioursubject for count in navservice and updated in producst-list componenet
    this.navser.cartCounted.subscribe(
      count=>this.productInCart=count
    );
    
  }

  constructor(private router:Router, public authService:AuthService,private navser:NavigateService){}
 

  setselectedItem(url:string)
  {
    if(url.includes("Ecommerce"))
      this.selectedItem="Ecommerce";
    else if(url.includes("SignIn"))
      this.selectedItem="SignIn";
    else if(url.includes("SignUp"))
      this.selectedItem="SignUp";
   else if(url.includes("Products"))
      this.selectedItem="Products";
    else if(url.includes("Trending"))
      this.selectedItem="Trending";
    else if(url.includes("cart"))
      this.selectedItem="cart";
  }
 
  signOut()
  {
      localStorage.removeItem("token");
      this.router.navigate(["/Ecommerce"]);
  }


   
}
