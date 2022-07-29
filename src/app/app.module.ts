import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MessengerComponent } from './components/messages/messenger.component';
import { AdministratorComponent } from './components/admin/administrator.component';
import { SalesComponent } from './components/sales/sales.component';
import { ConstumerComponent } from './components/customers/constumer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { ErrorComponent } from './components/error/error.component';
import { NavbarComponent } from './components/admin/components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './components/customers/product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessengerComponent,
    AdministratorComponent,
    SalesComponent,
    ConstumerComponent,
    ErrorComponent,
    NavbarComponent,
    HeaderComponent,
    ProductComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot(),
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
