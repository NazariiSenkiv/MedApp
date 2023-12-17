import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { AnalysisShortInfo } from '../../interfaces/analysis';

import { AnalysesService } from '../../services/analyses.service';

@Component({
  selector: 'app-analyses-content',
  standalone: true,
  imports: [NgFor],
  templateUrl: './analyses-content.component.html',
  styleUrl: './analyses-content.component.scss'
})
export class AnalysesContentComponent {

  protected analysesListContent: AnalysisShortInfo[]

  constructor(private router: Router, private analysisService: AnalysesService) {
    // TODO: get curren user id from somewhere
    let currentUserId = 0
    this.analysesListContent = this.analysisService.getAnalysesShortInfos(currentUserId)
  }

  protected addAnalysis() {
    this.router.navigate(['add-analyses']);
  }

  protected selectAnalysis(selectedItemId: number) {
    this.router.navigate(['analyses'], { queryParams: { mode: "existing", id: selectedItemId } });
  }
}
