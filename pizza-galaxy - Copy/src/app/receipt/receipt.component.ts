import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { AuthService } from '../services/auth.service';
import { PizzaService } from '../services/pizza.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}
export interface UserOrder {
  topping1: string;
  topping2: string;
  topping3: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079 },
  { position: 2, name: 'Helium', weight: 4.0026 },
  { position: 3, name: 'Lithium', weight: 6.941 },
  { position: 4, name: 'Beryllium', weight: 9.0122 },
  { position: 5, name: 'Boron', weight: 10.811 },
  { position: 6, name: 'Carbon', weight: 12.0107 },
  { position: 7, name: 'Nitrogen', weight: 14.0067 },
  { position: 8, name: 'Oxygen', weight: 15.9994 },
  { position: 9, name: 'Fluorine', weight: 18.9984 },
  { position: 10, name: 'Neon', weight: 20.1797 },
];

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit {
  response: any;
  orders: Array<UserOrder> = [
    {
      topping1: 'test',
      topping2: 'sadsa',
      topping3: 'dsfsdf',
    },
  ];
  dataSource: Array<UserOrder> = [];
  private userId: number = 0;
  constructor(private api: PizzaService, private auth: AuthService) {
    this.auth?.user$?.subscribe((res) => {
      this.response = res;
      this.userId = this.response?.session.userId;
    });
    this.api.getAllUserOrders(this.userId).subscribe((data) => {
      console.log(data);
      this.response = data;
      this.orders = this.response.results;
      this.dataSource = this.orders;
    });
  }

  displayedColumns: string[] = ['position', 'name', 'weight'];

  ngOnInit(): void {}
}
