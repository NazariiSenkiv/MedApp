import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { UserModel } from '../../interfaces/user';
import { UsersService } from '../../services/users.service';
import { CurrentUserService } from '../../services/current-user.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CustomPipesModule } from '../../pipes/custom-pipes/custom-pipes.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-patients-content',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, CustomPipesModule],
  templateUrl: './patients-content.component.html',
  styleUrl: './patients-content.component.scss'
})
export class PatientsContentComponent {
  protected patients: UserModel[] = []
  protected searchFullname: string = ""

  protected shouldCollapse: boolean = false

  protected safe: SafeResourceUrl | null = null

  constructor(private usersService: UsersService, private currentUserService: CurrentUserService, protected sanitizer: DomSanitizer, private breakpointService: BreakpointObserver) {
    let currentUserId = currentUserService.getCurrentUserId()

    breakpointService
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(result => {
        this.shouldCollapse = false

        if (result.matches) {
          this.shouldCollapse = true
        }
      })

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
