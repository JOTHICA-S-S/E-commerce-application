import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const childAuthGuard: CanActivateChildFn = (childRoute, state) => {
  const token=!!localStorage.getItem("token");

  const route=inject(Router);
  if(token)
  {
    return true;
  }
  route.navigate(["/SignIn"]);
  return false;
};
