import { OrderService } from './../../shared/services/order.service';
import { Order } from './../../shared/models/order';
import { Subscription, Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  itemSubcsrption: Subscription;
  order: Order;
  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.itemSubcsrption = this.route.data.subscribe((data: {order: Order}) => {
      console.log(data['order']);
        this.order = data['order'];
        if (this.order) {  console.log(this.order); }else {
          console.log('no orders has been placed');
        }
    });
  }

}
