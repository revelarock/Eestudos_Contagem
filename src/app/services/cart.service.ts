import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Url } from 'url';
import { Source } from 'webpack-sources';

export interface Product {
  id: number;
  name: string;
  point: number;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    { id: 0, name: 'Estudo do Qualdade do Ar', point: 1.0, amount: 1 },
    { id: 1, name: 'TCC sobre AI', point: 5.0, amount: 1},
    { id: 2, name: 'Estudos sobre as ações Humanas', point: 4.0, amount: 1},
    { id: 3, name: 'Preparação concurso no ITA', point: 19.0, amount: 1}
  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() { }

  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries() as any) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {
    for (let [index, p] of this.cart.entries() as any) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
