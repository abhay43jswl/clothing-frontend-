import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  addToCart(product: any) {
    const item = this.cart.find(item => item.id === product.id);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.updateCartCount();
  }

  removeFromCart(product: any) {
    const index = this.cart.findIndex(item => item.id === product.id);
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
      this.updateCartCount();
    }
  }

  getCartItems() {
    return this.cart;
  }

  clearCart() {
    this.cart = [];
    this.updateCartCount();
  }

  private updateCartCount() {
    const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.next(count);
  }
}