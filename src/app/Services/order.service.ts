import { booking } from './../DataTypes/booking';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../DataTypes/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _http:HttpClient;
  private _orderURL: string = "http://localhost:8080/api/v1/orders";
  public bookingForm: booking;

  constructor(http: HttpClient) {
    this._http = http;
    this.bookingForm = new booking();
   }

   public postOrder(orderToPost: order, userId:number, movieName: string):Observable<order>{
      return this._http.post<order>(this._orderURL+"/"+userId+"/"+movieName, orderToPost);
   }

   public getAllOrders():Observable<order[]>{
    return this._http.get<order[]>(this._orderURL);
   }
   
   public getSingleOrder(orderId: number):Observable<order>{
    return this._http.get<order>(this._orderURL+"/"+orderId);
   }




}
