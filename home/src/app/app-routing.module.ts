import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommComponent } from './ecomm/ecomm.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from './auth.guard';
import { ProductsListComponent } from './products-list/products-list.component';
import { TrendingComponent } from './trending/trending.component';
import { ShopsComponent } from './shops/shops.component';
import { CollectionsComponent } from './collections/collections.component';
import { deactiveAuthGuard } from './deactive-auth.guard';
import { childAuthGuard } from './child-auth.guard';

const routes: Routes = [
  {path:'',redirectTo:"Ecommerce", pathMatch:"full"},
  {path:"Ecommerce",component:EcommComponent},
  {path:"SignIn",component:SignInComponent},
  {path:"SignUp",component:SignUpComponent, canDeactivate:[deactiveAuthGuard]},
  {path:"Products",component:ProductsListComponent,canActivate:[authGuard]},
  // {
  //   path:"products-mfe",
  //     loadChildren:()=>
  //       loadRemoteModule({
  //         remoteEntry:"http://localhost:5200/remoteEntry.js",
  //         exposedModule:"./ProductsModule",
  //         type:"module"
  //       }).then(m=>m.ProductsModule),
  //       canActivate:[authGuard]
      
  // }
  {path:"Trending",component:TrendingComponent, canActivateChild:[childAuthGuard],
    children:[
      {path:"shops", component:ShopsComponent},//      http://localhost:5100/Trending/shops
      {path:"collections", component:CollectionsComponent}  //  http://localhost:5100/Trending/collections
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
