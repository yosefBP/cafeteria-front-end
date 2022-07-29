import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productImages = {
    imagen : "../../../../assets/images/car-buy.png",
  }

  products: Product[] = [];

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  addCart(product: Product){
    console.log(product);
  }

  getProducts(){
    this.productService.getAll().subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
  }

}
