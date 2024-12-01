import { Injectable } from '@angular/core';
import { Dish } from './dish.service';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private cartKey = 'cart';

  constructor() {}

  addToCart(dish: Dish & { quantidade: number }): void {
    const cart = this.getCartItems();
    const existingItem = cart.find(item => item.id === dish.id);
  
    if (existingItem) {
      existingItem.quantidade += dish.quantidade;
    } else {
      cart.push(dish);
    }
  
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  getCartItems(): (Dish & { quantidade: number })[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  updateQuantity(id: string, quantidade: number): void {
    const cart = this.getCartItems();
    const item = cart.find(dish => dish.id === id);

    if (item) {
      item.quantidade = quantidade;
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }
  }

  removeFromCart(id: string): void {
    const cart = this.getCartItems().filter(dish => dish.id !== id);
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
