import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  phone = '';
  password = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
  this.authService.login(this.phone, this.password).subscribe({
    next: (res) => {
      this.error = null;
      this.authService.setToken(res.token);
      this.router.navigate(['/']);
    },
    error: () => {
      this.error = 'Invalid phone or password';
    }
  });
}
}