import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';
import { AnalysisShortInfo } from '../../interfaces/analysis';
import { CustomPipesModule } from '../../pipes/custom-pipes/custom-pipes.module';


import { AnalysesService } from '../../services/analyses.service';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-analyses-content',
  standalone: true,
  imports: [NgFor, CustomPipesModule, FormsModule],
  templateUrl: './analyses-content.component.html',
  styleUrl: './analyses-content.component.scss'
})
export class AnalysesContentComponent {

  protected analysesListContent: AnalysisShortInfo[] = []

  protected searchPatientName: string = ""

  constructor(private router: Router, private analysisService: AnalysesService, private currentUserService: CurrentUserService) {
    let currentUserId = currentUserService.getCurrentUserId()

    this.analysisService.getAnalysesShortInfos(currentUserId).subscribe({
      next: (analysesShortInfo: AnalysisShortInfo[]) => {
        console.log(analysesShortInfo)
        this.analysesListContent = analysesShortInfo
      },
      error: (e) => console.error(e),
    })
  }

  protected addAnalysis() {
    this.router.navigate(['add-analyses']);
  }

  protected selectAnalysis(selectedItemId: number) {
    this.router.navigate(['analyses'], { queryParams: { mode: "existing", id: selectedItemId } });
  }
}
