import { CanDeactivateFn } from '@angular/router';

export const deactiveAuthGuard: CanDeactivateFn<unknown> = (component:any, currentRoute, currentState, nextState) => {

  console.log(component);

  if(component.userData.email !== "" || component.userData.password !== "")
  {
    const confir= confirm("You changes will be lost. Do you still wish to continue?")
    return confir;
  }
    return true;
};
