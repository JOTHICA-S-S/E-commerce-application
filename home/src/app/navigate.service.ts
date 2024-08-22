import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  productsData="http://localhost:8080/api/productData";
  role:string='';

  constructor(private http:HttpClient) { }

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


}

