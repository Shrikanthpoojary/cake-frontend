import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {

  custId:number
  customer : Observable<Customer[]>
  custmr : Customer = new Customer()
  // myDefaultValue: number = 1;
  addresses : any=[]
  selectedAddress : any = {}

  constructor(private customerService: CustomerService) { 
    
  }

  ngOnInit() {
    this.customerService.getToken();

    this.customerService.getCustomer().subscribe((res:number)=>{
      this.custId = res
      console.log("customer id on click to add cart in cart component "+this.custId)
      this.getcustomer(this.custId) 
      // this.cakes = this.cartService.CartItem(this.custid)
    })

  }

  getcustomer(id) {
    this.customerService.viewCustomer(id).subscribe((res:any)=>{
      this.customer = res
      console.log("Change address ",res);  
    })
}

updateAddress() {
  this.customerService.updateCustomer(this.custmr).subscribe(data=>console.log(data), error => console.log(error));
  console.log("Inside updateAddress function")
  window.location.href="/cart";
}
  onSubmit(data){
    this.custmr.custid = data.custid;
    this.custmr.custname = data.custname;
    this.custmr.phone = data.phone;
    this.custmr.email = data.email;
    this.custmr.password = data.password;
    // console.log("data.custid ",data.custid)
    // console.log("Inside Onsubmit function")
    this.updateAddress();
  }

  addressSearch(event) {
    let value:string = event.target.value;
    console.log(value);
    let matchSpace:any = value.match(/\s*/)
      if(matchSpace[0]==value) {
        this.addresses=[]
        return;
      }
    // search address from map api
   this.customerService.getAddress(value).subscribe(addressResponse=>{
    this.addresses = addressResponse
    console.log("address response",{addressResponse});
    
   })
  }

  onSelectAddress(address:Object){
  this.selectedAddress = address
  this.custmr.address = this.selectedAddress.formattedAddress
  console.log("formated address",this.selectedAddress.formattedAddress);
  
  this.addresses = []
  
 }

 removeaddressList() {
  this.addresses = []
 }

}
