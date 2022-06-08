import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { Topping } from '../model/topping';
import { ToppingType } from '../model/toppingType';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  getAllUserOrders(userId: number) {
    return this.http.get(`/api/orders/user/${userId}`);
  }

  getAllOrders() {
    return this.http.get('/api/orders');
  }
  getAllToppings() {
    return this.http.get('/api/toppings');
  }
  getAllToppingType() {
    return this.http.get('/api/topping-type');
  }
  getAllUsers() {
    return this.http.get('/api/users');
  }

  findOrderById(orderId: Number) {
    return this.http.get(`/api/orders/${orderId}`);
  }
  findToppingById(toppingId: Number) {
    return this.http.get(`/api/toppings/${toppingId}`);
  }
  findToppingTypesById(typeId: Number) {
    return this.http.get(`/api/topping-type/${typeId}`);
  }
  findUserById(userId: Number) {
    return this.http.get(`/api/users/${userId}`);
  }

  deleteOrderById(orderId: Number) {
    return this.http.delete(`/api/orders/${orderId}`);
  }
  deleteToppingById(toppingId: Number) {
    return this.http.delete(`/api/toppings/${toppingId}`);
  }
  deleteToppingTypesById(orderId: Number) {
    return this.http.delete(`/api/orders/${orderId}`);
  }
  deleteUserById(toppingId: Number) {
    return this.http.delete(`/api/toppings/${toppingId}`);
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post<any>('api/orders', {
      userId: order.userId,
      topping_id1: order.topping_id1,
      topping_id2: order.topping_id2,
      topping_id3: order.topping_id3,
    });
  }
  createTopping(topping: Topping) {
    this.http.post<Topping>('api/toppings', {
      name: topping.name,
      topping_type_id: topping.topping_type_id,
    });
  }
  createToppingType(toppingType: ToppingType) {
    this.http.post<ToppingType>('api/topping-type', {
      name: toppingType.name,
    });
  }
  createUser(user: User): Observable<any> {
    return this.http.post<any>('api/users', user);
  }

  updateOrder(body: any, orderId: number) {
    this.http.put<any>(`api/users/${orderId}`, body);
  }
  updateTopping(body: any, toppingId: number) {
    this.http.put<any>(`api/users/${toppingId}`, body);
  }
  updateToppingType(body: any, typeId: number) {
    this.http.put<any>(`api/users/${typeId}`, body);
  }
  updateUser(body: any, userId: number) {
    this.http.put<any>(`api/users/${userId}`, body);
  }
}
