import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormProductsComponent } from './form-products/form-products.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  ELEMENT_DATA: Product[] = [];
  displayedColumns: string[] = ['id', 'Nombre', 'Precio', 'Referencia', 'Categoria', 'Stock', 'actions'];
  dataSource:any;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private productService: ProductService, private _snackBar: MatSnackBar,
    private dialog: MatDialog) {
    // empty constructor
  }

  ngOnInit(): void {
    this.getProducts();
  }

  newProduct() {
    this.dialog.open(FormProductsComponent, {
      width: '30%'
    }).afterClosed().subscribe((res: any) => {
      if (res === true) {
        this.getProducts();
      }
    });
  }

  editProduct(product:Product) {
    this.dialog.open(FormProductsComponent, {
      width: '30%',
      data: product
    }).afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getProducts();
      }
    });
  }

  getProducts() {
    this.productService.getAll().subscribe( (res: Product[]) => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    } );
  }

  deleteProduct(id:number) {
    this.productService.delete(id).subscribe( (res: any) => {
      this.getProducts();
      this.openSnackBar();
      res!;
    } );
  }

  openSnackBar() {
    this._snackBar.open('Producto', 'Eliminado', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
