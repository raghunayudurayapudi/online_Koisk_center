import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database/';

import { DataStorage } from './data.storage';
import { Order } from './../models/order';
import { Observable } from 'rxjs/Observable';
import { ItemService } from './item.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Item } from '../models/items';
let orders: Order[] = [];
// tslint:disable:max-line-length
// tslint:disable:no-inferrable-types
@Injectable()
export class OrderService {
  static idnumber: number = 0;
  ordersdatabase$: FirebaseListObservable<Order[]>= null;
  order: FirebaseObjectObservable<Order> = null;
  private orders$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(
    orders
  );


  constructor(private itemService: ItemService, private af: AngularFireDatabase) {
    this.getordersfromServer().subscribe((res) => {
      console.log('firebase database is updated');
       orders = [];
     for (const x in res) {
       if (res[x]) {
        OrderService.idnumber++;
         console.log( orders.push(res[x]));
        }
     }
      this.orders$.next(orders);
      },
     error => console.log(error)
    );
  }
  getordersfromServer() {
    this.ordersdatabase$ = this.af.list('/orders');
    return this.ordersdatabase$;
      }
  /**
   *
   *returns list of all the orders lisr
   * @returns {BehaviorSubject<Order[]>}
   * @memberof OrderService
   */
  getOrders(): BehaviorSubject<Order[]> {
    return this.orders$;
  }
  /**
   * pushes new order into orders list
   *
   * @param {number} id
   * @param {number} amount
   * @memberof OrderService
   */
  pushOrders(type:string,name:string,price: number, amount: number, KID: string) {
    const newOrder = <Order>{};
    newOrder.id = OrderService.idnumber++;
    newOrder.amount = amount;
    newOrder.price= price;
    newOrder.type = type;
    newOrder.name = name;
    newOrder.KID = KID;
    newOrder.status = 'inprogress';
    const time =new Date();
    newOrder.time = time.toUTCString();
    console.log(newOrder);
    this.ordersdatabase$.push(newOrder).then(( ) => {

    }).catch((error) => console.log('server Error' + error));

  }
  /**
   * return selected order details
   *
   * @param {number} id
   * @returns
   * @memberof OrderService
   */
  getOrder(id: number): Observable<Order> {
    return this.getOrders().map(ordersarray =>
      ordersarray.find((order: Order) => order.id === id)
    );
  }
  /**
   * Deletes Order from the orders list based on its id;
   *
   * @param {number} id
   * @memberof OrderService
   */
  deleteOrder(orderDeleted: Order) {
  const index = orders.findIndex(order => order.$key === orderDeleted.$key);
  console.log(orderDeleted);
    const dataurl = `/orders/${orderDeleted.$key}`;
    console.log(dataurl);
    this.af.object(dataurl).remove().then(() => {
      orders.splice(index, 1);
      console.log('Item is Deleted Sucessfully');
      this.orders$.next(orders);
    }).catch(() => console.log('Deleted error '));
  }
/**
 * updates order upon changes in the order statment
 *
 * @param {Order} order
 * @memberof OrderService
 */
updateOrder(order: Order) {
  const index = orders.findIndex(orderitem => orderitem.$key === order.$key);
  if (index >= 0 ) {

    const dataurl = `orders/${order.$key}`;
    const newOrder = <Order>{};
    newOrder.id = OrderService.idnumber++;
    newOrder.amount = order.amount;
    newOrder.price = order.price;
    newOrder.type = order.type;
    newOrder.name = order.name;
    newOrder.KID = order.KID;
    newOrder.status = order.status;
    newOrder.time = order.time;
    console.log(dataurl);
    this.af.object(dataurl).set(newOrder).then(() => {
      orders[index] = order;
      this.orders$.next(orders);
    }).catch(() => console.log('updating error'));
}
}
}
