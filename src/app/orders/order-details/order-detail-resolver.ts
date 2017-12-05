
import { Observable } from 'rxjs/Rx';
import { resolve } from 'url';
import { Injectable } from '@angular/core';
import { Order } from './../../shared/models/order';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
@Injectable()
export class OrderDetailsResolver implements Resolve<Order> {
  constructor(private orderService: OrderService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): Observable<Order> {
    const id = route.paramMap.get('id');
    console.log(id);
    return this.orderService.getOrder(+id). take(1).map(
        (order: Order) => {
          console.log(order);
          if (order) {
            console.log(order);
            return order;
          }else {
            this.router.navigate(['/menu-list']);
            return null;
          }
        });
      }
    }
