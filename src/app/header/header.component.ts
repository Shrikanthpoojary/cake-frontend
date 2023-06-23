import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartItem } from '../cart/cart-item';
import { Customer } from '../customer/customer';
import { CartService } from '../service/cake/cart.service';
import { FlavourService } from '../service/cake/flavour.service';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  customer : any = []
  public totalItem : number =0
  public customerid : number;
  cartitem : Observable<CartItem[]>
  flavours:any=[]
  hasQuery:boolean = false


  constructor(private cartService : CartService, 
    private customerService : CustomerService,
    private router : Router,
    private flavourService : FlavourService) { 
  }

  ngOnInit() {

    if(!navigator.geolocation){
      console.log("location is not supported")
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(`lat:${position.coords.latitude},lon:${position.coords.longitude}`);
      
    })

    this.customerService.getCustomer().subscribe(res=>{
      this.customerid = res
      console.log("custid "+res);
      
      this.cartService.CartItem(this.customerid).subscribe((res:any)=>{
        this.cartitem =res
        this.cartService.setCake(this.cartitem)
      })

      if(res>0){
         this.customerService.viewCustomer(this.customerid).subscribe((res:any)=>{
          this.customer = res
          console.log("header component ",res)
         })
      }
    })

    this.cartService.getCake().subscribe(res=>{
      this.totalItem = res.length
    })
  }

  logout(){
    this.customerService.onLogout();
  }

  searchcake(event){
    // console.log(event.target.value);
    let flavour : String = event.target.value;
    console.log("flavour ",flavour);

    let matchSpace:any = flavour.match(/\s*/)
      if(matchSpace[0]==flavour) {
        this.flavours=[]
        this.hasQuery=false
        return;
      }

    this.flavourService.getsearchedFlavour(flavour).subscribe((res:any)=>{
      this.flavours = res;
      this.hasQuery=true
      console.log("flavour length ",this.flavours.length)
    })
    // this.getflavour(flavour)
    
    //  e.target.value
  }

  // getflavour(flavour:String){
    
  // }

  // onLogin() {
  //   this.customerService.onNavigateToLogin()
  // }

  cake(cakeid) {
    this.router.navigate(['/cake', cakeid])
  }

}
