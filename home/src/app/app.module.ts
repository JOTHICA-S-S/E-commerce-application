import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EcommComponent } from './ecomm/ecomm.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TokeInterceptorService } from './toke-interceptor.service';
import { ProductsListComponent } from './products-list/products-list.component';
import { CollectionsComponent } from './collections/collections.component';
import { ShopsComponent } from './shops/shops.component';
import { TrendingComponent } from './trending/trending.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EcommComponent,
    SignUpComponent,
    SignInComponent,
    ProductsListComponent,
    CollectionsComponent,
    ShopsComponent,
    TrendingComponent,
    CartComponent,
    HomeComponent,
    StartComponent,
    CarouselComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
