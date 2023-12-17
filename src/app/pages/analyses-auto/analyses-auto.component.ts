import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-analyses-auto',
    standalone: true,
    templateUrl: './analyses-auto.component.html',
    styleUrl: './analyses-auto.component.scss',
    imports: [HeaderComponent, NgFor, FormsModule]
})
export class AnalysesAutoComponent {
    protected userName!: string
    protected date!: string

    constructor(private location: Location, private route: ActivatedRoute, private usersService: UsersService) {
        this.route.queryParams.subscribe(params => {
            let patient_id = params['patient_id']
            let analyses_type_id = params['analyses_type_id']
            
            this.userName = usersService.getFullNameById(patient_id)
            this.date = params['date']
        })
    }

    protected back() {
        this.location.back()
    }
}
