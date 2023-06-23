import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CakeFlavoursService } from '../service/cake/cake-flavours.service';
import { CartService } from '../service/cake/cart.service';
import { Cake } from './cake';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  cakeFlavour : Observable<Cake[]> ;
  Id:number
  tempid:any

  constructor(private cakeFlavoursService: CakeFlavoursService,
    private activeRoute: ActivatedRoute,
    private cartService : CartService) { 
    // this.activeRoute.paramMap.subscribe((ob: Params)=>{
    //   let fid:any = ob.params.id
      // if(!isNaN(fid)) {
      //   this.Id = Number(fid)
      //   this.getFlavourById(this.Id)
      //   // this.getTypeById(this.Id);
      // }
    //   console.log(ob.params.id)
    // })
    

   }
   
  ngOnInit() {
    // this.activeRoute.paramMap.subscribe((ob1:Params)=>{
    //   console.log(ob1.params.Id)
    // })

    this.tempid =this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.tempid)
    if(!isNaN(this.tempid)) {
      this.Id = Number(this.tempid)
      this.getFlavourById(this.Id)
      // this.getTypeById(this.Id);
    }

   
  } 
  // isObjEmpty (obj:any) {
  //   return Object.keys(obj).length === 0;
  // }
  // 
  getFlavourById(id : any) {

    this.cakeFlavour =this.cakeFlavoursService.getFlavourCake(id);
    console.log("cartComponent "+typeof(this.cakeFlavour))
  }

}
