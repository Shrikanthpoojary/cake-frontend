import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cake } from '../cake/cake';
import { Cart } from '../cart/cart';
import { CakeService } from '../service/cake/cake.service';
import { CartService } from '../service/cake/cart.service';
import { CustomerService } from '../service/customer/customer.service';

@Component({
  selector: 'app-single-cake',
  templateUrl: './single-cake.component.html',
  styleUrls: ['./single-cake.component.css']
})
export class SingleCakeComponent implements OnInit {
  public cake : Observable<Cake[]>
  cakeId : number
  Id : any
  cart : Cart = new Cart() 
  custId : number
  cakename : string
  public cakeList : any
  weight : number
  constructor(private cakeService : CakeService,
    private ActiveRoute : ActivatedRoute,
    private cartService : CartService,
    private customerService:CustomerService,
    private router : Router) {
      // this.ActiveRoute.paramMap.subscribe((ob:Params)=>{
      //   let cid: any = ob.params.id
      //   if(!isNaN(cid)){
      //     this.cakeId = Number(cid)
      //     this.getCakeById(this.cakeId)
      //   }
      // })
      this.Id = this.ActiveRoute.snapshot.paramMap.get('id');
      if(!isNaN(this.Id)) {
        this.cakeId = Number(this.Id)
        this.cart.cakeid = this.cakeId
        // console.log("single cake component weight is "+this.model.weight)
        this.getCakeById(this.cakeId)
      }
     }

  ngOnInit() {
    // this.cakeService.getYourCake(this.cakeId).subscribe(res=>{
    //   this.cakeList = res;
    // })

    
  }
  getCakeById(id : any) {
    
    this.cakeList = this.cakeService.getYourCake(id);
    // this.cakeList.forEach((a:any) => {
    //   Object.assign(a,{finalquantity:1, total:a.amount});
    // });
    // console.log("Weight "+ this.model); 
  }

  addToCart(item : any) {
    this.customerService.getCustomer().subscribe((res:number)=>{
      // if(res > 0){
      if(res > 0){

        console.log("addToCart "+res)
        this.custId = res
        this.cart.custid = this.custId
        // console.log(this.cart.quantity)

        this.cartService.addcartdetail(this.cart).subscribe(data=> console.log(data), error=>console.log(error))
        // this.cartService.addToCart(item);
        this.customerService.reloadPage()
      }
      else{
        this.router.navigate(["/login"])
        console.log("login")
      }
    })
    // this.cartService.addToCart(item);
  }
  
  // reloadPage() {
  //   location.reload();
  // }
  

  // weights: any = [
  //   {id :1 , value : 0.5},
  //   {id :2 , value : 1},
  //   {id :3 , value : 2},
  //   {id :4 , value : 4}
    
  // ]
}
