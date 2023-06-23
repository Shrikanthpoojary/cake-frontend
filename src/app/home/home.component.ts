import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer/customer.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  constructor(private customerService : CustomerService
    ) { 
      // login: string,
      // localStorage.setItem("login", "false");
  }
  ngOnInit( ) {
    // this.customerService.reloadPage()
  }

  
}
