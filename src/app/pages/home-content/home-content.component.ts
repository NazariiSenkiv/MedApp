import { Component } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { UserModel } from '../../interfaces/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.scss'
})
export class HomeContentComponent {
  protected userName: string = ''

  constructor(private route: ActivatedRoute, protected currentUserService: CurrentUserService) 
  {
    this.route.queryParams.subscribe(params => {
      let currentUser: UserModel | null = this.currentUserService.getCurrentUser()
    
      let prefix = currentUserService.isDoctor() ? 'dr.' : ''
      this.userName = prefix + currentUser?.name
    })
  }
}
