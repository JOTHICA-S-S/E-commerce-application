import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigateService } from '../navigate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  userCartArr:any=[];
  cartArr:any=[];
 
  productsArr:any=[];
  productsInCartArr:any=[];
  isCartEmpty:boolean=false;
  count:any;

  constructor(private navServ:NavigateService,private route:Router){}

  ngOnInit()
  {
    this.getProducts();
    this.navServ.getUserCart().subscribe({
      next:(res)=>{
        this.cartArr=res;
        console.log(`cart array is ${JSON.stringify(this.cartArr)}`);
        console.log(`the cart length is ${this.cartArr.length}`);
        this.count=this.cartArr.length;         
        }
    });
   
  }

  getInCart()
  {
      this.navServ. getUserCart().subscribe({
        next:res=>{
            
            this.userCartArr=res;
            // console.log(`userCartArr is ${JSON.stringify(this.userCartArr)}`);
            this.getProductsInCart();
            
        },
        error: err=>{
            console.log(err);
            console.log(err.error);
            
        }
      })
  }

 getProducts(){
  this.navServ.getProducts().subscribe({
    next:res=>{
      this.productsArr=res;
      // console.log(res);
      
      // console.log(`productsArr is ${JSON.stringify(this.productsArr)}`);
      this.getInCart();
    },
    error:err=>{
      console.log(err);
      
    }
  }
  );
 
  
 }


  getProductsInCart(){
    
      this.productsInCartArr=this.productsArr.filter((productObj: { id: any; })=>
      
        this.userCartArr.some((cart: { productID: any; })=>
                                                              
                                                              cart.productID===productObj.id
                                                          )
                                                            
          
      );
      // console.log(`productsInCartArr is ${this.productsInCartArr}`);
      if(this.productsInCartArr.length===0)
      {
        this.isCartEmpty=true;
      }
      else
      {
        this.isCartEmpty=false;
      }
    
  }

  //updating boolean value for product in product database which is not correct approach
  // removeFromCart(product:any)
  // {
  //   product.inCart=false;
  //   this.navServ.updateCart(product.id,false).subscribe();
  //   this.cartCountComp=this.cartCountComp-1;
  //   this.navServ.cartCount.next(this.cartCountComp);
  //   console.log(`count after removed is ${this.cartCountComp}`); 
  // }



  //removing product Id from the cart property in user database
  
  RemoveProductFromUserCart(data:any){
    this.navServ.removeFromUserCart(data.id).subscribe();    
      this.getProducts();
      this.count--;
      this.navServ.cartCount.next(this.count);
      
    }
  
  

}
