import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule, NgIf, NgFor, Location } from '@angular/common';
import { CustomPipesModule } from '../../pipes/custom-pipes/custom-pipes.module'
import { FormControl, FormsModule } from '@angular/forms';
import { AnalysisType, AnalysisTypeField } from '../../interfaces/analysis-type'
import { Analysis, AnalysisFieldResult } from '../../interfaces/analysis'
import { ActivatedRoute, Router } from '@angular/router';

import { AnalysesService } from '../../services/analyses.service';
import { UsersService } from '../../services/users.service';


@Component({
    selector: 'app-analyses',
    standalone: true,
    templateUrl: './analyses.component.html',
    styleUrl: './analyses.component.css',
    imports: [CustomPipesModule, HeaderComponent, NgIf, NgFor, CommonModule, FormsModule],
})
export class AnalysesComponent {
    protected mode: string = "existing"
    protected editMode: boolean = false

    protected userName!: string

    protected analysesTypeNames!: string[]
    protected analysesType!: AnalysisType

    protected analysis!: Analysis;

    protected analysisId: number = -1;

    constructor(private location: Location, private route: ActivatedRoute, protected analysesService: AnalysesService, protected userService: UsersService) {
        analysesService.getAnalysesTypes().subscribe({
            next: (analysesTypes: AnalysisType[]) => {
                this.analysesTypeNames = analysesTypes.map(type => type.name)
            },
            error: (e) => console.error(e),
        }) 

        this.route.queryParams.subscribe(params => {
            this.mode = params['mode']
            let isNew: boolean = this.mode == "new";
            this.editMode = isNew

            if (isNew) {
                console.log("is new")
                let patient_id = params['patient_id']
                let analyses_type_id = params['analyses_type_id']
                let date = params['date']

                userService.getUserById(patient_id).subscribe({
                    next: (patient) => {
                        this.userName = patient.name + " " + patient.surname
                    },
                    error: (e) => console.error(e),
                })

                analysesService.getAnalysesTypeById(analyses_type_id).subscribe({
                    next: (foundType) => {
                        if (foundType) {
                            this.analysesType = foundType
                        }
                    },
                    error: (e) => console.error(e),
                })

                this.analysis = {
                    patient_id: patient_id,
                    type_id: analyses_type_id,
                    date: date,
                    results: []
                }
            } else {
                console.log("existing")
                this.analysisId = params['id'];
                
                analysesService.getAnalysisById(this.analysisId).subscribe({
                    next: (foundAnalysis) => {
                        console.log(foundAnalysis)
                        if (foundAnalysis) {
                            this.analysis = foundAnalysis
            
                            userService.getUserById(foundAnalysis.patient_id).subscribe({
                                next: (patient) => {
                                    this.userName = patient.name + " " + patient.surname
                                },
                                error: (e) => console.error(e),
                            })
            
                            console.log("type_id = " + foundAnalysis.type_id)

                            analysesService.getAnalysesTypeById(foundAnalysis.type_id).subscribe({
                                next: (foundType) => {
                                    console.log(foundType)
                                    if (foundType) {
                                        this.analysesType = foundType
                                    }
                                },
                                error: (e) => console.error(e),
                            })
                        }
                    },
                    error: (e) => console.error(e),
                })
            }
        });
    }

    private readAnalysisFromForm(formResult: any): Analysis {
        let formFields = Object.keys(formResult.controls).map(key => ({name: key, value: formResult.controls[key].value}))
        
        // removing main fields from array
        formFields.splice(formFields.findIndex(el => el.name == "patient_name"), 1)
        formFields.splice(formFields.findIndex(el => el.name == "analyses-type"), 1)
        
        let date_index = formFields.findIndex(el => el.name == "date")
        let date_value = formFields.splice(date_index, 1)[0]
        
        return {
            patient_id: this.analysis.patient_id,
            date: date_value.value,
            type_id: this.analysis.type_id,
            results: formFields
        }
    }

    protected saveChanges(formResult: any) {
        // convert form data to analysis
        let analysis = this.readAnalysisFromForm(formResult)
        
        console.log(analysis)
        
        if (this.mode == "new")
        {
            this.analysesService.addAnalysis(analysis).subscribe()
            console.log("posting...")
            console.log(analysis)
        }
        else
        {
            this.analysesService.updateAnalysis(this.analysisId, analysis).subscribe()
        }
        
        this.editMode = false
        this.mode = "existing"
    }

    protected back() {
        this.editMode = false

        if (this.mode == "new") {
            this.location.back()
        }
    }

    protected getFieldValue(fieldName: string): string | undefined {
        const field = this.analysis.results.find(field => field.name == fieldName);
        return field?.value;
      }
}
