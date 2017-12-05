import { FirebaseObjectObservable, FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database/';
// tslint:disable:max-line-length
import { error } from 'util';
import { Item } from './../models/items';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataStorage } from './data.storage';
import { AngularFire } from 'angularfire2';

let  ITEMS: Item[] = [];
@Injectable()
export class ItemService {
  static nextItemId = 7;
  itemsdatabase$: FirebaseListObservable<Item[]>= null;
  item: FirebaseListObservable<Item> = null;
  itemsubscriber;
  private items$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(ITEMS);
  constructor(private af: AngularFireDatabase) {
      this.getItemsfromServer().subscribe((res) => {
           console.log('firebase database is updated');
            ITEMS = [];
          for (const x in res) {
            if (res[x]) {
              console.log(res[x]);
              console.log( ITEMS.push(res[x]));
             }
          }
           this.items$.next(ITEMS);
           },
          error => console.log(error)
         );
   }
/**
 * returns an Observable consiting of items in the Menu
 * @memberof ItemService
 */
getItemsfromServer(): FirebaseListObservable<Item[]> {
  this.itemsdatabase$ = this.af.list('/items');
  return this.itemsdatabase$;
   }
   getItems(): BehaviorSubject<Item[]> {
     return this.items$;
   }
   /**
    * return the items of specific id
    * @param id
    * @memberof ItemService
    */
  getItem(id: number | string) {
    return this.getItems()
      .map(items => items[+id]);
  }
/**
 * adds new ingredients the menu
 * @param {Item} item
 * @memberof ItemService
 */
addItem(item) {
    if (item) {
      this.itemsdatabase$.push(item)
      .catch(error => console.log('error'));
    }
  }
/**
 * returns the items based on the categories
 *
 * @param {string} type
 * @returns Promise<Item[]>
 * @memberof ItemService
 */
getItemsByCateogry(type: string) {
      return this.getItems().map(items => items.filter(item => item.type === type));
}
/**
 * updates the item details
 *
 * @param {number} index
 * @param {Item} newItem
 * @memberof ItemService
 */
updateItem(key: string, newItem: Item) {
  const dataurl = `items/${key}`;
  console.log(newItem);
  console.log('item is getting edited'+ dataurl);
  this.af.object(dataurl).set(newItem).then(() => {
  }).catch(() => console.log('updating error'));
}
deleteitem(item: Item) {
  console.log('deleting order' + item);
  const index = ITEMS.findIndex(itemEACH => itemEACH.$key === item.$key);
  const dataurl = `items/${item.$key}`;
  this.af.object(dataurl).remove().then(() => {
    ITEMS.splice(index, 1);
    console.log('Item is Deleted Sucessfully');
    this.items$.next(ITEMS);
  }).catch(() => console.log('Deleted error '));
}

}
