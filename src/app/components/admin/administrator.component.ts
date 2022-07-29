import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html'
})
export class AdministratorComponent {

  dashboard: any = {
    image: './assets/images/dashboardFake.png',
  }
  constructor(public route:Router, private admin:UserService) { }
}
