import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SignUpUrl="http://localhost:8080/api/signUp";
  SignInUrl="http://localhost:8080/api/signIn";

  constructor(private http:HttpClient) { }

  signUp(userData:any)
  {
     return this.http.post<any>(this.SignUpUrl,userData);
  }

  signIn(userData:any)
  {
     return this.http.post<any>(this.SignInUrl,userData);
  }
}
