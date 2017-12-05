import { ItemService } from './../shared/services/item.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Item } from '../shared/models/items';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class CrisisDetailResolver implements Resolve<{item: Item, id: number}> {
  constructor(private ItemService: ItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{item: Item, id: number}> {
    const id = route.paramMap.get('id');

    return this.ItemService.getItem(id).take(1).map(item => {
      if (item) {
        console.log(item);
        return {item: item, id: +id};
      } else { // id not found
        this.router.navigate(['/menu-list']);
        return null;
      }
    });
  }
}
