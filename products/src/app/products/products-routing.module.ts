import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsModule } from './products.module';

const routes: Routes = [
  {
    path:"", component:ProductsModule
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
