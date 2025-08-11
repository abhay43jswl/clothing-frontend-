import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  cartCount = 0;

  constructor(
    private cartService: CartService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => this.cartCount = count);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}