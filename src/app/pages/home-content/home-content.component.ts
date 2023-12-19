import { Component } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { UserModel } from '../../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss'
})
export class HomeContentComponent {
  protected userName: string = ''

  protected shouldCollapse: boolean = false

  constructor(private route: ActivatedRoute, protected currentUserService: CurrentUserService, private breakpointService: BreakpointObserver) 
  {
    this.route.queryParams.subscribe(params => {
      let currentUser: UserModel | null = this.currentUserService.getCurrentUser()
    
      let prefix = currentUserService.isDoctor() ? 'dr.' : ''
      this.userName = prefix + currentUser?.name
    })

    breakpointService
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.shouldCollapse = false

        if (result.matches) {
          this.shouldCollapse = true
        }
      })
  }
}
