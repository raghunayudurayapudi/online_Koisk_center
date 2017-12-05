
import { Item } from './../models/items';
import { OrderService } from './order.service';
import { HttpHeaders } from '@angular/common/http';
import {  } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { AuthService } from '../../auth/auth.service';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class DataStorage {
  constructor(private http: HttpClient, private authservice: AuthService, private af: AngularFire) { }

   saveOrdersData(orders: Order[]) {
     const token = this.authservice.token;
const header = new HttpHeaders({ 'Accept': 'application/json' });
     return this.http.put('https://n-aramark.firebaseio.com/orders.json?auth=' + token, orders, { headers: header});
   }
   saveItemsdata(items: Item[]) {
    const header = new HttpHeaders({'Accept': 'application/json'});
    const token = this.authservice.token;
    return this.http.put('https://n-aramark.firebaseio.com/items.json?auth=' + token, items , {headers: header});
   }
   getItemsData() {
    const header = new HttpHeaders({'Accept': 'application/json'});
    return this.af.database.list('/items');
 }
 getOrdersData() {
  const header = new HttpHeaders({'Accept': 'application/json'});
  return this.http.get('https://n-aramark.firebaseio.com/orders.json', {headers: header});
 }
}
