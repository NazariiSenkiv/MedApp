import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UserModel } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { CurrentUserService } from '../../services/current-user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-patients-content',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './patients-content.component.html',
  styleUrl: './patients-content.component.scss'
})
export class PatientsContentComponent {
  protected patients: UserModel[] = []

  protected safe: SafeResourceUrl | null = null

  constructor(private usersService: UsersService, private currentUserService: CurrentUserService, protected sanitizer: DomSanitizer) {
    let currentUserId = currentUserService.getCurrentUserId()

    usersService.getWards(currentUserId).subscribe({
      next: (wards) => {
          this.patients = wards
          console.log
      },
      error: (e) => console.error(e),
  })
  }

  protected transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url == '' ? 'assets/img/profile-button.svg' : url);
  }
}
