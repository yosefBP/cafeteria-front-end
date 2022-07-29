import { Component, Inject, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessagesService } from 'src/app/services/message.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  roles:any[] = [];
  userDetail:User = {'id':0, 'nombre':'', 'email':'', 'password':'', 'role_id':0};
  userForm!:FormGroup;

  constructor(private roleservice:RoleService, @Inject(MAT_DIALOG_DATA) public editData:any,
    private fb:FormBuilder, private userService:UserService, public message:MessagesService,
    private _snackBar: MatSnackBar) {
      this.validateFields();
     }

  ngOnInit(): void {
    this.getRoles();
    if(this.editData.id){
      this.fillForm(this.editData);
    }
  }

  updateUser(){
    this.userDetail = this.userForm.value;
    this.userService.edit(this.userDetail).subscribe( (res: any) => {
      this._snackBar.open('Usuario', 'Actualizado', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      res!;
    });
  }

  getRoles() {
    this.roleservice.getAll().subscribe( (res: any) => {
      this.roles = res;
      res!;
    } );
  }

  private validateFields(){
    this.userForm = this.fb.group({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role_id: new FormControl('', Validators.required),
    });
  }

  fillForm(editData:any){
    this.userForm.patchValue({
      id: editData.id,
      nombre: editData.nombre,
      email: editData.email,
      password: editData.password,
      role_id: editData.role_id,
    });
  }

}
