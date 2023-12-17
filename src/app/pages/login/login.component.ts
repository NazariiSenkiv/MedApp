import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrentUserService } from '../../services/current-user.service';
import { LoginData } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public showPassword: boolean = false

  protected loginString: string = ''
  protected passwordString: string = ''

  protected loginErrorString: string = ''
  protected passwordErrorString: string = ''

  constructor(private router: Router, protected currentUserService: CurrentUserService) {}

  protected login() {
    this.loginErrorString = ''
    this.passwordErrorString = ''

    if (this.loginString === '') {
      this.loginErrorString = 'Please, enter login'
    } else if (this.passwordString === '') {
      this.passwordErrorString = 'Please, enter password'
    } else { // Fields are filled
      this.currentUserService.loginCurrentUser({login: this.loginString, password: this.passwordString})
        .subscribe({
          next: (loginData) => {
            this.router.navigate(['/main'])
          },
          error: (e) => {
            if (e.error.includes('login')) {
              this.loginErrorString = 'Login is invalid'
            } else if (e.error.includes('password')) {
              this.passwordErrorString = 'Password is invalid'
            }
          }
        })
      //
    }
  }
}
