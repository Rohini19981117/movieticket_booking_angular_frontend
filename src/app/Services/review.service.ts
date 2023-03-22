import { Observable } from 'rxjs';
import { review } from './../DataTypes/review';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private _http: HttpClient;
  private _reviewURL: string = "http://localhost:8080/api/v1/reviews"

  constructor(http: HttpClient) { 
    this._http = http;
  }

  public postOrUpdateReviewStar(starNumber: number, userId:number, movieName: string):Observable<review>{
    return this._http.post<review>(this._reviewURL+"/star/"+userId+"/"+movieName, starNumber);
 }

 public postOrUpdateReviewComment(comment: string, userId: number, movieName: string): Observable<review>{
  return this._http.post<review>(this._reviewURL+"/comment/"+userId+"/"+movieName, comment);
 }

 public findReviewById(userId:number):Observable<review>{
    return this._http.get<review>(this._reviewURL + "/" + userId);
 }

  public findReviewByUserAndMovieName (userId: number, movieName: string):Observable<review>|null{
    return this._http.get<review|null>(this._reviewURL + "/" + userId+"/"+movieName); 
  }

 public getAllReviews():Observable<review[]>{
  return this._http.get<review[]>(this._reviewURL);
 }


}
