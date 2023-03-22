import { user } from './../DataTypes/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _http: HttpClient;
  private _userUrl: string = "http://localhost:8080/api/v1/users";
  constructor(http: HttpClient) {
    this._http = http;
   }

   public getUserById(userId: number):Observable<user>{
      return this._http.get<user>(this._userUrl +"/" + userId);
   }
}
