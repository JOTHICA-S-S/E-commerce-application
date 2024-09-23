import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../navigate.service';
import { Router } from '@angular/router';
import { BehaviorSubject, count } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
    productsData:any=[];
    columns: any[] = [];
    data: any[] = [];
    cartArr:any=[];
    count:any;
    checkCartArr:any=[];
    loggedUserMail:any;
    loggedUserGender:any;
    loggedUser:any;

  constructor(private navService:NavigateService, private route:Router, private authService:AuthService){}

      ngOnInit(): void {
        
        this.get();
        this.authService.getUserData().subscribe({
          next:data=>{
              
              console.log(`User data is ${JSON.stringify(data)}`);
              this.loggedUserMail=localStorage.getItem('emailLogged');
              console.log(`loggedUserMail is ${this.loggedUserMail}`);
              this.loggedUser=data.find((userInfo: { email: any; })=>userInfo.email===this.loggedUserMail);
              this.loggedUserGender=this.loggedUser.gender;
              console.log(`loggedUserGender is ${this.loggedUserGender}`);
          }
        });
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
                this.navService.getUserCart().subscribe({
                  next:(res)=>{
                    this.cartArr=res;
                    this.checkCartArr=this.cartArr;
                    console.log(`cart array is ${JSON.stringify(this.cartArr)}`);
                    console.log(`the cart length is ${this.cartArr.length}`);
                    this.count=this.cartArr.length;         
                    }
                });
                
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
  

  AddProductToUserCart(data:any){
    console.log(`in added to cart`);   
    this.navService.AddToUserCart(data.id).subscribe({
      next:res=>{
        console.log(`res from adding product to cart ${res}`);
      },
      error:err=>{
        console.log(`error while adding product to cart ${JSON.stringify(err)}`);    
      },
      complete:()=> {
       
        this.count++;
      this.navService.cartCount.next(this.count);
      console.log("refereshing the view");
      
      this.get();
        
      }
    });
      
  }

  RemoveProductFromUserCart(data:any){
    this.navService.removeFromUserCart(data.id).subscribe(res=>
      console.log(`res from product compoenent ${res}`)
    );
    this.count--;
      this.navService.cartCount.next(this.count);
      this.get();
  }

  IsproductInCart(id:any){
    
    
    // console.log(`checking whther productin cart @ ${JSON.stringify(this.checkCartArr)}`);
    
    return this.cartArr.some((item: { productID: any; })=>item.productID===id);
  }
}

