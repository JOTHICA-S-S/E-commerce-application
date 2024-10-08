import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavigateService } from '../navigate.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  @ViewChild('ModalComponent', { read: ViewContainerRef, static: true })container!: ViewContainerRef;
  selectedItem:string='';
  cartCount:any;
  cartArr:any=[];
  count:any;

  constructor(private router:Router, public authService:AuthService,private navser:NavigateService){
    this.router.events.subscribe(
      event=>{
           //NavigationEnd is the event that gets triggered when the routing is done
           //So need to check whether the event we captured is instance of navigation url
           //intancece of mean, checking whther the created one is of same type or cerated from same class deriving same properties.
           if(event instanceof NavigationEnd)
           {
             this.setselectedItem(event.urlAfterRedirects);
            //  console.log(event.urlAfterRedirects);
            //  console.log(event);
           }
       });      
  }
 
  
  ngOnInit(): void {
    //used for routes when initialized, not required as we are redirecting from beggining
    // this.setselectedItem(this.router.url);
    // console.log( this.router);

    //subscribe to the behavioursubject for count in navservice and updated in producst-list componenet
    this.navser.getUserCart().subscribe({
      next:(res)=>{
        this.cartArr=res;
        // console.log(`cart array is ${this.cartArr}`);
        // console.log(this.cartArr.length);
        this.count=this.cartArr.length;      
          this.navser.cartCount.next(this.count);      
        }
    });


   this.navser.cartCounted.subscribe(count=>
              {this.cartCount=count;}
   );    
  }

 

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
      localStorage.removeItem("emailLogged");
      this.router.navigate(["/SignIn"]);
  }

  openModel()
{
this.container.clear();
const componentRef=this.container.createComponent(ModalComponent);
componentRef.instance.closeEvent.subscribe((res:boolean)=>
  {if(res){
    this.closeModel();
  }});
}

closeModel()
{
  this.container.clear();
}

}
