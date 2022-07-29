import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private _url:string = `${environment.API_URL}/role`;

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Role[]>(`${this._url}/list/all`);
  }

  create(data:Role){
    return this.http.post<Role>(`${this._url}/new`, data);
  }

  edit(data:Role){
    return this.http.put<Role>(`${this._url}/edit/id`, data);
  }

  delete(id:number){
    return this.http.delete(`${this._url}/delete/id?id=${id}`);
  }
}
