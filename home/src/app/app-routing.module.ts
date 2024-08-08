import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBArComponent } from './nav-bar/nav-bar.component';
import { EcommComponent } from './ecomm/ecomm.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {path:'',redirectTo:"/navbar/Ecommerce", pathMatch:"full"},
  {path:"navbar",component:NavBArComponent,
    children:[
      {path:"Ecommerce",component:EcommComponent},
      {path:"SignUp",component:SignUpComponent},
      {path:"SignIn",component:SignInComponent}
        ]
      }
  
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
