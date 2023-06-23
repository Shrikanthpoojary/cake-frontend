import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeFlavoursService {

  constructor(private http : HttpClient) { }

  getFlavourCake(id : any) : Observable<any> {
    return this.http.get(`http://localhost:8080/flavourcake/`+id);
  }
}
