import { setTimeout } from 'timers';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Item } from '../../../shared/models/items';
import { ItemService } from '../../../shared/services/item.service';

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.css']
})
export class EditItemsComponent implements OnInit {
  editItem: Item;
  EditMode: boolean;
  itemId: number;
  itemKey:string;
  types: Array<string>= [ 'Appetizers', 'Sandwiches'];
  @ViewChild('f') editItemForm: NgForm;
  constructor(private route: ActivatedRoute, private Router: Router, private itemService: ItemService) {
    this.EditMode = false;
  }

  ngOnInit() {
    console.log('new data');
    this.route.data.subscribe((data: {item: {item: Item, id: number}}) => {
      console.log(data);
        if (data !== null && data['item'] !==undefined) {
          console.log(data);
          this.editItem = data['item']['item'];
          this.itemId = data['item']['id'];
          console.log(this.editItem);
          this.itemKey = this.editItem.$key;
          this.EditMode = true;
          setTimeout(() => {
            this.editItemForm.form.setValue({
              name: this.editItem.name,
              subheader: this.editItem.subheader,
              description: this.editItem.description,
              type: this.editItem.type,
              imgUrl: this.editItem.imgUrl,
              price: this.editItem.price
             }
            );
          }, 1000);
          // console.log(this.editItemForm.value);
        } else {
          this.EditMode = false;
          setTimeout(() => {
            this.editItemForm.form.setValue({
              name: '',
              subheader: '',
              description: '',
              type:'',
              imgUrl:'',
              price:0
             }
            );
          },1000);
        }
    });
  }
  Oncancel() {
    this.editItemForm.form.reset();
  }
  Ondelete() {
    this.itemService.deleteitem(this.editItem);
    this.Router.navigate(['../'], {relativeTo: this.route});
}
  onsubmit() {
    if (!this.EditMode) {
      console.log('dadadadaaad');
        if (this.editItemForm.form.get('name') != null) {
          this.itemService.addItem(this.editItemForm.form.value);
          console.log('new item is going to get added');
        }else {
          alert('please fill the form before you submit');
        }
    } else {
      this.itemService.updateItem(this.itemKey, this.editItemForm.value);
      console.log(this.editItemForm.value);
    }
  }
}
