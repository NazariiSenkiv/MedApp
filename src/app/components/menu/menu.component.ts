import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  protected currentOption: string = ""

  constructor(private router: Router) {}

  protected handleClicked(option: string) {
    this.currentOption = option

    this.router.navigate(["/main/" + this.currentOption])
  }
}
