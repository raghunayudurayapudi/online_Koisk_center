import { Order } from './../../shared/models/order';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[];
  orderSubcsrption: Subscription;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderSubcsrption = this.orderService.getOrders().subscribe((value: Order[]) => {
      console.log(value);
        this.orders = value;
    });
  }

}
