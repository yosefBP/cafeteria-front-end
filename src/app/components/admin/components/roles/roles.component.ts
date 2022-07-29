import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { RoleService } from 'src/app/services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormRolesComponent } from './form-roles/form-roles.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  ELEMENT_DATA: Role[] = [];

  displayedColumns: string[] = ['id', 'rol', 'actions'];
  dataSource:any;
  constructor(private roleService:RoleService, private _snackBar:MatSnackBar,
    private dialog:MatDialog) {
    // empty constructor
    }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roleService.getAll().subscribe( (res: Role[]) => {
      this.ELEMENT_DATA = res;
      this.dataSource = this.ELEMENT_DATA;
    } );
  }

  newRole() {
    this.dialog.open(FormRolesComponent, {
      width: '30%'
    }).afterClosed().subscribe((res: any) => {
      if (res === true) {
        this.getRoles();
      }
    });
  }

  editRole(role:Role) {
    this.dialog.open(FormRolesComponent, {
      width: '30%',
      data: role
    }).afterClosed().subscribe((response: any) => {
      if (response === true) {
        this.getRoles();
      }
    });
  }

  deleteRole(id:number) {
    this.roleService.delete(id).subscribe( (res: any) => {
      this.getRoles();
      this.openSnackBar();
      res!;
    } );
  }

  openSnackBar() {
    this._snackBar.open('Rol', 'Eliminado', {
      duration: 1500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

}
