import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.css']
})
export class EditOrdersComponent implements OnInit {

  itemSubcsrption: Subscription;
  order: Order;
  editMode = false;
  editOrderForm: FormGroup;
  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.itemSubcsrption = this.route.data.subscribe((data: {order: Order}) => {
        if (data['order']) {  console.log(this.order);
          this.order = data['order'];
          this.editMode = true;
          this.initForm();
        }else {
          console.log('no orders has been placed');
        }
    });
  }

  private initForm() {
    this.editOrderForm = new FormGroup(
      {'status': new FormControl(this.order.status, Validators.required),
        'KID': new FormControl(this.order.KID, [Validators.required, Validators.pattern(/^K00[0-9]{6}/)]),
        'amount': new FormControl(this.order.amount, Validators.required)
      },
    );
  }
  Ondelete() {
      this.orderService.deleteOrder(this.order);
      this.router.navigate(['../'], {relativeTo: this.route});
  }
  Oncancel() {
  this.editOrderForm.reset();
  this.editOrderForm.get('status').patchValue(this.order.status);
  this.editOrderForm.get('KID').patchValue(  this.order.KID);
  this.editOrderForm.get('amount').patchValue(this.order.amount);
  }
  onsubmit() {
    console.log('form is submitted');
    console.log(this.editOrderForm.value);
    if (this.editOrderForm.get('status').value !== this.order.status || this.editOrderForm.get('KID').value !== this.order.KID
    || this.editOrderForm.get('amount').value !== this.order.amount) {
      this.order.status = this.editOrderForm.get('status').value;
      this.order.KID = this.editOrderForm.get('KID').value;
      this.order.amount = this.editOrderForm.get('amount').value;
        this.orderService.updateOrder(this.order);
    }else {
      alert('no changes have been made');
    }
  }
}
