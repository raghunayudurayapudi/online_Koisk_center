import { AdminSigninComponent } from './auth/admin-signin/admin-signin.component';
import { AuthGuard } from './auth/auth.guard.service';
import { AdminSignupComponent } from './auth/admin-signup/admin-signup.component';
import { HttpClientModule } from '@angular/common/http';
import { DataStorage } from './shared/services/data.storage';

import { ItemCreateComponent } from './admin/admin-manage-items-360/item-create/item-create.component';
import { AdminHeaderComponent } from './core/admin-header/admin-header.component';
import { NgModel } from '@angular/forms/src/directives';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { ItemItemComponent } from './item-360/item-list/item-item/item-item.component';
import { ItemListComponent } from './item-360/item-list/item-list.component';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFire, AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { Item360Component } from './item-360/item-360.component';
import { ItemDetailsComponent } from './item-360/item-details/item-details.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin/admin.component';
import { AdminManageOrdersComponent } from './admin/admin-manage-orders/admin-manage-orders.component';
import { AdminManageItems360Component } from './admin/admin-manage-items-360/admin-manage-items-360.component';
import { HeaderComponent } from './core/header/header.component';
import { ItemService } from './shared/services/item.service';
import { OrderItemComponent } from './orders/order-list/order-item/order-item.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderService } from './shared/services/order.service';
import { EditItemsComponent } from './admin/admin-manage-items-360/edit-items/edit-items.component';
import { EditOrdersComponent } from './admin/admin-manage-orders/edit-orders/edit-orders.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';

export const firebaseconfig = {
  apiKey: 'AIzaSyCEnaFVoiGqh1ZMX2i8DcP8g0FGrRJ77xA',
  authDomain: 'n-aramark.firebaseapp.com',
  databaseURL: 'https://n-aramark.firebaseio.com',
  projectId: 'n-aramark',
  storageBucket: 'n-aramark.appspot.com',
  messagingSenderId: '23408276067'
};
@NgModule({
  declarations: [
    AppComponent,
    Item360Component,
    ItemDetailsComponent,
    OrdersComponent,
    ItemCreateComponent,
    AdminComponent,
    OrderListComponent,
    AdminManageOrdersComponent,
    AdminManageItems360Component,
    HeaderComponent,
    OrderItemComponent,
    EditItemsComponent,
    ItemListComponent,
    HomeComponent,
    ItemItemComponent,
    OrderDetailsComponent,
    AdminSignupComponent,
    AdminHeaderComponent,
    EditOrdersComponent,
    AdminSigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseconfig),
  ],
  providers: [ItemService, OrderService, DataStorage, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
