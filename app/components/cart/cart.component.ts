import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  increaseQty(item: any) {
    this.cartService.addToCart(item);
    this.cartItems = this.cartService.getCartItems(); // update view
  }

  decreaseQty(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems(); // update view
  }

  // ✅ ADD THIS
  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is already empty!');
      return;
    }

    alert('Order placed successfully!');
    this.cartService.clearCart(); // clear cart in service
    this.cartItems = [];          // clear UI
  }
}