import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../../shared/models/items';

@Component({
  selector: 'app-item-item',
  templateUrl: './item-item.component.html',
  styleUrls: ['./item-item.component.css']
})
export class ItemItemComponent implements OnInit {
  @Input() item: Item;
  @Input() index: string;
  constructor() {console.log('hello world'); }

  ngOnInit() {
  }

}
