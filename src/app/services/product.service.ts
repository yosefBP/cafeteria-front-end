import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url:string = `${environment.API_URL}/product`;

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<Product[]>(`${this._url}/storehouse`);
  }

  create(data:Product){
    return this.http.post<Product>(`${this._url}/new`, data);
  }

  edit(data:Product){
    return this.http.put(`${this._url}/edit/id`, data);
  }

  delete(id:number){
    return this.http.delete(`${this._url}/delete/id?id=${id}`);
  }
}
