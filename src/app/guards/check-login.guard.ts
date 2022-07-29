import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessagesService } from 'src/app/services/message.service';


@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor(private auth: AuthService, private message:MessagesService) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.myMethod();
  }

  myMethod():boolean {
    if (localStorage.getItem('token')) {
      this.auth.logout();
      localStorage.removeItem('token');
      this.message.load('Ruta no existe. Por favor ingrese nuevamente.');
    } else{
      // empty
    }
    return true;
    }
  }
