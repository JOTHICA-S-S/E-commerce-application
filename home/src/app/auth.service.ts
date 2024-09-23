import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  SignUpUrl="http://localhost:8080/api/signUp";
  SignInUrl="http://localhost:8080/api/signIn";
  userDataUrl="http://localhost:8080/api/userData";
  

  constructor(private http:HttpClient) { }

  signUp(userData:any)
  {
     return this.http.post<any>(this.SignUpUrl,userData);
  }

  signIn(userData:any)
  {  localStorage.setItem("emailLogged",userData.email);
    
   
     return this.http.post<any>(this.SignInUrl,userData);
  }

  isAuthenticated()
  {
    //double !! is to make localstorage.getItem return ture/ flase (i.e a boolean value)
    return !!localStorage.getItem("token");
  }

  getUserData()
  {
    return this.http.get<any>(this.userDataUrl);
    console.log("getting user data");
    
  }
}
