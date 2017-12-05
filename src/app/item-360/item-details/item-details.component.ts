import { Item } from './../../shared/models/items';
import { Subscription } from 'rxjs/Rx';
// tslint:disable:max-line-length
import { ItemService } from '../../shared/services/item.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { OrderService } from '../../shared/services/order.service';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  item: Item;
  id: number| string;
  itemSubcsrption: Subscription;
  amount: number;
  KID: string;
  constructor(private route: ActivatedRoute, private router: Router, private itemService: ItemService, private orderService: OrderService) { }

  ngOnInit() {

    this.itemSubcsrption =  this.route.paramMap.switchMap((params: ParamMap) => {
      this.id = params.get('id');
  return this.itemService.getItem(params.get('id')); }).subscribe((data: Item) => {
        console.log(data);
        this.item = Object.assign({}, data);
      });
      // this.itemSubcsrption =  this.route.data.subscribe((data: {item: Item}) => {
      //   console.log(data);
      //   this.item = data.item;
      // });
  }
  addtoOrders(item: Item) {
    this.orderService.pushOrders(item.type,item.name,item.price,this.amount, this.KID);
  }
  ngOnDestroy() {
    this.itemSubcsrption.unsubscribe();
  }
}
