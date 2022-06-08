import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/model/order';
import { Topping } from 'src/app/model/topping';
import { AuthService } from 'src/app/services/auth.service';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  response: any;
  toppings: Array<Topping> = [];
  username: string = '';
  constructor(private api: PizzaService, private auth: AuthService) {
    this.api.getAllToppings().subscribe((topping) => {
      this.response = topping;
      this.toppings = this.response.results;
    });

    this.auth?.user$?.subscribe((res) => {
      this.response = res;
      this.username = this.response?.session.username;
    });
  }
  orders: Array<Order> = [];
  ngOnInit(): void {
    this.api.findUserById(1).subscribe((data) => {
      console.log(data);
    });
  }
}
