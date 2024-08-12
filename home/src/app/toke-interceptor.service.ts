import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokeInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =localStorage.getItem("token");

    //we are receiving the req and cloning it and creating the new request by inserting certain values
    let clonedReq=req.clone({
        //here we are inserting the authorization key in headers
        //the best way to cerate authorization is by creating bearer
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      });
    return next.handle(clonedReq);
  }
}
