import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../navigate.service';
import { Router } from '@angular/router';
import { BehaviorSubject, count } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
    productsData:any=[];
    columns: any[] = [];
    data: any[] = [];
    cartCountComp:number=0;
    

  constructor(private navService:NavigateService, private route:Router){}

      ngOnInit(): void {
        this.get();
        this.navService.cartCounted.subscribe(
          res=>
            this.cartCountComp=res
        );
        //console.log("incartcomp");
        
       }

      ngAfterViewInit(){
        const element = document.getElementById("tabs-895821743");
        DDS.Tabs(element);
      }

      get()
      {  
          this.navService.getProducts().subscribe({
            next:res=>{
                // console.log(res);
                this.productsData=res;
                this.processData(res);
                // console.log("inside get");
                // console.log(this.productsData);  
                
            },
            error: err=>{
              
                console.log(err);
                this.route.navigate(["/SignIn"]);
                localStorage.removeItem("token");
              
            }
          })
      }


      processData(response: any[]){
        // Getting the keys of the first object in teh array as all objects has similar keys
        const keys = Object.keys(response[0]);
        // console.log("entered processData");
        // console.log(Object.keys(response[0]));
        // console.log(response[0]);
        // console.log("keys : "+keys);
        // console.log("response.keys:"+response.keys());
        
        
        // Creating columns array from keys
        this.columns = keys.map(key => ({ value: key}));
        // console.log(this.columns);
        // console.log("keys after mapping : "+keys);
        
        
        // Creating data array as per the template
        this.data = response.map(item => {
                                        return{
                                          columns: keys.map(key =>{
                                            return{value: item[key]}})
              
          
        }});
        // console.log("data is");
        
        // console.log(this.data);
        
        this.initializeTable();
      }

      initializeTable() {
        const element = document.getElementById("table-998110420");
        // console.log("entered table initialization");

        DDS.Table(element, {
          data:this.data,
          columns:this.columns
        });
      }

  // addToCart(product:any)
  // {
  //   product.inCart=true;

  //   //updating cart value in products 
  //   // this.navService.updateCart(product.id,true).subscribe(
  //   //   res=>console.log(`res from add to cart ${JSON.stringify(res)}`)
  //   // );

  //   this.navService.updateCart_user(product.id).subscribe(
  //     res=>console.log(`res after adding cart to user ${JSON.stringify(res)}`)
  //   );

  //   this.cartCountComp=this.cartCountComp+1;
  //   this.navService.cartCount.next(this.cartCountComp);
  //   console.log(`count after added is ${this.cartCountComp}`);

  // }

  //updating boolean value in products database which is not correct approach
  // removeFromCart(product:any)
  // {
  //   product.inCart=false;
  //   this.navService.updateCart(product.id,false).subscribe();
  //   this.cartCountComp=this.cartCountComp-1;
  //   this.navService.cartCount.next(this.cartCountComp);
  //   console.log(`count after removed is ${this.cartCountComp}`);
  // }
  

  AddProductToUserCart(data:any){
    console.log(`in added to cart`);
    
    this.navService.AddToUserCart((data.id)).subscribe(res=>
      console.log(`res from product compoenent ${res}`));
  }

  RemoveProductFromUserCart(data:any){
    this.navService.removeFromUserCart(data.id).subscribe(res=>
      console.log(`res from product compoenent ${res}`)
    );
  }
}

