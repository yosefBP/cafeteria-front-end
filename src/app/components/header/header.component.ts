import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user!:User;

  constructor(private auth:AuthService, private route:Router,
    private userService:UserService) {
      this.getUser();
     }

  logout(){
    this.auth.logout();
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

  getUser(){
    this.userService.getUserAuth().subscribe(
      (user:User) => {
        this.user = user;
      }
    );
  }

}
