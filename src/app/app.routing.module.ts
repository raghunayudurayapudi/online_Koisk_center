
import { AdminSignupComponent } from './auth/admin-signup/admin-signup.component';
import { AdminSigninComponent } from './auth/admin-signin/admin-signin.component';
import { HomeComponent } from './home/home.component';
import { EditOrdersComponent } from './admin/admin-manage-orders/edit-orders/edit-orders.component';
import { childOfKind } from 'tslint/lib';
import { AdminComponent } from './admin/admin.component';

import { Item360Component } from './item-360/item-360.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ItemDetailsComponent } from './item-360/item-details/item-details.component';
import { CrisisDetailResolver } from './item-360/item-detail.resolver.service';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderDetailsResolver } from './orders/order-details/order-detail-resolver';
import { AdminManageItems360Component } from './admin/admin-manage-items-360/admin-manage-items-360.component';
import { EditItemsComponent } from './admin/admin-manage-items-360/edit-items/edit-items.component';
import { AdminManageOrdersComponent } from './admin/admin-manage-orders/admin-manage-orders.component';
import { AuthGuard } from './auth/auth.guard.service';
 const appRoutes: Routes = [
  {path: 'sign-in', component: AdminSigninComponent},
  {path: 'sign-up', component: AdminSignupComponent},
  {
    path: 'home', component: HomeComponent, children: [
    { path: 'menu-list', component: Item360Component, children: [
    {
          path: ':id',
          component: ItemDetailsComponent,
          // resolve: {
          //   item: CrisisDetailResolver
          // }
    },

      ]
    },
    { path: 'order_list',   component: OrdersComponent, children: [
      {
        path: ':id',
        component: OrderDetailsComponent,
        resolve : {
          order: OrderDetailsResolver
        }
      }
    ]},
  ]
}
,
    {
      path: 'admin-home', component: AdminComponent, canActivate: [AuthGuard] , children: [
      {
        path: 'menu-list', component: Item360Component, children: [
        {
              path: ':id',
              component: ItemDetailsComponent,
              // resolve: {
              //   item: CrisisDetailResolver
              // }
        }]},
      {
          path: 'order_list',   component: OrdersComponent, children: [
          {
            path: ':id',
            component: OrderDetailsComponent,
            resolve : {
              order: OrderDetailsResolver
            }
          }
        ]}
        ,
      {
        path: 'manage-items', component: AdminManageItems360Component, children: [
        {
          path: 'create-item', component: EditItemsComponent},
         {
           path: ':id', component: EditItemsComponent,
         resolve: {
           item: CrisisDetailResolver
         }
       },

      ]},
      {
        path: 'manage-orders', component: AdminManageOrdersComponent , children: [
          {path : ':id', component: EditOrdersComponent, resolve: {order: OrderDetailsResolver}}
        ]
      }
     ]},
    { path: '',   redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  providers: [CrisisDetailResolver, OrderDetailsResolver],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
