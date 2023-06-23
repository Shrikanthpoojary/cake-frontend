import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlavourService {

  private searchFlavourUrl = "http://localhost:8080/searchflavour/";

  constructor(private http: HttpClient) { }

  getFlavours() : Observable<any> {
    return this.http.get(`http://localhost:8080/flavour`);
  }

  getsearchedFlavour(flavour : String){
   return this.http.get(`${this.searchFlavourUrl}`+flavour)
  }

}
