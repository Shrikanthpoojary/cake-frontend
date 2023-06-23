import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CakeFlavoursService } from '../service/cake/cake-flavours.service';
import { FlavourService } from '../service/cake/flavour.service';
import { Flavour } from './flavour';
// import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'flavour',
  templateUrl: './flavour.component.html',
  styleUrls: ['./flavour.component.css']
})
export class FlavourComponent implements OnInit {
  flavour : Observable<Flavour[]>
  
  constructor(private flavourService : FlavourService) { }

  ngOnInit() {
    this.readFlavour();
  }

  readFlavour() {
    this.flavour = this.flavourService.getFlavours();
  }

  // getFlavourById(id : any) {
    // alert(id)
  //   this.cakeFlavour =this.cakeFlavoursService.getFlavourCake(id);
  // }

}
