import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./pages/login/login.component";
import { HeaderComponent } from "./components/header/header.component";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AnalysesService } from './services/analyses.service';
import { UsersService } from './services/users.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, MainComponent, LoginComponent, HeaderComponent, HttpClientModule],
    providers: [AnalysesService, UsersService]
})
export class AppComponent {
  title = 'MedApp';
}
