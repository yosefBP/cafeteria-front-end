import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-constumer',
  templateUrl: './constumer.component.html',
  styleUrls: ['./constumer.component.css']
})
export class ConstumerComponent {

  constructor(public route: Router) { }

}
