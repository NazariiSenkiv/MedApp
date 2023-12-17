import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import pages
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { HomeContentComponent } from './pages/home-content/home-content.component';
import { PatientsContentComponent } from './pages/patients-content/patients-content.component';
import { AnalysesContentComponent } from './pages/analyses-content/analyses-content.component';
import { CalendarContentComponent } from './pages/calendar-content/calendar-content.component';
import { HistoryContentComponent } from './pages/history-content/history-content.component';
import { AnalysesComponent } from './pages/analyses/analyses.component';
import { AddAnalysesComponent } from './pages/add-analyses/add-analyses.component';
import { AnalysesAutoComponent } from './pages/analyses-auto/analyses-auto.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'main', component: MainComponent, children: [
        {path: '', component: HomeContentComponent},
        {path: 'patients', component: PatientsContentComponent},
        {path: 'analyses', component: AnalysesContentComponent},
        {path: 'calendar', component: CalendarContentComponent},
        {path: 'history', component: HistoryContentComponent}
    ]},
    { path: 'analyses', component: AnalysesComponent },
    { path: 'analyses-auto', component: AnalysesAutoComponent },
    { path: 'add-analyses', component: AddAnalysesComponent },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}