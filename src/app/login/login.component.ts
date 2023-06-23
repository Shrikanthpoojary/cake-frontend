import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any = {}
  getData : boolean
  constructor(private customerService : CustomerService,
    private router : Router) { }

  ngOnInit() {
  }

  loginUrl() {
    console.log("Inside login")
    var email = this.model.email
    var password = this.model.password;

    this.customerService.LoginValidation(email, password).subscribe((res : boolean)=>{
      this.getData = res;
      // this.custId = res;
      if(this.getData == true){
        this.router.navigate(["/"])
      }
      
      else{
        alert("Invalid Customer");
      }
    })
  }

  getCustid() {
    localStorage.setItem("login", "1");

    var email = this.model.email
    var password = this.model.password;
    this.customerService.getcustomerId(email, password).subscribe((res:any)=>{
      let custId : any
      custId = res
      localStorage.setItem("custid",res)
      this.customerService.setCustomer(custId)
      if(custId >0){
        this.router.navigate(["/"])
      }
      
      else{
        alert("Invalid Customer");
      }
    })

  }
}
