import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public showPassword: boolean = false

  constructor(private router: Router) {}

  protected login() {
    // TODO: check login and password
    this.router.navigate(['/main'])
  }
}
