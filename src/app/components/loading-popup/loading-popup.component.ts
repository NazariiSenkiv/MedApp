import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-loading-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading-popup.component.html',
  styleUrl: './loading-popup.component.scss'
})
export class LoadingPopupComponent {
  protected portraitMode: boolean = false

  constructor(private BreakpointService: BreakpointObserver) {
    BreakpointService
      .observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.portraitMode = false

        if (result.matches) {
          this.portraitMode = true
        }
      })
  }
}
