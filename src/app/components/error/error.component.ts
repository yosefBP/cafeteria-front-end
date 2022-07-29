import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error404: any = {
    image: './assets/images/error-404.jpg',
  }
  constructor() {
    // empty constructor
  }

  ngOnInit(): void {
    // empty ngOnInit
  }

}
