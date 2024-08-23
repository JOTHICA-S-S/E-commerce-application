import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  productsData="http://localhost:8080/api/productData";
  updateCartUrl="http://localhost:8080/api/updateCart";

  role:string='';

  constructor(private http:HttpClient) { }

  public cartCount = new BehaviorSubject<number>(0);

  cartCounted=this.cartCount.asObservable();

  addCount(count:number)
  {
    this.cartCount.next(count);
  }

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

  updateCart(productId:number,inCartValue:boolean){
    return this.http.put(`${this.updateCartUrl}/${productId}`,{inCart:inCartValue}, {headers:{'content-Type':'application/json'}});
  }


}

