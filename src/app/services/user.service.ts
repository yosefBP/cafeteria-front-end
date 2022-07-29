import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User, CreateUserDTO } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url:string = `${environment.API_URL}/user`;

  constructor(private http:HttpClient) {}

  create(data:CreateUserDTO){
    return this.http.post<User>(`${this._url}/new`, data);
  }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${this._url}/list/all`);
  }

  getUserAuth():Observable<User>{
    return this.http.get<User>(`${this._url}/auth`);
  }

  edit(data:User){
    return this.http.put<User>(`${this._url}/edit/id`, data);
  }

  delete(id:number){
    return this.http.delete(`${this._url}/delete/id?id=${id}`);
  }
}
