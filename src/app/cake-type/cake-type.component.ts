import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CakeTypeService } from '../service/cake/cake-type.service';
import { CakeType } from './cake-type';

@Component({
  selector: 'cake-type',
  templateUrl: './cake-type.component.html',
  styleUrls: ['./cake-type.component.css']
})
export class CakeTypeComponent implements OnInit {
  cakeType : Observable< CakeType>

  constructor(private cakeTypeService : CakeTypeService) { }

  ngOnInit() {
    this.readCakeType()
  }

  readCakeType() {
    this.cakeType = this.cakeTypeService.readCakeType();
  }

}
