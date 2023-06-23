import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  public cakeid = new BehaviorSubject<number>(0);

  constructor(private http : HttpClient) { }

  getYourCake(id : any) : Observable<any> {
    console.log("Inside getYourCake " + this.http.get(`http://localhost:8080/cakeid/`+id)) 
    return this.http.get(`http://localhost:8080/cakeid/`+id);
  }

  getcakeid() {
    return this.cakeid.asObservable();
  }

  setcakeid(cakeid : number){
    this.cakeid.next(cakeid)
    console.log("inside setcakeid of cakeservice cake id is "+cakeid)
  }
}
