import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { map } from 'jquery';
import { BehaviorSubject, Observable,  } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public customerItemList: any = []
  public customerList = new BehaviorSubject<any>([]);

  // public customerid = new BehaviorSubject<number>(0);

  public customerid  = new BehaviorSubject<number> (isNaN(parseInt(localStorage.getItem("custid"))) ?  0 : parseInt(localStorage.getItem("custid")));
  
  tokenResponse : any =[]
  // Header set Access-control-Allow-origin *
  // Header Always set Access-Control-Allow-Method "POST, GET, PUT, DELETE"
  // Header Always set Access-Control-Allow-Headers "*"


  constructor(private http : HttpClient ,
    private router : Router) { }
  private loginUrl = "http://localhost:8080/customer/";
  private custidUrl = "http://localhost:8080/customerid/";
  private addCustomerUrl = "http://localhost:8080/addcustomer";
  private updateCustomerUrl = "http://localhost:8080/updatecustomer";
  private addressUrl = "/api/places/geocode?itemCount=20&address="
  private tokenURL = "/api/security/oauth/token?grant_type=client_credentials&client_id=33OkryzDZsLoVhgXCQLcVjL1Mr9mTBe1izCSBjZXcSa0Fve9ITh-jRRhcEuvWjWVYfCVhaT3UkeBkgLh2czrQw==&client_secret=lrFxI-iSEg_lThfAEbn5JPkVFc1mBVjHktCtcdpUc2Ws3thJBqlmmTaOm2qn9I7FbHwEiDLOvs9b6SMON0q9bCBiOod513RI";

  LoginValidation(email, password) {
    return this.http.get(this.loginUrl+email+"/"+password);
  }

  viewCustomer(id) {
    return this.http.get(this.custidUrl+id);
  }

  getcustomerId(email, password) {
    return this.http.get(this.custidUrl+email+"/"+password)
  }

  addCustomer(addCustomer : Object) :Observable<Object> {
    return this.http.post(`${this.addCustomerUrl}`,addCustomer);
  }

  // updateCustomer(updatecustomer : Object):Observable<Object>{
  updateCustomer(updatecustomer:Object){
      console.log('updatecustomer URL ',this.http.put(`${this.updateCustomerUrl}`,updatecustomer));
    return this.http.put(`${this.updateCustomerUrl}`,updatecustomer);
  }

  getCustomer() {
    return this.customerid.asObservable();
  }

  setCustomer(customerid : number) {
    this.customerid.next(customerid)
    console.log(customerid)
  }


  onLogout(){
    localStorage.setItem("login", "false")
    localStorage.setItem("custid",null)
    // this.router.navigate(["/"])
    window.location.href="/"
  }

  reloadPage() {
    location.reload();
  }

  getToken() {
    console.log("Token generation");
    
    this.http.post(this.tokenURL,{}).subscribe((tokendata)=>{
      this.tokenResponse = tokendata
      console.log("Token Response:",this.tokenResponse);
      
    })
  }

  getAddress(address : string) {
    console.log("searching address for "+ address);
    console.log("Token type",this.tokenResponse.token_type)
    return this.http.get(this.addressUrl + address, {headers:{
      "Authorization" : this.tokenResponse.token_type + " "+this.tokenResponse.access_token
    }
  }).pipe(
    map((result:any)=>result.copResults)
  )
    
  }

  selectedAddress(address){
    return address
    // .pipe(
      // map((result:any)=>result)
    // )
  }

  // addToCustomer(customer : any) {
  //   this.customerItemList.push(...customer)
  //   this.customerList.next(this.customerItemList);
  // }

  // onNavigateToLogin() {
  //   this.router.navigate(['/login'], { state: { returnUrl: this.router.url }});
  // }

  // /api/places/geocode?itemCount=20&address=
  // /api/security/oauth/token?grant_type=client_credentials&client_id=xyz&client_secret=abc

}
