import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../model/order';
import { Topping } from '../model/topping';
import { AuthService } from '../services/auth.service';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  response: any;
  toppings: Array<Topping> = [];
  private userId: number = 0;

  constructor(
    private api: PizzaService,
    private auth: AuthService,
    private router: Router
  ) {
    this.api.getAllToppings().subscribe((topping) => {
      this.response = topping;
      this.toppings = this.response.results;
    });
    this.auth?.user$?.subscribe((res) => {
      this.response = res;
      this.userId = this.response?.session.userId;
    });
  }
  orderForm: FormGroup = new FormGroup({
    option1: new FormControl(''),
    option2: new FormControl(''),
    option3: new FormControl(''),
  });

  get option1() {
    return this.orderForm.get('option1')?.value;
  }
  get option2() {
    return this.orderForm.get('option2')?.value;
  }
  get option3() {
    return this.orderForm.get('option3')?.value;
  }

  ngOnInit(): void {}
  order() {
    //get the userId
    //post the data

    const order: Order = {
      userId: this.userId,
      topping_id1: this.option1,
      topping_id2: this.option2,
      topping_id3: this.option3,
    };
    this.api.createOrder(order).subscribe();
    this.orderForm.reset;
    this.router.navigateByUrl('/receipt');
  }
}
