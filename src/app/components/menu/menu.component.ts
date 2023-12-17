import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from '../../services/current-user.service';
import { UserModel } from '../../interfaces/user';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  protected currentOption: string = ""
  protected isDoctor: boolean = false

  constructor(private router: Router, private route: ActivatedRoute, protected currentUserService: CurrentUserService) 
  {
    this.route.queryParams.subscribe(params => {
      this.isDoctor = this.currentUserService.isDoctor()

      let subpageUrl = this.router.url.replace("/main/", "")
      this.currentOption = subpageUrl
    })
  }

  protected handleClicked(option: string) {
    this.currentOption = option

    this.router.navigate(["/main/" + this.currentOption])
  }
}
