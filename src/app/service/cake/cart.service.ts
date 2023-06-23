import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/cart/cart';
import { CartItem } from 'src/app/cart/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any = []
  public cakeList = new BehaviorSubject<any>([]);

  private cartUrl = "http://localhost:8080/addcart";

  private cartItemUrl = "http://localhost:8080/cartitem/";
  private updateCartUrl = "http://localhost:8080/updatecart";
  private removeCarItemtUrl = "http://localhost:8080/deletecart/";
  private removeAllCarItemtUrl = "http://localhost:8080/deleteallcart/";

  
  constructor(private http : HttpClient) { }

  getCake() {
    return this.cakeList.asObservable();
  }

  setCake(cake : any){
    // this.cartItemList.push(...cake);
    this.cakeList.next(cake);
  }

  addcartdetail(cake:Object){
    return this.http.post(`${this.cartUrl}`,cake)
  }

  // CartItem(id: any) : Observable<any>{
  //   console.log("Inside CartItem " + this.http.get(this.cartItemUrl+id)) 
  //   console.log(`${this.cartItemUrl}`+id)
  //   return this.http.get(`${this.cartItemUrl}`+id) 
  // }
  CartItem(id){
    console.log("Inside CartItem " + this.http.get(this.cartItemUrl+id)) 
    console.log(`${this.cartItemUrl}`+id)
    return this.http.get(`${this.cartItemUrl}`+id) 
  }

  updateCart(cart : Object){
    return this.http.put(`${this.updateCartUrl}`,cart)
  }

  // addToCart(cakes : any)  {
  //   this.cartItemList.push(cakes);
  //   this.cakeList.next(this.cartItemList);
  //   this.getTotalPrice();
    // console.log(this.cartItemList)
  // }

  // getTotalPrice() : number{
  //   let grandTotal = 0;
  //   this.cartItemList.map((a:any)=>{
  //     grandTotal += a.amount    //(a.amount*a.weight/0.5)
  //   })
  //   return grandTotal
  // }

  removeCartItem(id) {
    return this.http.delete(`${this.removeCarItemtUrl}`+id)
  }
  
  
  getTotalPrice(cartItems): number {
    let grandTotal = 0;
    cartItems.map((item: CartItem) => {
      grandTotal += item.weight/0.5*(item.amount*item.quantity);
    });
    return grandTotal;
  }

  removeAllCart(id:number) {
    return this.http.delete(`${this.removeAllCarItemtUrl}`+id)  
}
  
  // removeCartItem(cake:any) {
    //   this.cartItemList.map((a:any, index:any)=>{
      //     if(cake.cakeid === a.cakeid) {
        //       this.cartItemList.splice(index,1);
        //     }
        //     // console.log(cake.cakeid)
        //   })
        //   this.cakeList.next(this.cartItemList)
        //   console.log(this.cartItemList)
        // }
        
  

}
