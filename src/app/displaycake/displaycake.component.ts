import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Cake } from '../cake/cake';
import { CakeTypeService } from '../service/cake/cake-type.service';

@Component({
  selector: 'app-displaycake',
  templateUrl: './displaycake.component.html',
  styleUrls: ['./displaycake.component.css']
})
export class DisplaycakeComponent implements OnInit {
  cakeType : Observable<Cake[]>;
  Id : number
  typeid :  any
  constructor(private cakeTypeService : CakeTypeService,
    private ActiveRoute : ActivatedRoute) { 
      // this.ActiveRoute.paramMap.subscribe((ob:Params)=>{
      //   let tid:any = ob.params.id
      //   if(!isNaN(tid)){
      //       this.Id = Number(tid);
      //     console.log(ob.params.id)
      //     this.getTypeById(this.Id);
      //   }
      // })
      this.typeid = this.ActiveRoute.snapshot.paramMap.get('id')
      if(!isNaN(this.typeid)){
        this.Id = Number(this.typeid)
        this.getTypeById(this.Id);
      }
    }

  ngOnInit() {
  }

  getTypeById(id : any) {
    this.cakeType = this.cakeTypeService.getCakeType(id)
  }
}
