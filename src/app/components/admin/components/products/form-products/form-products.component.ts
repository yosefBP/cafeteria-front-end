import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessagesService } from 'src/app/services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-products',
  templateUrl: './form-products.component.html',
  styleUrls: ['./form-products.component.css']
})
export class FormProductsComponent implements OnInit {
  nameForm:string = 'Formulario de Productos';
  name_button:string = 'Guardar';
  productDetail:Product = {'id':0, 'nombre_producto':'', 'referencia':'', 'precio':0,
                           'categoria':'', 'stock':0};
  productForm!:FormGroup;

  constructor(private productService:ProductService, @Inject(MAT_DIALOG_DATA) public editData:any,
  private fb:FormBuilder, public message:MessagesService,
  private _snackBar: MatSnackBar) {  }


  ngOnInit(): void {
    this.validateFields();
    if(this.editData){
      this.fillForm(this.editData);
    }
  }

  newProduct() {
    if(this.productForm.valid) {
      this.productDetail = this.productForm.value;
      this.productService.create(this.productDetail).subscribe( (res: any) => {
        if (res == 201) {
          this._snackBar.open('Producto', 'Creado', {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    } else {
      //empty
    }
  }

  adminProduct(){
    if (this.name_button === 'Actualizar') {
      this.productDetail = this.productForm.value;
      this.productService.edit(this.productDetail).subscribe( (res: any) => {
        if (res == null) {
          this._snackBar.open('Producto', 'Actualizado', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          });
        }
      });
    } else {
      this.newProduct();
    }
  }

  validateFields(){
    this.productForm = this.fb.group({
      id: new FormControl(''),
       nombre_producto: new FormControl('', Validators.required),
       referencia: new FormControl('', Validators.required),
       precio: new FormControl('', Validators.required),
       categoria: new FormControl('', Validators.required),
       stock: new FormControl('', Validators.required)
    });
   }

   fillForm(editData:any){
    this.name_button = 'Actualizar';
    this.nameForm = 'Editar Producto';
    this.productForm.patchValue({
      id: editData.id,
      nombre_producto: editData.nombre_producto,
      referencia: editData.referencia,
      precio: editData.precio,
      categoria: editData.categoria,
      stock: editData.stock
  });
}

}
