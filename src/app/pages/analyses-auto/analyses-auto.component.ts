import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { UsersService } from '../../services/users.service';
import { DataProvider } from '../../interfaces/data-provider';
import { AnalysesService } from '../../services/analyses.service';
import { DataProvidersService } from '../../services/data-providers.service';
import { AnalysisType } from '../../interfaces/analysis-type';
import { LoadingPopupComponent } from "../../components/loading-popup/loading-popup.component";

@Component({
    selector: 'app-analyses-auto',
    standalone: true,
    templateUrl: './analyses-auto.component.html',
    styleUrl: './analyses-auto.component.scss',
    imports: [HeaderComponent, NgFor, FormsModule, LoadingPopupComponent, NgIf]
})
export class AnalysesAutoComponent {
    protected userName: string = "no-name"
    protected patientId: number = -1

    protected date: string = "no-date"

    protected analysisType!: AnalysisType

    protected isLoading: boolean = false

    protected supportedDataProviders: DataProvider[] = []
    protected currentProviderId: number = -1

    private lastAnalysisId: number = -1

    protected shouldCollapse: boolean = false

    constructor(
        private location: Location, 
        private route: ActivatedRoute, 
        private usersService: UsersService, 
        private dataProvidersService: DataProvidersService,
        private analysesService: AnalysesService,
        private router: Router,
        private breakpointService: BreakpointObserver) 
    {
        breakpointService
            .observe([Breakpoints.Small, Breakpoints.XSmall])
            .subscribe(result => {
                this.shouldCollapse = false

                if (result.matches) {
                    this.shouldCollapse = true
                }
            })

        this.route.queryParams.subscribe(params => {
            this.patientId = parseInt(params['patient_id'])
            let analyses_type_id: number = parseInt(params['analyses_type_id'])
            
            usersService.getUserById(this.patientId).subscribe({
                next: (user) => {
                    this.userName = user.name + " " + user.surname
                },
                error: (e) => console.log(e)
            })

            this.date = params['date']

            this.analysesService.getAnalysesTypeById(analyses_type_id).subscribe({
                next: (type) => {
                    this.analysisType = type
                    this.analysisType.id = analyses_type_id
                }
            })

            this.supportedDataProviders = this.dataProvidersService.getSupportedDataProviders(analyses_type_id)
            console.log(typeof(analyses_type_id))
        })
    }

    protected setCurrentProvider(providerId: number) {
        this.currentProviderId = providerId
        console.log("Current provider: " + providerId)
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    protected readCurrentProviderData() {
        // read data from sensors and external system
        let readAnalysis = this.dataProvidersService.readDataFromProvider(this.currentProviderId, this.patientId, this.analysisType)
        this.isLoading = true

        // simulate loading data from sensor or external system
        setTimeout(() => {
            this.isLoading = false
            this.router.navigate(['/analyses'], { queryParams: {mode: "existing", id: this.lastAnalysisId}})
        }, this.getRandomNumber(3000, 5000));

        // save analysis
        this.analysesService.addAnalysis(readAnalysis).subscribe({
            next: (newAnalysisId: number) => {
                this.lastAnalysisId = newAnalysisId
            }
        })
            
    }

    protected back() {
        this.location.back()
    }
}
