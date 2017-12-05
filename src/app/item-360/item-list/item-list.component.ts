import { validate } from 'codelyzer/walkerFactory/walkerFn';
import { Item } from './../../shared/models/items';
import { ItemService } from './../../shared/services/item.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  menu_items_apptizers: Array<Item>;
  menu_items_sandwitches: Array<Item>;
  totalItems: Array<Item>;
  constructor(private items: ItemService) { }

  ngOnInit() {

    this.items.getItems().subscribe(items => this.totalItems = items);

  }

}
