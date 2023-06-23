import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeTypeService {

  constructor(private http:HttpClient) { }

  getCakeType(id : any) : Observable<any> {
    return this.http.get(`http://localhost:8080/occassioncake/`+id);
  }

  readCakeType() : Observable<any> {
    return this.http.get(`http://localhost:8080/caketype`);
  }
}
