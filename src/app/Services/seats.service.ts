import { seats } from './../DataTypes/seats';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeatsService {
http:HttpClient;
url:"http://localhost:8080/api/v1/seats"
  constructor(http:HttpClient){
    this.http=http;
  }
  public getSeats():Observable<seats[]>{
    return this.http.get<seats[]>(this.url);
 }
 public postSeats(newSeats:seats):Observable<seats>{
    return this.http.post<seats>(this.url,newSeats);
 }
}
