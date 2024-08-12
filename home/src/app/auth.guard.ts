import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

  //it is not a class, it is like  a function in javascript
  //so contructor cannot be use to inject services
  //then we have to use inject method,
  //And this function should retunr true or false, wlse will give an error
export const authGuard: CanActivateFn = (route, state) => {

  //here we are using inject method to inject the service and we are storing the return value of isAuthenticated method in isAuthenticated variable
  let isAutheticated=inject(AuthService).isAuthenticated();
  let router=inject(Router);

  if(isAutheticated)
    return true;
  else
  {
    router.navigate(["/SignIn"]);
    return false;
    
  }
};
