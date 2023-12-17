import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

import { UserModel } from '../../interfaces/user';
import { AnalysisType } from '../../interfaces/analysis-type';
import { UsersService } from '../../services/users.service';
import { AnalysesService } from '../../services/analyses.service';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
    selector: 'app-add-analyses',
    standalone: true,
    templateUrl: './add-analyses.component.html',
    styleUrl: './add-analyses.component.scss',
    imports: [HeaderComponent, FormsModule, NgFor]
})
export class AddAnalysesComponent {
    protected analysisGetType: string = "Manual"

    protected patients!: UserModel[]
    protected analysesTypes!: AnalysisType[]

    protected selected_patient_id: number = 0
    protected selected_analyses_type_id: number = 0

    constructor(private router: Router, private usersService: UsersService, private analysesService: AnalysesService, private currentUserService: CurrentUserService) {
        let currentUserId = currentUserService.getCurrentUserId()

        usersService.getWards(currentUserId).subscribe({
            next: (wards) => {
                this.patients = wards
                this.selected_patient_id = wards[0].id
            },
            error: (e) => console.error(e),
        })

        analysesService.getAnalysesTypes().subscribe({
            next: (analysesTypes) => {
                this.analysesTypes = analysesTypes
                this.selected_analyses_type_id = analysesTypes[0].id
            },
            error: (e) => console.error(e),
        })
    }

    private addLeadingZero(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    private getCurrentDateString(): string {
        const currentDate = new Date();
      
        const day = this.addLeadingZero(currentDate.getDate())
        const month = this.addLeadingZero(currentDate.getMonth() + 1)
        const year = currentDate.getFullYear()

        return `${day}.${month}.${year}`
    }

    protected toNextPage() {
        let date_str: string = this.getCurrentDateString()

        switch (this.analysisGetType) {
            case "Manual":
                this.router.navigate(
                    ['/analyses'], 
                    { 
                        queryParams: { 
                            mode: "new", 
                            patient_id: this.selected_patient_id, 
                            analyses_type_id: this.selected_analyses_type_id,
                            date: date_str 
                        } 
                    })
                break
            case "Auto":
                this.router.navigate(['/analyses-auto'], 
                    { 
                        queryParams: { 
                            patient_id: this.selected_patient_id, 
                            analyses_type_id: this.selected_analyses_type_id,
                            date: date_str 
                        } 
                    })
                break
            default:
                break
        }
    }
}
