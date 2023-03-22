import { seats } from './../DataTypes/seats';

import { Observable } from 'rxjs';
import { booking } from './../DataTypes/booking';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private _http: HttpClient;
  private _bookingUrl: string = "http://localhost:8080/api/v1/booking";
  
  constructor(http: HttpClient) {
    this._http = http;
   }
   
   public getBooking():Observable<booking[]>{
      return this._http.get<booking[]>(this._bookingUrl);
   }

   public getBookingById(bookingId: number):Observable<booking>{
      return this._http.get<booking>(this._bookingUrl+"/" + bookingId);
   }

   public getSeatsOfParticularBooking(movieName: string, language: string, bookingDate: string,
      bookingtime: string, movieFormat: string):Observable<seats[]>{
     let params = new HttpParams();
     params = params.append('language', language);
     params = params.append('movieFormat', movieFormat);
     params = params.append('bookingDate', bookingDate);
     params = params.append('bookingTime', bookingtime);

     return this._http.get<seats[]>(this._bookingUrl+"/getSeats/"+movieName, {params: params});
  }
}
