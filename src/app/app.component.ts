import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

import { AuthService } from './services/auth.service';
import { MessagesService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private logoutMessage = 'La sesión ha expirado por inactividad. Por favor ingrese nuevamente.';

  constructor(private idle:Idle, private router:Router, private auth:AuthService,
              private messages:MessagesService) {
    this.idle.setIdle(295);
    this.idle.setTimeout(5);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
      this.auth.logout();
      this.router.navigate(['/login']);
      this.messages.load(this.logoutMessage);
      });

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          if (event.url !== '/login' && event.url !== '/') {
            this.idle.watch();
          } else {
            this.idle.stop();
            }
      }
    });
  }
}
