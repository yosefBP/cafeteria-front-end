import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessagesService } from 'src/app/services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-form-roles',
  templateUrl: './form-roles.component.html',
  styleUrls: ['./form-roles.component.css']
})
export class FormRolesComponent implements OnInit {

  nameForm:string = 'Formulario para Roles';
  name_button:string = 'Guardar';
  rolDetail:Role = {'id':0, 'rol':''};
  rolForm!:FormGroup;

  constructor(private roleService:RoleService, @Inject(MAT_DIALOG_DATA) public editData:any,
  private fb:FormBuilder, public message:MessagesService,
  private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.validateFields();
    if(this.editData){
      this.fillForm(this.editData);
    }
  }

  newRol() {
    if(this.rolForm.valid) {
      this.rolDetail = this.rolForm.value;
      this.roleService.create(this.rolDetail).subscribe((res: any) => {
        if (res == 201) {
          this._snackBar.open('Rol', 'Creado', {
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

  adminRol(){
    if (this.name_button === 'Actualizar') {
      this.rolDetail = this.rolForm.value;
      this.roleService.edit(this.rolDetail).subscribe( (res: any) => {
        if (res == null) {
          this._snackBar.open('Rol', 'Actualizado', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          });
        }
      });
    } else {
      this.newRol();
    }
  }

  private validateFields(){
   this.rolForm = this.fb.group({
      id: new FormControl(''),
      rol: new FormControl('', Validators.required)
   });
  }

  fillForm(editData:any){
    this.name_button = 'Actualizar';
    this.nameForm = 'Editar Rol';
    this.rolForm.controls['id'].setValue(editData.id);
    this.rolForm.controls['rol'].setValue(editData.rol);
  }
}
