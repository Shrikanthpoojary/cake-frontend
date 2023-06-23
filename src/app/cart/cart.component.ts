import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer';
import { CartService } from '../service/cake/cart.service';
import { CustomerService } from '../service/customer/customer.service';
import { Cart } from './cart';
import { CartItem } from './cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartitem : Observable<CartItem[]>
  // cartitem : Observable<any>
  // cartitem :any = []
  cartitems : CartItem[] = []

  customer : Customer[] =[]
  count : number;
  cartid : number
  custid : number
  cart : Cart = new Cart()

  address: boolean = false
  public grandTotal : number=0;
  constructor( private cartService : CartService,
    private customerService: CustomerService,
    private router : Router) {

      
     }

  ngOnInit() {
    // this.cartService.getCake().subscribe(res=>{
    //   this.cartitem = res;

      // console.log("cartitems inside cart component ",res)
      // this.grandTotal = this.cartService.getTotalPrice();
    // })

    console.log(localStorage.getItem("login"));
    

    if(localStorage.getItem("login")=="false"){
      this.router.navigate(["/login"])
      // localStorage.setItem("var",null)
    }
    
    this.customerService.getCustomer().subscribe((res:number)=>{
      this.custid = res
      console.log("customer id on click to add cart in cart component "+this.custid)
      this.getcartItem(this.custid)
      this.getcustomer(this.custid) 
      // this.cakes = this.cartService.CartItem(this.custid)
    })

    // this.cartService.getCake().subscribe(res=>{
    //     this.cartitem = res;
  
    //     console.log("cartitems inside cart component ",res)
    //     // this.grandTotal = this.cartService.getTotalPrice();
    //   })

  }





  getcartItem(id) {
    // this.cartitem = this.cartService.CartItem(id)
    this.cartService.CartItem(id).subscribe((res:any)=>{
      this.cartitem =res
      this.cartService.setCake(this.cartitem)
      
      // this.cartService.getCake().subscribe((data)=>{
      //   this.cartitms = data;
      //   this.grandTotal = this.cartService.getTotalPrice(this.cartitms)
      //   console.log("CartItems in getcartItem "+data)
      // })
      this.grandTotal = this.cartService.getTotalPrice(this.cartitem);
      console.log("cart item of type any ",res)
    })

    

    // console.log("cart Component cart Items "+typeof(this.cartitem),this.cartService.CartItem(id))
    // this.cartService.setCake(this.cartitem)
    // this.cartService.getCake().subscribe((data)=>{
    //   this.cartitms = data;
    //   this.grandTotal = this.cartService.getTotalPrice(this.cartitms)
    //   console.log("CartItems in getcartItem "+data)
    // })


    // console.log("CartItems in getcartItem "+data)

    // for(let item of this.cartitms) {
    //   this.grandTotal += item.quantity*item.amount
    // }
  }


  getcustomer(id) {
    this.customerService.viewCustomer(id).subscribe((res:any)=>{
      this.customer =res
    })
}

  increaseQuantity(cartitem) {
    this.cart.cartid = cartitem.cartid
    this.cart.quantity =cartitem.quantity + 1
    this.cart.weight = cartitem.weight
    this.cart.cakeid = cartitem.cakeid
    this.cart.custid = cartitem.custid
    console.log("cake Qyantity "+cartitem);
    
    this.cartService.updateCart(this.cart).subscribe(res => {
      console.log('Item updated successfully '+res);
    }, err => {
      console.error('Error updating item', err);
    });
    // this.router.navigate(["/cart"])
    window.location.href="/cart";
    // location.reload()
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(["/cart"]);
    // });
  }

  

  dereaseQuantity(cartitems){
    if(cartitems.quantity > 1){
    this.cart.cartid = cartitems.cartid
    this.cart.quantity =cartitems.quantity - 1
    this.cart.weight = cartitems.weight
    this.cart.cakeid = cartitems.cakeid
    this.cart.custid = cartitems.custid
    console.log("cake Qyantity "+cartitems.cartid);

    this.cartService.updateCart(this.cart).subscribe(res => {
      console.log('Item updated successfully');
    }, err => {
      console.error('Error updating item', err);
    });
    window.location.href="/cart";
    }
  }

  removeItem(data:Cart) {
     this.cartid = data.cartid
    console.log("cartid to be removed ",this.cartid);
    this.cartService.removeCartItem(this.cartid).subscribe(res => {
      console.log('Item deleted successfully');
    }, err => {
      console.error('Error updating item', err);
    });

    window.location.href="/cart";
  }

  emptyCart(){
    console.log("custid inside emptyCart method ",typeof(this.custid));
    
    this.cartService.removeAllCart(this.custid).subscribe(res =>{
      console.log('All Cart Item deleted successfully');},
      err => {
        console.error('Error updating item', err);
    })
    window.location.href="/cart";
  }

  changeaddress() {
    this.address = true
  }

  // removeItem(item : any) {
  //   this.cartService.removeCartItem(item);
  // }

  // emptyCart() {
  //   this.cartService.removeAllCart();
  // }
}
