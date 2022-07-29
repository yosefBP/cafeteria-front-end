import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductComponent } from './components/products/product.component';
import { UsersComponent } from './components/users/users.component';
import { RolesComponent } from './components/roles/roles.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './components/users/dialog/dialog.component';
import { FormRolesComponent } from './components/roles/form-roles/form-roles.component';
import { FormProductsComponent } from './components/products/form-products/form-products.component';



@NgModule({
  declarations: [
    ProductComponent,
    UsersComponent,
    RolesComponent,
    DialogComponent,
    FormRolesComponent,
    FormProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
