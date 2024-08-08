import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBArComponent } from './nav-bar/nav-bar.component';
import { EcommComponent } from './ecomm/ecomm.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NavBArRoutingModule } from './nav-bar/nav-bar-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBArComponent,
    EcommComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavBArRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
