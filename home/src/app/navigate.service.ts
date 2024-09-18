import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  productsData="http://localhost:8080/api/productData";

  getCart="http://localhost:8080/api/cart";
  UpdateUsercart="http://localhost:8080/api/addToCart";

 removeUrl="http://localhost:8080/api/removeFromCart";

 cartArr:any=[];
count:any;
  
  role:string='';

  constructor(private http:HttpClient, private authServ:AuthService) { 
   
  }
  

  public cartCount = new BehaviorSubject<number>(0);

  cartCounted=this.cartCount.asObservable();

 
  setRole(role:string)
  {
    this.role=role;
  }

  getRole()
  {
    return this.role;
  }

  

  getProducts()
  {
     return this.http.get<any>(this.productsData);
  }

  

  getUserCart()
  {
    console.log(`get user cart from navigate service`);
    const email =localStorage.getItem('emailLogged');
     return this.http.get<any>(`${this.getCart}?email=${email}`);
  }

  AddToUserCart(productId:string){
    console.log(`in navser addtocart ${localStorage.getItem('emailLogged')}`);
    const email =localStorage.getItem('emailLogged');
    const body={email};
    console.log(`from service adding product in cart`);
    return this.http.put<any>(`${this.UpdateUsercart}/${productId}`,body,{responseType: 'text' as 'json'});
  }

  removeFromUserCart(productId:string){
    console.log(`in navser remove from cart ${localStorage.getItem('emailLogged')}`);
    const email =localStorage.getItem('emailLogged');
    const body={email};
    return this.http.request<void>('delete',`${this.removeUrl}/${productId}`,{body});
  }
}

