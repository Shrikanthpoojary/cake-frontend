import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer/customer.service';
import { Customer } from './customer';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer : Customer = new Customer()
  addresses : any=[]
 selectedAddress : any = {}
  constructor(private customerService : CustomerService) { }

  ngOnInit() {

    
    this.customerService.getToken();
  // this.initialize()

  
    
  }

  insertCustomer() {
    this.customerService.addCustomer(this.customer).subscribe(data=>console.log(data), error => console.log(error));
  }

  onSubmit() {
    console.log("Inside Onsubmit function")
    this.insertCustomer();
    window.location.href="/"
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
    // console.log({selectedaddress:address});
    // this.customerService.selectedAddress(address).pipe(
    //   map((result:any)=>this.selectedAddress= result)
    // )
    // .subscribe(res=>{
    //   this.customer.address = res.formatted_address
    //   console.log("formated address",res.formatted_address);
    // })
    this.customer.address = this.selectedAddress.formattedAddress
    console.log("formated address",this.selectedAddress.formattedAddress);
    
    this.addresses = []
    
   }

   removeaddressList() {
    this.addresses = []
   }

  //  initialize() {
  //   var map :any 
  //   var marker
  //   var myLatlng = new google.maps.LatLng(20.268455824834792,85.84099235520011)
  //   var geocoder = new google.maps.Geocoder()
  //   var infowindow = new google.maps.InfoWindow()
    

  //   var mapOptions = {
  //     zoom:18,
  //     center: myLatlng,
  //     mapTypeId : google.maps.MapTypeId.ROADMAP
  //   }
  //   map = new google.maps.Map(document.getElementById("myMap"),mapOptions)
  //   marker = new google.maps.Marker({
  //     map: map,
  //     position: myLatlng,
  //     draggable: true
  //   })

  //   geocoder.geocode({location:myLatlng},function(results,status) {
  //     if(status == google.maps.GeocoderStatus.OK) {
  //       if(results[0]){
  //         // console.log("latLong");
  //         this.addrs.val(results[0].formatted_address)
  //         console.log(this.addrs);
          
  //         $('#latitude,#longitude').show()
  //         $('#address').val(results[0].formatted_address)
  //         $('#latitude').val(marker.getPosition().lat())
  //         $('#longitude').val(marker.getPosition().lon())
  //         infowindow.setContent(results[0].formatted_address)
  //         infowindow.open(map,marker)
          
  //       }
  //     }
  //   })

  //   google.maps.event.addListener(marker , 'dragend', function() {
  //     console.log(marker.getPosition());
      
  //     geocoder.geocode({location:marker.getPosition()}, function(results,status) {
  //       if(status == google.maps.GeocoderStatus.OK) {
  //         if(results[0]){
  //           $('#address').val(results[0].formatted_address)
  //           $('#latitude').val(marker.getPosition().lat())
  //           $('#longitude').val(marker.getPosition().lon())
  //           infowindow.setContent(results[0].formatted_address)
  //           infowindow.open(map,marker)
  //         }
  //       }
  //     })
  //   })

  // }

}
