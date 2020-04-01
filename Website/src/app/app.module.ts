import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/app-header.component';
import { DashboardComponent } from './pages/Dashboard/app-dashboard.component';
import { FooterComponent } from './components/footer/app-footer.component';
import { UsersComponent } from './pages/Users/app-users.component';
import { PageNotFoundComponent } from './pages/PageNotFound/app-page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPageComponent } from './pages/LoginPage/app-login-page.component';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { ProductDefinitionComponent } from './pages/ProductDefinition/app-product-definition.component';
import { ProductComponent } from './pages/Product/app-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './components/modal/app-modal.component';
import { CreateUserComponent } from './pages/Users/AddNewUser/app-create-user.component';
import { BasicAuthInterceptor } from './auth/basic-auth.interceptor';
import { ErrorInterceptor } from './auth/error.interceptor';
import { SpinnerComponent } from './components/spinner/app-spinner.component';
import { InactivePageComponent } from './pages/Inactive/app-inactive-page.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginPageComponent,
    ProductDefinitionComponent,
    ProductComponent,
    ModalComponent,
    CreateUserComponent,
    SpinnerComponent,
    InactivePageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    ProductService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
