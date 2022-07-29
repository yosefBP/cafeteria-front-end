import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormProductsComponent } from '../admin/components/products/form-products/form-products.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {

  user!:User;
  ELEMENT_DATA: Product[] = [];
  displayedColumns: string[] = ['id', 'Nombre', 'Precio', 'Referencia', 'Categoria', 'Stock', 'actions'];
  dataSource:any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private auth:AuthService, private route:Router,
    private userService:UserService, private productService: ProductService,
    private _snackBar: MatSnackBar, private dialog: MatDialog) {
    this.getUser();
    this.getProducts();
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
