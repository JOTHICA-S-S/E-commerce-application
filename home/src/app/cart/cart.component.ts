import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../navigate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  cartArr:any=[];
  cartCountComp:number=0;

  constructor(private navServ:NavigateService,private route:Router){}

  ngOnInit()
  {
    this.getInCart();

    this.navServ.cartCounted.subscribe(
      res=>
        this.cartCountComp=res
    
    );
  }

  getInCart()
  {
      this.navServ.getProducts().subscribe({
        next:res=>{
            // console.log(res);
            this.cartArr=res;
            
            
        },
        error: err=>{
          
            console.log(err);
            this.route.navigate(["/SignIn"]);
            localStorage.removeItem("token");
          
        }
      })
  }

  addToCart(product:any)
  {
    product.inCart=true;
    this.navServ.updateCart(product.id,true).subscribe();
    this.cartCountComp=this.cartCountComp+1;
    this.navServ.cartCount.next(this.cartCountComp);
    console.log(`count after added is ${this.cartCountComp}`);

  }

  removeFromCart(product:any)
  {
    product.inCart=false;
    this.navServ.updateCart(product.id,false).subscribe();
    this.cartCountComp=this.cartCountComp-1;
    this.navServ.cartCount.next(this.cartCountComp);
    console.log(`count after removed is ${this.cartCountComp}`);
    
  }

}
