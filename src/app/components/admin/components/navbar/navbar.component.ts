import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  menuAdmin:any[] =[
    {
      name: 'Productos',
      url_router: '/admin/dashboard/products',
    },
    {
      name: 'Usuarios',
      url_router: '/admin/dashboard/users',
    },
    {
      name: 'Roles',
      url_router: '/admin/dashboard/roles',
    },
  ];
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
