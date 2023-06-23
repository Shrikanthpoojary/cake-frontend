import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CakeComponent } from './cake/cake.component';
import { CartComponent } from './cart/cart.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { CustomerComponent } from './customer/customer.component';
import { DisplaycakeComponent } from './displaycake/displaycake.component';
import { FlavourComponent } from './flavour/flavour.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SingleCakeComponent } from './single-cake/single-cake.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:HomeComponent},
  {path:"cake/:id",component:CakeComponent},
  {path:"displayCake/:id",component:DisplaycakeComponent},
  {path:"myCake/:id",component:DisplaycakeComponent},
  {path:"singleCake/:id",component:SingleCakeComponent},
  {path:"cart",component:CartComponent},
  {path:"customer",component:CustomerComponent},
  {path:"login",component:LoginComponent},
  {path:"address",component:ChangeAddressComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
