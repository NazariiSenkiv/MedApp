import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';
import { AnalysisShortInfo } from '../../interfaces/analysis';
import { CustomPipesModule } from '../../pipes/custom-pipes/custom-pipes.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


import { AnalysesService } from '../../services/analyses.service';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-analyses-content',
  standalone: true,
  imports: [NgFor, CustomPipesModule, FormsModule, NgIf],
  templateUrl: './analyses-content.component.html',
  styleUrl: './analyses-content.component.scss'
})
export class AnalysesContentComponent {

  protected analysesListContent: AnalysisShortInfo[] = []

  protected searchPatientName: string = ""

  protected shouldCollapse: boolean = false

  constructor(private router: Router, private analysisService: AnalysesService, protected currentUserService: CurrentUserService, private breakpointService: BreakpointObserver) {
    let currentUserId = currentUserService.getCurrentUserId()

    this.analysisService.getAnalysesShortInfos(currentUserId).subscribe({
      next: (analysesShortInfo: AnalysisShortInfo[]) => {
        console.log(analysesShortInfo)
        this.analysesListContent = analysesShortInfo
      },
      error: (e) => console.error(e),
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

  protected addAnalysis() {
    this.router.navigate(['add-analyses']);
  }

  protected selectAnalysis(selectedItemId: number) {
    this.router.navigate(['analyses'], { queryParams: { mode: "existing", id: selectedItemId } });
  }
}
