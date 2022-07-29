import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SalesComponent } from './components/sales/sales.component';
import { ConstumerComponent } from './components/customers/constumer.component';
import { AdminGuard } from './guards/admin.guard';
import { RoleGuard } from './guards/role.guard';
import { CheckLoginGuard } from './guards/check-login.guard';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CheckLoginGuard]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard, RoleGuard],
    data: { role: 1 },
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'seller',
    canActivate: [AdminGuard, RoleGuard],
    data: { role: 2 },
    component: SalesComponent
  },
  {
    path: 'customer',
    canActivate: [AdminGuard, RoleGuard],
    data: { role: 3 },
    component: ConstumerComponent
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
