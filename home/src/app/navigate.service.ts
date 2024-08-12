import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  productsData="http://localhost:8080/api/productData";

  constructor(private http:HttpClient) { }

  getProducts()
  {
     return this.http.get<any>(this.productsData);
  }

}

