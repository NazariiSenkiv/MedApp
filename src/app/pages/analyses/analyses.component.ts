import { Component, ViewChild } from '@angular/core';
import { DoCheck } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule, NgIf, NgFor, Location } from '@angular/common';
import { CustomPipesModule } from '../../pipes/custom-pipes/custom-pipes.module'
import { FormControl, FormsModule, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AnalysisType, AnalysisTypeField } from '../../interfaces/analysis-type'
import { Analysis, AnalysisFieldResult } from '../../interfaces/analysis'
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { AnalysesService } from '../../services/analyses.service';
import { UsersService } from '../../services/users.service';


@Component({
    selector: 'app-analyses',
    standalone: true,
    templateUrl: './analyses.component.html',
    styleUrl: './analyses.component.css',
    imports: [CustomPipesModule, HeaderComponent, NgIf, NgFor, CommonModule, FormsModule],
})
export class AnalysesComponent implements DoCheck {
    protected mode: string = "existing"
    protected editMode: boolean = false

    protected shouldCollapse: boolean = false

    protected userName!: string

    protected analysesTypeNames!: string[]
    protected analysesType!: AnalysisType

    protected analysis!: Analysis;

    protected analysisId: number = -1;

    @ViewChild('formResult') formResult!: NgForm;

    // error handling
    protected errors: {errorFieldTag: string, errorMessage: string}[] = []

    constructor(private router: Router, private location: Location, private route: ActivatedRoute, protected analysesService: AnalysesService, protected userService: UsersService, private breakpointService: BreakpointObserver) {
        analysesService.getAnalysesTypes().subscribe({
            next: (analysesTypes: AnalysisType[]) => {
                this.analysesTypeNames = analysesTypes.map(type => type.name)
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

    ngDoCheck(): void {
        if (this.formResult) {
            let analysis = this.readAnalysisFromForm(this.formResult)
            this.validateAnalysisFields(analysis, this.analysesType, true)
        }
    }

    protected hasErrors(): boolean {
        return this.errors.length > 0
    }
    protected hasError(fieldTag: string): boolean {
        return this.errors.find(el => el.errorFieldTag == fieldTag) != undefined
    }
    protected getErrorMessage(fieldTag: string): string {
        return this.errors.find(el => el.errorFieldTag == fieldTag)!.errorMessage
    }
    // updates errors array
    protected validateAnalysisFields(analysis: Analysis, analysisType: AnalysisType, checkEmpty: boolean = false) {
        this.errors = []

        analysis.results.forEach(obj => {
            let field = analysisType.fields.find(field => field.tag == obj.name)

            if (field && field.min !== undefined && field.max !== undefined) {
                if (checkEmpty) {
                    console.log("obj.value = ")
                    console.log(obj.value)
                    if (obj.value === undefined || obj.value === "") {
                        this.errors.push({errorFieldTag: field.tag, errorMessage: `${field.name} - invalid value`})
                        console.log({errorFieldTag: field.tag, errorMessage: `${field.name} - invalid value`})
                    }
                }
                // check range
                if (obj.value < field.min || obj.value > field.max) {
                    this.errors.push({errorFieldTag: field.tag, errorMessage: `${field.name} should be in range [${field.min}; ${field.max}]`})
                }
            } else {
                throw Error("[MedApp]: Can't find Corresponding field" + field)
            }
        })
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

        this.validateAnalysisFields(analysis, this.analysesType, true)

        if (this.hasErrors())
            return

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
        
        this.analysis = analysis
        this.editMode = false
        this.mode = "existing"
    }

    protected toMain() {
        this.router.navigate(['/main/analyses'])
    }

    protected back() {
        if (this.mode == "new") {
            this.location.back()
        } else {
            //this.router.navigate(['/analyses'], {queryParams: {mode: "existing", id: this.analysisId}});
            this.location.replaceState(this.location.path());
            window.location.reload();
        }
        //this.editMode = false
    }

    protected getFieldValue(fieldName: string): string | undefined {
        if (this.mode != "new") {
            let field = this.analysis.results.find(field => field.name == fieldName);
            return field?.value;
        } 
        else {
            let field = this.analysesType.fields.find(field => field.tag == fieldName);
            return field?.min as any as string;
        }
      }
}
