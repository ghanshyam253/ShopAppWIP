import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginService } from './services/login/loginservice.service';
import 'hammerjs';
import { CustomMaterialModule } from './app.material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { DialogService } from './services/dialog/dialog.service';
import { ProductComponent } from './product/product.component';
import { AccountComponent } from './account/account.component';
import { OrdersComponent } from './orders/orders.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewComponent } from './review/review.component';
import { DataService } from './services/dataservice/dataservice.service';
import { NotificationService } from './services/notification/notification.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { GuardService } from './services/guard/guard';
import { CanDeactivateGuard } from './services/guard/deactivateguard';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AuthService } from './services/authentication/auth.service';
import { AuthInterceptor } from './services/interceptors/auth.interceptor';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UsersListComponent } from './users-list/users-list.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    MatConfirmDialogComponent,
    ProductComponent,
    AccountComponent,
    OrdersComponent,
    UserDashboardComponent,
    CheckoutComponent,
    PaymentComponent,
    ReviewComponent,
    NotFoundComponent,
    ProfileEditComponent,
    UserOrdersComponent,
    UsersListComponent,
    PendingOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
    DialogService,
    DataService,
    NotificationService,
    GuardService,
    CanDeactivateGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatConfirmDialogComponent, ProductComponent, ProfileEditComponent, ReviewComponent]
})
export class AppModule { }
