import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateUserDTO, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MessagesService } from 'src/app/services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { RoleService } from 'src/app/services/role.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ELEMENT_DATA: CreateUserDTO[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'email', 'rol', 'actions'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  userDetail:User = {'nombre':'', 'email':'', 'password':'', 'role_id':0};
  userForm!:FormGroup
  roles:any[] = [];

  constructor(private roleservice:RoleService, private userService:UserService,
     private _snackBar: MatSnackBar, private fb:FormBuilder, public message:MessagesService,
      private dialog: MatDialog) {
      this.validateFields();
    }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.userService.getAll().subscribe( (res: CreateUserDTO[]) => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    } );
  }

  saveUser(event:Event) {
    event.preventDefault();
    const values = this.userForm.value;
    this.messageHandler(values);
    if(this.userForm.valid) {
      this.userDetail = this.userForm.value;
      this.userForm.reset();
      this.userService.create(this.userDetail).subscribe( (res: any) => {
        this.getUsers();
        this.message.load('Usuario creado correctamente');
        res!;
      } );
    } else {
      //empty
    }
  }

  editUser(user:User){
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: user
    }).afterClosed().subscribe( (res: any) => {
      if (res === true) {
        this.getUsers();
      }
    });
  }

  deleteUser(id:number) {
   this.userService.delete(id).subscribe( (res: any) => {
      this.getUsers();
      this.openSnackBar();
      res!;
    } );
  }

  getRoles() {
    this.roleservice.getAll().subscribe( (res: any) => {
      this.roles = res;
      res!;
    } );
  }

  openSnackBar() {
    this._snackBar.open('Usuario', 'Borrado', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private validateFields(){
    this.userForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role_id: new FormControl('', Validators.required),
    });
  }

  private messageHandler(values:any){
    if (values.nombre == '' && values.email == '' && values.password == '' && values.role_id == 0) {
      this.message.load('Todos los campos son obligatorios');
    } else {
      if(values.nombre == '' || values.nombre == null || values.nombre == undefined ){
        this.message.load('El nombre es un campo obligatorio')
      }
      if(values.email == '' || values.email == null || values.email == undefined ){
        this.message.load('El email es un campo obligatorio')
      }
      if(values.password == '' || values.password == null || values.password == undefined ){
        this.message.load('La contraseña es un campo obligatorio')
      }
      if (values.role_id == '' || values.role_id == null || values.role_id == undefined ){
        this.message.load('El rol es un campo obligatorio')
     }
    }
  }

}
