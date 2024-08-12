import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommComponent } from './ecomm/ecomm.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {path:'',redirectTo:"Ecommerce", pathMatch:"full"},
  {path:"Ecommerce",component:EcommComponent},
  {path:"SignIn",component:SignInComponent},
  {path:"SignUp",component:SignUpComponent},
  {
    path:"products-mfe",
      loadChildren:()=>
        loadRemoteModule({
          remoteEntry:"http://localhost:5200/remoteEntry.js",
          exposedModule:"./ProductsModule",
          type:"module"
        }).then(m=>m.ProductsModule)
      
  }
     
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
