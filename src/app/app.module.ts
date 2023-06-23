import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FlavourComponent } from './flavour/flavour.component';
import { CakeComponent } from './cake/cake.component';
import { CakeTypeComponent } from './cake-type/cake-type.component';
import { DisplaycakeComponent } from './displaycake/displaycake.component';
import { SingleCakeComponent } from './single-cake/single-cake.component';
import { CartComponent } from './cart/cart.component';
import { CustomerComponent } from './customer/customer.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { SliderComponent } from './slider/slider.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { GoogleMapsModule } from '@angular/google-maps';
// import { BehaviorSubject } from 'rxjs';
// import { GoogleMapsModule } from '@angular/google-maps';
// import { RatingModule } from 'ng-starrating';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FlavourComponent,
    CakeComponent,
    CakeTypeComponent,
    DisplaycakeComponent,
    SingleCakeComponent,
    CartComponent,
    CustomerComponent,
    ChangeAddressComponent,
    SliderComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // GoogleMapsModule
    // BehaviorSubject
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
