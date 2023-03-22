import { discount } from './../DataTypes/discount';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private _http: HttpClient;
  private _discountURL: string = "http://localhost:8080/api/v1/discount";
  constructor(http: HttpClient) {
    this._http = http;
   }

   public getDiscount():Observable<discount[]>{
    return this._http.get<discount[]>(this._discountURL);
   }

  //  public getDiscountByBankName(bankName:string):Observable<discount>{
  //   return this._http.get<discount>(this._discountURL+ "/bankName/" + bankName);
  //  }

   public getDiscountById(id: number){
    return this._http.get(this._discountURL + "/" + id);
   }

   public putDiscount(discountToBeUpdated: discount){
    return this._http.put(this._discountURL, discountToBeUpdated);
   }
}
