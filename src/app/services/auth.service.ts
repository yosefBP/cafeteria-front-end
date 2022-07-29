import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url:string = environment.API_URL;
  constructor(private http:HttpClient) {
   }

  testApi(){
    return this.http.get(`${this._url}`);
  }

  login(data:Login){
    return this.http.post(`${this._url}/login`, data);
  }

  logout(){
    localStorage.removeItem('token');
    return this.http.delete(`${this._url}/login`);
  }

  sessionValidation(){
    return this.http.get(`${this._url}/session-validation`);
  }
}
