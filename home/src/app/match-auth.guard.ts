import { CanMatchFn } from '@angular/router';

export const matchAuthGuard: CanMatchFn = (route, segments) => {
  return true;
};
